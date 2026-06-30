"use client";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 h-20 bg-gradient-to-r from-slate-900 via-blue-900 to-sky-600 shadow-lg">
      <div className="h-full px-8 flex items-center justify-between">
        <div>
          <h1 className="text-white text-2xl font-bold">College ERP Portal</h1>

          <p className="text-blue-100 text-sm">
            Student • Faculty • Administration
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative hidden md:block">
            <i className="bi bi-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

            <input
              type="text"
              placeholder="Search..."
              className="w-72 rounded-xl py-2.5 pl-11 pr-4 outline-none"
            />
          </div>

          <button className="relative text-white text-xl">
            <i className="bi bi-bell-fill"></i>

            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-xs flex items-center justify-center">
              3
            </span>
          </button>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-white text-blue-700 font-bold flex items-center justify-center">
              M
            </div>

            <div className="hidden md:block">
              <p className="text-white font-semibold">Mahima</p>

              <p className="text-blue-100 text-sm">Student</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
