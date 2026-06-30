"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

interface SidebarProps {
  role: "student" | "faculty" | "admin";
}

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };
  const menus = {
    student: [
      {
        name: "Dashboard",
        href: "/dashboard/student",
        icon: "bi-speedometer2",
      },
      {
        name: "Profile",
        href: "/dashboard/student/profile",
        icon: "bi-person",
      },
      {
        name: "Attendance",
        href: "/dashboard/student/attendance",
        icon: "bi-calendar-check",
      },
      {
        name: "Enrolled Courses",
        href: "/dashboard/student/enrolled-courses",
        icon: "bi-book",
      },
      {
        name: "Results",
        href: "/dashboard/student/results",
        icon: "bi-award",
      },
      {
        name: "Timetable",
        href: "/dashboard/student/timetable",
        icon: "bi-calendar3",
      },

      {
        name: "Logout",
        href: "/login",
        icon: "bi-box-arrow-right",
      },
    ],

    faculty: [
      {
        name: "Dashboard",
        href: "/dashboard/faculty",
        icon: "bi-speedometer2",
      },
      {
        name: "Profile",
        href: "/dashboard/faculty/profile",
        icon: "bi-person",
      },
      {
        name: "Mark Attendance",
        href: "/dashboard/faculty/attendance",
        icon: "bi-calendar-check",
      },
      {
        name: "Upload Results",
        href: "/dashboard/faculty/results",
        icon: "bi-journal-check",
      },
      {
        name: "Timetable",
        href: "/dashboard/faculty/timetable",
        icon: "bi-calendar3",
      },
      {
        name: "Manage Assigned Courses",
        href: "/dashboard/faculty/assigned-courses",
        icon: "bi-book",
      },
      {
        name: "Logout",
        href: "/login",
        icon: "bi-box-arrow-right",
      },
    ],

    admin: [
      { name: "Dashboard", href: "/dashboard/admin", icon: "bi-speedometer2" },
      {
        name: "Manage Students",
        href: "/dashboard/admin/students",
        icon: "bi-people-fill",
      },
      {
        name: "Manage Faculty",
        href: "/dashboard/admin/faculty",
        icon: "bi-people",
      },
      {
        name: "Manage Timetable",
        href: "/dashboard/admin/timetable",
        icon: "bi-calendar3",
      },
      {
        name: "Course Allocation",
        href: "/dashboard/admin/course-allocation",
        icon: "bi-file-earmark-text",
      },
      {
        name: "Reports",
        href: "/dashboard/admin/reports",
        icon: "bi-file-earmark-text",
      },
      { name: "Logout", href: "/login", icon: "bi-box-arrow-right" },
    ],
  };

  return (
    <aside className="w-72 bg-white shadow-lg min-h-[calc(100vh-80px)]">
      <div className="px-6 py-8 border-b">
        <h2 className="text-xl font-bold text-slate-800 capitalize">
          {role} Portal
        </h2>
      </div>

      <nav className="p-4">
        {menus[role].map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-4 px-5 py-3 rounded-xl mb-3 transition-all

            ${
              pathname === item.href
                ? "bg-blue-700 text-white"
                : "text-slate-700 hover:bg-blue-50"
            }`}
          >
            <i className={`bi ${item.icon}`}></i>

            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
