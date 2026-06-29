import DashboardLayout from "@/components/layout/DashboardLayout";
import Header from "@/components/layout/header";

export default function AttendancePage() {
  return (
    <DashboardLayout role="student">
      <Header title="Attendance" subtitle="Track your attendance" />

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="px-6 py-5 border-b">
          <h2 className="text-xl font-bold text-slate-800">
            Subject-wise Attendance
          </h2>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th>Course Code</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>CS501</td>
            </tr>
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
