"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Header from "@/components/layout/header";

export default function FacultyAttendancePage() {
  const [course, setCourse] = useState("Operating Systems");
  const [date, setDate] = useState("");

  const students = [
    { rollNo: "23CS001", name: "Rahul Sharma", status: true },
    { rollNo: "23CS002", name: "Priya Patel", status: false },
    { rollNo: "23CS003", name: "Amit Kumar", status: true },
    { rollNo: "23CS004", name: "Sneha Joshi", status: true },
    { rollNo: "23CS005", name: "Rohan Mehta", status: false },
  ];

  return (
    <DashboardLayout role="faculty">
      <Header
        title="Mark Attendance"
        subtitle="Mark attendance for your assigned course"
      />

      <div className="bg-white rounded-3xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Select Course
            </label>

            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-600 outline-none"
            >
              <option>Operating Systems</option>
              <option>Database Management Systems</option>
              <option>Computer Networks</option>
              <option>Software Engineering</option>
              <option>Web Development</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Date</label>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-6 py-4 text-left">Roll No.</th>
                <th className="px-6 py-4 text-left">Student Name</th>
                <th className="px-6 py-4 text-center">Attendance</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr key={student.rollNo} className="border-b hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium">{student.rollNo}</td>

                  <td className="px-6 py-4">{student.name}</td>

                  <td className="px-6 py-4 text-center">
                    <select
                      defaultValue={student.status ? "Present" : "Absent"}
                      className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option>Present</option>
                      <option>Absent</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={() => alert("Attendance has been saved successfully!")}
            className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-xl font-semibold transition"
          >
            Save Attendance
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
