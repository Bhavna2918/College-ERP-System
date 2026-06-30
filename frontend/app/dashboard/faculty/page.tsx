import DashboardLayout from "@/components/layout/DashboardLayout";
import Header from "@/components/layout/header";
import WelcomeCard from "@/components/dashboard/WelcomeCard";
import ProfileCard from "@/components/dashboard/ProfileCard";
import AnnouncementCard from "@/components/dashboard/AnnouncementCard";

const announcements = [
  {
    title: "Mid-Semester Marks Submission",
    date: "Upload before 15 October 2026",
  },
  {
    title: "Faculty Meeting",
    date: "Friday, 3:00 PM",
  },
  {
    title: "Timetable Updated",
    date: "Semester V schedule revised",
  },
  {
    title: "Attendance Reminder",
    date: "Submit before Saturday 6:00 PM",
  },
];

export default function FacultyDashboardPage() {
  return (
    <DashboardLayout role="faculty">
      <Header
        title="Faculty Dashboard"
        subtitle="Welcome back! Here's an overview of your profile and latest updates."
      />

      <div className="lg:col-span-2">
        <WelcomeCard name="Dr. Rahul Sharma" role="Assistant Professor" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ProfileCard
          name="Dr. Rahul Sharma"
          id="FAC1023"
          role="Assistant Professor"
          department="Computer Science Engineering"
          email="rahul.sharma@college.edu"
        />
        <div className="mt-6 lg:mt-0 lg:col-span-2">
          <AnnouncementCard announcements={announcements} />
        </div>
      </div>
    </DashboardLayout>
  );
}
