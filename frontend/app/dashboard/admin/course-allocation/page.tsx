"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Header from "@/components/layout/header";

export default function CourseAllocationPage() {
  const [course, setCourse] = useState("Operating Systems");
  const [faculty, setFaculty] = useState("Dr. Rahul Sharma");
  const [semester, setSemester] = useState("V");
  const [section, setSection] = useState("A");
  const [showPopup, setShowPopup] = useState(false);

  const allocations = [
    {
      course: "Operating Systems",
      faculty: "Dr. Rahul Sharma",
      semester: "V",
      section: "A",
    },
    {
      course: "Database Management Systems",
      faculty: "Dr. Priya Patel",
      semester: "V",
      section: "A",
    },
    {
      course: "Computer Networks",
      faculty: "Dr. Amit Kumar",
      semester: "V",
      section: "B",
    },
    {
      course: "Software Engineering",
      faculty: "Dr. Sneha Joshi",
      semester: "VI",
      section: "A",
    },
  ];

  return (
    <DashboardLayout role="admin">
      <Header
        title="Course Allocation"
        subtitle="Assign faculty members to courses."
      />

      <div className="bg-white rounded-3xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-2">Course</label>

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
            <label className="block font-semibold mb-2">Faculty</label>

            <select
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option>Dr. Rahul Sharma</option>
              <option>Dr. Priya Patel</option>
              <option>Dr. Amit Kumar</option>
              <option>Dr. Sneha Joshi</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-2">Semester</label>

            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option>I</option>
              <option>II</option>
              <option>III</option>
              <option>IV</option>
              <option>V</option>
              <option>VI</option>
              <option>VII</option>
              <option>VIII</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-2">Section</label>

            <select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option>A</option>
              <option>B</option>
              <option>C</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button
            onClick={() => setShowPopup(true)}
            className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-xl font-semibold"
          >
            Allocate Course
          </button>
        </div>
      </div>

      {/* Allocated Courses */}

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden mt-8">
        <div className="px-6 py-5 border-b">
          <h2 className="text-xl font-bold text-slate-800">
            Allocated Courses
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-6 py-4 text-left">Course</th>
                <th className="px-6 py-4 text-left">Faculty</th>
                <th className="px-6 py-4 text-center">Semester</th>
                <th className="px-6 py-4 text-center">Section</th>
              </tr>
            </thead>

            <tbody>
              {allocations.map((item, index) => (
                <tr key={index} className="border-b hover:bg-slate-50">
                  <td className="px-6 py-4">{item.course}</td>

                  <td className="px-6 py-4">{item.faculty}</td>

                  <td className="px-6 py-4 text-center">{item.semester}</td>

                  <td className="px-6 py-4 text-center">{item.section}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Success Popup */}

      {showPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-xl p-8 w-96 text-center">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-3xl text-green-600">✓</span>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mt-4">
              Course Allocated
            </h2>

            <p className="text-gray-500 mt-2">
              The course has been assigned successfully.
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
