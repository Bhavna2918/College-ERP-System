"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-sky-600 flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl px-10 py-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-slate-800">
            College ERP Portal
          </h1>

          <p className="text-gray-500 mt-2">
            Student • Faculty • Administration
          </p>

          <div className="w-20 h-1 bg-blue-600 rounded mx-auto mt-4"></div>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-slate-800">Welcome Back</h2>

          <p className="text-gray-500 text-sm mt-1">
            Sign in to continue to your dashboard.
          </p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Email Address
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

          <div>
            <label className="block text-sm font-semibold mb-2">Password</label>

            <div className="relative">
              <i className="bi bi-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                <i
                  className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                ></i>
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-blue-600" />
              Remember Me
            </label>

            <Link
              href="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button className="w-full bg-blue-700 hover:bg-blue-800 transition text-white py-3 rounded-xl font-semibold">
            Sign In
          </button>
        </form>

        <div className="border-t mt-6 pt-4 text-center">
          <p className="text-xs text-gray-500">
            Authorized access only. Contact the ERP administrator if you
            experience login issues.
          </p>
        </div>
      </div>
    </main>
  );
}
