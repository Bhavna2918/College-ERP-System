import DashboardLayout from "@/components/layout/DashboardLayout";
import Header from "@/components/layout/header";

export default function AssignedCoursesPage() {
  const courses = [
    {
      code: "CS501",
      subject: "Operating Systems",
      semester: "V",
      section: "A",
      students: 62,
      credits: 4,
    },
    {
      code: "CS502",
      subject: "Database Management Systems",
      semester: "V",
      section: "A",
      students: 60,
      credits: 4,
    },
    {
      code: "CS503",
      subject: "Computer Networks",
      semester: "V",
      section: "B",
      students: 58,
      credits: 3,
    },
    {
      code: "CS504",
      subject: "Software Engineering",
      semester: "VI",
      section: "A",
      students: 64,
      credits: 3,
    },
    {
      code: "CS505",
      subject: "Web Development Lab",
      semester: "V",
      section: "A",
      students: 30,
      credits: 2,
    },
  ];

  return (
    <DashboardLayout role="faculty">
      <Header
        title="Manage Assigned Courses"
        subtitle="View all the courses assigned to you for the current academic session."
      />

      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <p className="text-gray-500">Assigned Courses</p>
          <h2 className="text-4xl font-bold text-blue-700 mt-2">
            {courses.length}
          </h2>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">
          <p className="text-gray-500">Total Students</p>
          <h2 className="text-4xl font-bold text-green-600 mt-2">
            {courses.reduce((sum, c) => sum + c.students, 0)}
          </h2>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">
          <p className="text-gray-500">Total Credits</p>
          <h2 className="text-4xl font-bold text-purple-600 mt-2">
            {courses.reduce((sum, c) => sum + c.credits, 0)}
          </h2>
        </div>
      </div>

      {/* Assigned Courses Table */}

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="px-6 py-5 border-b">
          <h2 className="text-xl font-bold text-slate-800">Assigned Courses</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-6 py-4 text-left">Course Code</th>
                <th className="px-6 py-4 text-left">Course Name</th>
                <th className="px-6 py-4 text-center">Semester</th>
                <th className="px-6 py-4 text-center">Section</th>
                <th className="px-6 py-4 text-center">Students</th>
                <th className="px-6 py-4 text-center">Credits</th>
              </tr>
            </thead>

            <tbody>
              {courses.map((course) => (
                <tr key={course.code} className="border-b hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium">{course.code}</td>

                  <td className="px-6 py-4">{course.subject}</td>

                  <td className="px-6 py-4 text-center">{course.semester}</td>

                  <td className="px-6 py-4 text-center">{course.section}</td>

                  <td className="px-6 py-4 text-center">{course.students}</td>

                  <td className="px-6 py-4 text-center">{course.credits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
