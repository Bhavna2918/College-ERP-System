import DashboardLayout from "@/components/layout/DashboardLayout";
import Header from "@/components/layout/header";

export default function ProfilePage() {
  return (
    <DashboardLayout role="student">
      <Header
        title="My Profile"
        subtitle="View your personal and academic information"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center">
          <div className="w-28 h-28 rounded-full bg-gradient-to-r from-blue-700 to-sky-500 flex items-center justify-center text-white text-4xl font-bold">
            MD
          </div>

          <h2 className="text-2xl font-bold text-slate-800 mt-4">
            Mahima Deshmukh
          </h2>

          <p className="text-gray-500">Computer Science Engineering</p>

          <span className="mt-3 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
            Semester V
          </span>

          <button className="mt-6 w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl transition">
            Edit Profile
          </button>
        </div>

        {/* Student Details */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Student Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-500 text-sm">Full Name</p>
              <p className="font-semibold">Mahima Deshmukh</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Roll Number</p>
              <p className="font-semibold">23CS102</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Student ID</p>
              <p className="font-semibold">STU230102</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Department</p>
              <p className="font-semibold">Computer Science Engineering</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Semester</p>
              <p className="font-semibold">V</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Academic Year</p>
              <p className="font-semibold">2025 - 2026</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Email</p>
              <p className="font-semibold">mahima@college.edu</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Phone Number</p>
              <p className="font-semibold">+91 9876543210</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Date of Birth</p>
              <p className="font-semibold">15 August 2005</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Admission Year</p>
              <p className="font-semibold">2023</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Blood Group</p>
              <p className="font-semibold">O+</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Guardian Name</p>
              <p className="font-semibold">ABC Deshmukh</p>
            </div>

            <div className="md:col-span-2">
              <p className="text-gray-500 text-sm">Address</p>
              <p className="font-semibold">
                123, XYZ Colony, Pune, Maharashtra
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
