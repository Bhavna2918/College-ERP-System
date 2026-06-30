import DashboardLayout from "@/components/layout/DashboardLayout";
import Header from "@/components/layout/header";

export default function FacultyDashboardPage() {
  return (
    <DashboardLayout role="faculty">
      <Header
        title="Faculty Dashboard"
        subtitle="Welcome back! Here's an overview of your profile and latest updates."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Faculty Profile Card */}
        <div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center">
          <div className="w-28 h-28 rounded-full bg-gradient-to-r from-slate-900 via-blue-900 to-sky-600 flex items-center justify-center text-white text-4xl font-bold">
            RS
          </div>

          <h2 className="text-2xl font-bold text-slate-800 mt-4">
            Dr. Rahul Sharma
          </h2>

          <p className="text-gray-500">Assistant Professor</p>

          <span className="mt-3 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
            Computer Science Department
          </span>
        </div>

        {/* Faculty Information */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Faculty Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-500 text-sm">Employee ID</p>
              <p className="font-semibold">FAC1023</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Department</p>
              <p className="font-semibold">Computer Science Engineering</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Designation</p>
              <p className="font-semibold">Assistant Professor</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Qualification</p>
              <p className="font-semibold">Ph.D. in Computer Science</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Email</p>
              <p className="font-semibold">rahul.sharma@college.edu</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Phone</p>
              <p className="font-semibold">+91 9876543210</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Office Room</p>
              <p className="font-semibold">Block A - Room 205</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Joining Year</p>
              <p className="font-semibold">2020</p>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Updates */}

      <div className="bg-white rounded-3xl shadow-lg p-6 mt-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Latest Updates
        </h2>

        <div className="space-y-5">
          <div className="border-l-4 border-blue-600 pl-4">
            <h3 className="font-semibold text-slate-800">
              Mid-Semester Marks Submission
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              Upload internal assessment marks before 15 October 2026.
            </p>
          </div>

          <div className="border-l-4 border-green-600 pl-4">
            <h3 className="font-semibold text-slate-800">Faculty Meeting</h3>
            <p className="text-gray-600 text-sm mt-1">
              Friday, 3:00 PM at the Seminar Hall.
            </p>
          </div>

          <div className="border-l-4 border-yellow-500 pl-4">
            <h3 className="font-semibold text-slate-800">Timetable Updated</h3>
            <p className="text-gray-600 text-sm mt-1">
              Semester V timetable has been revised. Please review your updated
              schedule.
            </p>
          </div>

          <div className="border-l-4 border-purple-600 pl-4">
            <h3 className="font-semibold text-slate-800">
              Attendance Reminder
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              Submit weekly attendance before Saturday 6:00 PM.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
