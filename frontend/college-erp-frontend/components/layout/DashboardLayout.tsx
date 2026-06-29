import { ReactNode } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import Footer from "./footer";
interface DashboardLayoutProps {
  children: ReactNode;
  role: "student" | "faculty" | "admin";
}

export default function DashboardLayout({
  children,
  role,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="flex">
        <Sidebar role={role} />

        <main className="flex-1 p-8">{children}</main>
      </div>

      <Footer />
    </div>
  );
}
