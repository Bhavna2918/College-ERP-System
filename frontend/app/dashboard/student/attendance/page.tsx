import DashboardLayout from "@/components/layout/DashboardLayout";
import Header from "@/components/layout/header";

export default function AttendancePage() {
  const attendance = [
    {
      code: "CS501",
      subject: "Operating Systems",
      attended: 28,
      total: 30,
    },
    {
      code: "CS502",
      subject: "Database Management Systems",
      attended: 27,
      total: 30,
    },
    {
      code: "CS503",
      subject: "Computer Networks",
      attended: 29,
      total: 31,
    },
    {
      code: "CS504",
      subject: "Software Engineering",
      attended: 25,
      total: 28,
    },
    {
      code: "CS505",
      subject: "Web Development",
      attended: 30,
      total: 30,
    },
  ];

  return (
    <DashboardLayout role="student">
      <Header
        title="Attendance"
        subtitle="Track your attendance for the current semester"
      />

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="px-6 py-5 border-b">
          <h2 className="text-xl font-bold text-slate-800">
            Subject-wise Attendance
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-6 py-4 text-left">Course Code</th>
                <th className="px-6 py-4 text-left">Subject</th>
                <th className="px-6 py-4 text-center">Attended</th>
                <th className="px-6 py-4 text-center">Total</th>
                <th className="px-6 py-4 text-center">Percentage</th>
              </tr>
            </thead>

            <tbody>
              {attendance.map((item) => {
                const percentage = Math.round(
                  (item.attended / item.total) * 100,
                );

                return (
                  <tr key={item.code} className="border-b hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium">{item.code}</td>

                    <td className="px-6 py-4">{item.subject}</td>

                    <td className="px-6 py-4 text-center">{item.attended}</td>

                    <td className="px-6 py-4 text-center">{item.total}</td>

                    <td className="px-6 py-4 text-center">
                      <span
                        className={`font-semibold ${
                          percentage >= 75 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {percentage}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
