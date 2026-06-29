import DashboardLayout from "@/components/layout/DashboardLayout";
import Header from "@/components/layout/header";

export default function TimetablePage() {
  const timetable = [
    {
      time: "09:00 - 10:00",
      monday: "Operating Systems",
      tuesday: "DBMS",
      wednesday: "Computer Networks",
      thursday: "Software Engineering",
      friday: "Web Development",
      saturday: "-",
    },
    {
      time: "10:00 - 11:00",
      monday: "DBMS",
      tuesday: "Operating Systems",
      wednesday: "Web Development",
      thursday: "Computer Networks",
      friday: "Software Engineering",
      saturday: "-",
    },
    {
      time: "11:00 - 12:00",
      monday: "Computer Networks",
      tuesday: "Web Development",
      wednesday: "Operating Systems",
      thursday: "DBMS",
      friday: "Library",
      saturday: "-",
    },
    {
      time: "12:00 - 01:00",
      monday: "Software Engineering",
      tuesday: "Computer Networks",
      wednesday: "DBMS",
      thursday: "Operating Systems",
      friday: "Project Work",
      saturday: "-",
    },
    {
      time: "02:00 - 03:00",
      monday: "Web Development Lab",
      tuesday: "DBMS Lab",
      wednesday: "CN Lab",
      thursday: "OS Lab",
      friday: "Project Lab",
      saturday: "-",
    },
    {
      time: "03:00 - 04:00",
      monday: "Web Development Lab",
      tuesday: "DBMS Lab",
      wednesday: "CN Lab",
      thursday: "OS Lab",
      friday: "Project Lab",
      saturday: "-",
    },
  ];

  return (
    <DashboardLayout role="student">
      <Header title="Timetable" subtitle="View your weekly class schedule" />

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="px-6 py-5 border-b">
          <h2 className="text-xl font-bold text-slate-800">
            Semester V Timetable
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-6 py-4 text-left">Time</th>
                <th className="px-6 py-4 text-center">Monday</th>
                <th className="px-6 py-4 text-center">Tuesday</th>
                <th className="px-6 py-4 text-center">Wednesday</th>
                <th className="px-6 py-4 text-center">Thursday</th>
                <th className="px-6 py-4 text-center">Friday</th>
                <th className="px-6 py-4 text-center">Saturday</th>
              </tr>
            </thead>

            <tbody>
              {timetable.map((slot, index) => (
                <tr key={index} className="border-b hover:bg-slate-50">
                  <td className="px-6 py-4 font-semibold">{slot.time}</td>

                  <td className="px-6 py-4 text-center">{slot.monday}</td>

                  <td className="px-6 py-4 text-center">{slot.tuesday}</td>

                  <td className="px-6 py-4 text-center">{slot.wednesday}</td>

                  <td className="px-6 py-4 text-center">{slot.thursday}</td>

                  <td className="px-6 py-4 text-center">{slot.friday}</td>

                  <td className="px-6 py-4 text-center">{slot.saturday}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
