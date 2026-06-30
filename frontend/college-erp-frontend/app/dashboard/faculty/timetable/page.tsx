import DashboardLayout from "@/components/layout/DashboardLayout";
import Header from "@/components/layout/header";

export default function FacultyTimetablePage() {
  const timetable = [
    {
      time: "09:00 - 10:00",
      monday: "Operating Systems (Sem V)",
      tuesday: "DBMS (Sem V)",
      wednesday: "Computer Networks (Sem V)",
      thursday: "Software Engineering (Sem V)",
      friday: "Web Development (Sem V)",
      saturday: "-",
    },
    {
      time: "10:00 - 11:00",
      monday: "Operating Systems Lab",
      tuesday: "DBMS Lab",
      wednesday: "-",
      thursday: "Web Development Lab",
      friday: "-",
      saturday: "-",
    },
    {
      time: "11:00 - 12:00",
      monday: "-",
      tuesday: "Mentoring",
      wednesday: "Faculty Meeting",
      thursday: "-",
      friday: "Project Guidance",
      saturday: "-",
    },
    {
      time: "01:00 - 02:00",
      monday: "Computer Networks",
      tuesday: "-",
      wednesday: "Operating Systems",
      thursday: "DBMS",
      friday: "-",
      saturday: "-",
    },
  ];

  const assignedCourses = [
    {
      code: "CS501",
      subject: "Operating Systems",
      semester: "V",
      room: "A-205",
    },
    {
      code: "CS502",
      subject: "Database Management Systems",
      semester: "V",
      room: "B-104",
    },
    {
      code: "CS503",
      subject: "Computer Networks",
      semester: "V",
      room: "A-301",
    },
    {
      code: "CS505",
      subject: "Web Development Lab",
      semester: "V",
      room: "Lab-3",
    },
  ];

  return (
    <DashboardLayout role="faculty">
      <Header
        title="My Timetable"
        subtitle="View your weekly teaching schedule"
      />

      {/* Weekly Timetable */}

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="px-6 py-5 border-b">
          <h2 className="text-xl font-bold text-slate-800">Weekly Timetable</h2>
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

      {/* Assigned Courses */}

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden mt-8">
        <div className="px-6 py-5 border-b">
          <h2 className="text-xl font-bold text-slate-800">Assigned Courses</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-6 py-4 text-left">Course Code</th>
                <th className="px-6 py-4 text-left">Course</th>
                <th className="px-6 py-4 text-center">Semester</th>
                <th className="px-6 py-4 text-center">Room</th>
              </tr>
            </thead>

            <tbody>
              {assignedCourses.map((course) => (
                <tr key={course.code} className="border-b hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium">{course.code}</td>

                  <td className="px-6 py-4">{course.subject}</td>

                  <td className="px-6 py-4 text-center">{course.semester}</td>

                  <td className="px-6 py-4 text-center">{course.room}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
