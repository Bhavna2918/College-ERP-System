"use client";

import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-sky-600 flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl px-10 py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-slate-800">Forgot Password</h1>

          <p className="text-gray-500 mt-2">
            Enter your registered college email to receive a password reset
            link.
          </p>

          <div className="w-20 h-1 bg-blue-600 rounded mx-auto mt-4"></div>
        </div>

        {/* Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">
              College Email
            </label>

            <div className="relative">
              <i className="bi bi-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

              <input
                type="email"
                placeholder="Enter your college email"
                className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 transition text-white py-3 rounded-xl font-semibold"
          >
            Send Reset Link
          </button>
        </form>

        {/* Divider */}
        <div className="border-t mt-6 pt-4">
          <p className="text-center text-sm text-gray-600">
            Remember your password?
          </p>

          <div className="text-center mt-3">
            <Link
              href="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              ← Back to Login
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Password reset instructions will be sent only to registered college
            email addresses.
          </p>
        </div>
      </div>
    </main>
  );
}
