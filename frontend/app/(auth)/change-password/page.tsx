"use client";

import { useState } from "react";
import Link from "next/link";

export default function ChangePasswordPage() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-sky-600 flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl px-10 py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-slate-800">Change Password</h1>

          <p className="text-gray-500 mt-2">
            Create a new secure password for your ERP account.
          </p>

          <div className="w-20 h-1 bg-blue-600 rounded mx-auto mt-4"></div>
        </div>

        {/* Form */}
        <form className="space-y-4">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Current Password
            </label>

            <div className="relative">
              <i className="bi bi-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

              <input
                type={showCurrent ? "text" : "password"}
                placeholder="Enter current password"
                className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                <i
                  className={`bi ${showCurrent ? "bi-eye-slash" : "bi-eye"}`}
                ></i>
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              New Password
            </label>

            <div className="relative">
              <i className="bi bi-key absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

              <input
                type={showNew ? "text" : "password"}
                placeholder="Enter new password"
                className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                <i className={`bi ${showNew ? "bi-eye-slash" : "bi-eye"}`}></i>
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Confirm New Password
            </label>

            <div className="relative">
              <i className="bi bi-shield-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm new password"
                className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                <i
                  className={`bi ${showConfirm ? "bi-eye-slash" : "bi-eye"}`}
                ></i>
              </button>
            </div>
          </div>

          {/* Password Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
            <p className="text-sm font-semibold text-blue-700 mb-2">
              Password Requirements
            </p>

            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Minimum 8 characters</li>
              <li>• At least one uppercase letter</li>
              <li>• At least one number</li>
              <li>• At least one special character</li>
            </ul>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 transition text-white py-3 rounded-xl font-semibold"
          >
            Update Password
          </button>
        </form>
      </div>
    </main>
  );
}
