from datetime import datetime, timedelta, timezone
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete
from fastapi import HTTPException, status
from app.models.models import User, AuthToken, TokenType
from app.utils.security import (
    verify_password, hash_password,
    create_access_token, create_refresh_token, decode_token
)
import secrets


class AuthService:

    @staticmethod
    async def login(email: str, password: str, db: AsyncSession):
        # Find user
        result = await db.execute(
            select(User).where(User.email == email, User.is_deleted == False)
        )
        user = result.scalar_one_or_none()

        if not user or not verify_password(password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password",
            )

        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Account is deactivated. Contact admin.",
            )

        # Create tokens
        token_data = {"sub": str(user.id), "role": user.role.value}
        access_token = create_access_token(token_data)
        refresh_token = create_refresh_token(token_data)

        # Save refresh token to DB
        expires_at = datetime.now(timezone.utc) + timedelta(days=7)
        db_token = AuthToken(
            user_id=user.id,
            type=TokenType.REFRESH,
            token=refresh_token,
            expires_at=expires_at,
        )
        db.add(db_token)

        # Update last login
        user.last_login = datetime.now(timezone.utc)
        await db.commit()

        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer",
            "role": user.role.value,
            "name": user.name,
        }

    @staticmethod
    async def refresh_token(refresh_token: str, db: AsyncSession):
        # Validate token
        payload = decode_token(refresh_token)
        if not payload or payload.get("type") != "refresh":
            raise HTTPException(status_code=401, detail="Invalid refresh token")

        # Check token exists in DB
        result = await db.execute(
            select(AuthToken).where(
                AuthToken.token == refresh_token,
                AuthToken.type == TokenType.REFRESH,
                AuthToken.expires_at > datetime.now(timezone.utc),
            )
        )
        db_token = result.scalar_one_or_none()
        if not db_token:
            raise HTTPException(status_code=401, detail="Refresh token expired or revoked")

        # Get user
        result = await db.execute(select(User).where(User.id == db_token.user_id))
        user = result.scalar_one_or_none()
        if not user:
            raise HTTPException(status_code=401, detail="User not found")

        # Rotate: delete old token, create new pair
        await db.delete(db_token)
        token_data = {"sub": str(user.id), "role": user.role.value}
        new_access = create_access_token(token_data)
        new_refresh = create_refresh_token(token_data)

        new_db_token = AuthToken(
            user_id=user.id,
            type=TokenType.REFRESH,
            token=new_refresh,
            expires_at=datetime.now(timezone.utc) + timedelta(days=7),
        )
        db.add(new_db_token)
        await db.commit()

        return {"access_token": new_access, "refresh_token": new_refresh, "token_type": "bearer"}

    @staticmethod
    async def logout(user: User, refresh_token: str, db: AsyncSession):
        # Delete the refresh token from DB
        await db.execute(
            delete(AuthToken).where(
                AuthToken.user_id == user.id,
                AuthToken.token == refresh_token,
            )
        )
        await db.commit()
        return {"message": "Logged out successfully"}

    @staticmethod
    async def forgot_password(email: str, db: AsyncSession):
        result = await db.execute(select(User).where(User.email == email))
        user = result.scalar_one_or_none()

        # Always return same message (don't reveal if email exists)
        if not user:
            return {"message": "If this email exists, a reset link has been sent."}

        # Generate reset token
        reset_token = secrets.token_urlsafe(32)
        expires_at = datetime.now(timezone.utc) + timedelta(hours=1)

        # Delete old reset tokens for this user
        await db.execute(
            delete(AuthToken).where(
                AuthToken.user_id == user.id,
                AuthToken.type == TokenType.PASSWORD_RESET,
            )
        )

        db_token = AuthToken(
            user_id=user.id,
            type=TokenType.PASSWORD_RESET,
            token=reset_token,
            expires_at=expires_at,
        )
        db.add(db_token)
        await db.commit()

        # In production: send email with reset link
        # For now: return token directly (remove in production!)
        return {
            "message": "If this email exists, a reset link has been sent.",
            "reset_token": reset_token,  # REMOVE IN PRODUCTION
        }

    @staticmethod
    async def reset_password(token: str, new_password: str, db: AsyncSession):
        result = await db.execute(
            select(AuthToken).where(
                AuthToken.token == token,
                AuthToken.type == TokenType.PASSWORD_RESET,
                AuthToken.expires_at > datetime.now(timezone.utc),
            )
        )
        db_token = result.scalar_one_or_none()
        if not db_token:
            raise HTTPException(status_code=400, detail="Invalid or expired reset token")

        result = await db.execute(select(User).where(User.id == db_token.user_id))
        user = result.scalar_one_or_none()
        user.password_hash = hash_password(new_password)

        await db.delete(db_token)
        await db.commit()
        return {"message": "Password reset successfully"}

    @staticmethod
    async def change_password(user: User, current_password: str, new_password: str, db: AsyncSession):
        if not verify_password(current_password, user.password_hash):
            raise HTTPException(status_code=400, detail="Current password is incorrect")

        user.password_hash = hash_password(new_password)
        await db.commit()
        return {"message": "Password changed successfully"}
