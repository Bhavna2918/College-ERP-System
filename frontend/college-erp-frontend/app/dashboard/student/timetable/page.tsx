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
      {/* Faculty & Room Allocation */}

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden mt-8">
        <div className="px-6 py-5 border-b">
          <h2 className="text-xl font-bold text-slate-800">
            Faculty & Room Allocation
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-6 py-4 text-left">Course Code</th>
                <th className="px-6 py-4 text-left">Subject</th>
                <th className="px-6 py-4 text-left">Faculty</th>
                <th className="px-6 py-4 text-center">Room No.</th>
                <th className="px-6 py-4 text-center">Type</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b hover:bg-slate-50">
                <td className="px-6 py-4 font-medium">CS501</td>
                <td className="px-6 py-4">Operating Systems</td>
                <td className="px-6 py-4">Dr. Rahul Sharma</td>
                <td className="px-6 py-4 text-center">A-205</td>
                <td className="px-6 py-4 text-center">Theory</td>
              </tr>

              <tr className="border-b hover:bg-slate-50">
                <td className="px-6 py-4 font-medium">CS502</td>
                <td className="px-6 py-4">Database Management Systems</td>
                <td className="px-6 py-4">Prof. Neha Patil</td>
                <td className="px-6 py-4 text-center">B-104</td>
                <td className="px-6 py-4 text-center">Theory</td>
              </tr>

              <tr className="border-b hover:bg-slate-50">
                <td className="px-6 py-4 font-medium">CS503</td>
                <td className="px-6 py-4">Computer Networks</td>
                <td className="px-6 py-4">Dr. Amit Kulkarni</td>
                <td className="px-6 py-4 text-center">A-301</td>
                <td className="px-6 py-4 text-center">Theory</td>
              </tr>

              <tr className="border-b hover:bg-slate-50">
                <td className="px-6 py-4 font-medium">CS504</td>
                <td className="px-6 py-4">Software Engineering</td>
                <td className="px-6 py-4">Prof. Sneha Joshi</td>
                <td className="px-6 py-4 text-center">C-102</td>
                <td className="px-6 py-4 text-center">Theory</td>
              </tr>

              <tr className="border-b hover:bg-slate-50">
                <td className="px-6 py-4 font-medium">CS505</td>
                <td className="px-6 py-4">Web Development</td>
                <td className="px-6 py-4">Prof. Kiran Deshpande</td>
                <td className="px-6 py-4 text-center">Lab-3</td>
                <td className="px-6 py-4 text-center">Lab</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
