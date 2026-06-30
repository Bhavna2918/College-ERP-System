import DashboardLayout from "@/components/layout/DashboardLayout";
import Header from "@/components/layout/header";

export default function FacultyProfilePage() {
  return (
    <DashboardLayout role="faculty">
      <Header
        title="My Profile"
        subtitle="View your personal and professional information"
      />

      <div className="bg-white rounded-3xl shadow-lg p-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-8 border-b pb-8">
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-slate-900 via-blue-900 to-sky-600 flex items-center justify-center text-white text-5xl font-bold">
            RS
          </div>

          <div>
            <h2 className="text-3xl font-bold text-slate-800">
              Dr. Rahul Sharma
            </h2>

            <p className="text-gray-500 mt-2">Assistant Professor</p>

            <span className="inline-block mt-4 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
              Computer Science Engineering
            </span>
          </div>
        </div>

        {/* Personal Information */}

        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-slate-800 mb-6">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-500 text-sm">Faculty ID</p>
              <p className="font-semibold text-slate-800">FAC1023</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Full Name</p>
              <p className="font-semibold text-slate-800">Dr. Rahul Sharma</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Gender</p>
              <p className="font-semibold text-slate-800">Male</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Date of Birth</p>
              <p className="font-semibold text-slate-800">15 June 1988</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Email</p>
              <p className="font-semibold text-slate-800">
                rahul.sharma@college.edu
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Phone Number</p>
              <p className="font-semibold text-slate-800">+91 9876543210</p>
            </div>
          </div>
        </div>

        {/* Professional Information */}

        <div className="mt-10">
          <h3 className="text-2xl font-semibold text-slate-800 mb-6">
            Professional Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-500 text-sm">Department</p>
              <p className="font-semibold text-slate-800">
                Computer Science Engineering
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Designation</p>
              <p className="font-semibold text-slate-800">
                Assistant Professor
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Qualification</p>
              <p className="font-semibold text-slate-800">
                Ph.D. in Computer Science
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Experience</p>
              <p className="font-semibold text-slate-800">8 Years</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Joining Date</p>
              <p className="font-semibold text-slate-800">15 July 2020</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Office Room</p>
              <p className="font-semibold text-slate-800">Block A - Room 205</p>
            </div>
          </div>
        </div>

        {/* Assigned Subjects */}

        <div className="mt-10">
          <h3 className="text-2xl font-semibold text-slate-800 mb-6">
            Assigned Subjects
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-6 py-4 text-left">Course Code</th>
                  <th className="px-6 py-4 text-left">Subject</th>
                  <th className="px-6 py-4 text-center">Semester</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b">
                  <td className="px-6 py-4">CS501</td>
                  <td className="px-6 py-4">Operating Systems</td>
                  <td className="px-6 py-4 text-center">V</td>
                </tr>

                <tr className="border-b">
                  <td className="px-6 py-4">CS502</td>
                  <td className="px-6 py-4">Database Management Systems</td>
                  <td className="px-6 py-4 text-center">V</td>
                </tr>

                <tr className="border-b">
                  <td className="px-6 py-4">CS503</td>
                  <td className="px-6 py-4">Computer Networks</td>
                  <td className="px-6 py-4 text-center">V</td>
                </tr>

                <tr>
                  <td className="px-6 py-4">CS505</td>
                  <td className="px-6 py-4">Web Development Lab</td>
                  <td className="px-6 py-4 text-center">V</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
