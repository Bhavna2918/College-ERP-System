import DashboardLayout from "@/components/layout/DashboardLayout";
import Header from "@/components/layout/header";
import WelcomeCard from "@/components/dashboard/WelcomeCard";
import ProfileCard from "@/components/dashboard/ProfileCard";
import AnnouncementCard from "@/components/dashboard/AnnouncementCard";

const admin = {
  name: "Amit Verma",
  id: "ADM1001",
  role: "System Administrator",
  department: "Administration",
  email: "admin@college.edu",
};

const announcements = [
  {
    title: "Student Admissions Open",
    date: "Applications close on 31 July 2026",
  },
  {
    title: "Faculty Recruitment",
    date: "Interview schedule released",
  },
  {
    title: "Course Allocation Deadline",
    date: "Complete allocation before 10 August 2026",
  },
  {
    title: "Semester Timetable Published",
    date: "Review and update if required",
  },
];

export default function AdminDashboardPage() {
  return (
    <DashboardLayout role="admin">
      <Header
        title="Admin Dashboard"
        subtitle="Welcome back! Manage students, faculty, courses, and system activities."
      />

      {/* Welcome Card */}
      <div className="mb-6">
        <WelcomeCard name="Amit Verma" role="System Administrator" />
      </div>

      {/* Profile & Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ProfileCard
          name="Amit Verma"
          id="ADM1001"
          role="System Administrator"
          department="Administration"
          email="admin@college.edu"
        />

        <div className="lg:col-span-2">
          <AnnouncementCard announcements={announcements} />
        </div>
      </div>
    </DashboardLayout>
  );
}
