import DashboardLayout from "@/components/layout/DashboardLayout";
import Header from "@/components/layout/header";

import WelcomeCard from "@/components/dashboard/WelcomeCard";
import ProfileCard from "@/components/dashboard/ProfileCard";
import AnnouncementCard from "@/components/dashboard/AnnouncementCard";

export default function StudentDashboard() {
  const announcements = [
    {
      title: "Mid Semester Examination starts from 15 July",
      date: "28 June 2026",
    },
    {
      title: "Library books must be returned before 5 July",
      date: "26 June 2026",
    },
    {
      title: "Internship Registration is now open",
      date: "24 June 2026",
    },
  ];

  return (
    <DashboardLayout role="student">
      <Header
        title="Student Dashboard"
        subtitle="Welcome to the College ERP Portal"
      />

      <WelcomeCard name="Mahima Deshmukh" role="Student" />

      <div className="grid lg:grid-cols-3 gap-6 mt-8">
        <div>
          <ProfileCard
            name="Mahima Deshmukh"
            id="23CS102"
            role="Student"
            department="Computer Science Engineering"
            email="mahima@college.edu"
          />
        </div>

        <div className="lg:col-span-2">
          <AnnouncementCard announcements={announcements} />
        </div>
      </div>
    </DashboardLayout>
  );
}
