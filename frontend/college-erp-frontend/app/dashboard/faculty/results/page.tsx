"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Header from "@/components/layout/header";

export default function UploadMarksPage() {
  const [course, setCourse] = useState("Operating Systems");
  const [exam, setExam] = useState("Mid Semester");
  const [showPopup, setShowPopup] = useState(false);

  const students = [
    {
      rollNo: "23CS001",
      name: "Rahul Sharma",
      internal: 28,
      external: 58,
    },
    {
      rollNo: "23CS002",
      name: "Priya Patel",
      internal: 26,
      external: 54,
    },
    {
      rollNo: "23CS003",
      name: "Amit Kumar",
      internal: 30,
      external: 60,
    },
    {
      rollNo: "23CS004",
      name: "Sneha Joshi",
      internal: 29,
      external: 57,
    },
    {
      rollNo: "23CS005",
      name: "Rohan Mehta",
      internal: 27,
      external: 55,
    },
  ];

  return (
    <DashboardLayout role="faculty">
      <Header
        title="Upload Marks / Results"
        subtitle="Enter internal and external marks for students"
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
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option>Operating Systems</option>
              <option>Database Management Systems</option>
              <option>Computer Networks</option>
              <option>Software Engineering</option>
              <option>Web Development</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Examination
            </label>

            <select
              value={exam}
              onChange={(e) => setExam(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option>Mid Semester</option>
              <option>End Semester</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-6 py-4 text-left">Roll No.</th>
                <th className="px-6 py-4 text-left">Student Name</th>
                <th className="px-6 py-4 text-center">Internal (30)</th>
                <th className="px-6 py-4 text-center">External (70)</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr key={student.rollNo} className="border-b hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium">{student.rollNo}</td>

                  <td className="px-6 py-4">{student.name}</td>

                  <td className="px-6 py-4 text-center">
                    <input
                      type="number"
                      defaultValue={student.internal}
                      className="w-24 border rounded-lg px-3 py-2 text-center outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </td>

                  <td className="px-6 py-4 text-center">
                    <input
                      type="number"
                      defaultValue={student.external}
                      className="w-24 border rounded-lg px-3 py-2 text-center outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-8">
          <button
            onClick={() => setShowPopup(true)}
            className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-xl font-semibold transition"
          >
            Save Results
          </button>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-96 text-center shadow-xl">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-3xl text-green-600">✓</span>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mt-5">
              Results Saved
            </h2>

            <p className="text-gray-500 mt-2">
              Student marks have been updated successfully.
            </p>

            <button
              onClick={() => setShowPopup(false)}
              className="mt-6 bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-xl"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
