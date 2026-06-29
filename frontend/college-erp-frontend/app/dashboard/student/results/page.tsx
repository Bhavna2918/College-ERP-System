"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Header from "@/components/layout/header";

export default function ResultsPage() {
  const [semester, setSemester] = useState("Semester V");

  const results = {
    "Semester I": [
      {
        code: "CS101",
        subject: "Programming Fundamentals",
        marks: 84,
        grade: "A",
      },
      {
        code: "MA101",
        subject: "Engineering Mathematics I",
        marks: 88,
        grade: "A",
      },
      { code: "PH101", subject: "Engineering Physics", marks: 82, grade: "A" },
    ],

    "Semester II": [
      { code: "CS201", subject: "Data Structures", marks: 86, grade: "A" },
      { code: "MA201", subject: "Discrete Mathematics", marks: 80, grade: "A" },
      { code: "EE201", subject: "Digital Electronics", marks: 85, grade: "A" },
    ],

    "Semester III": [
      {
        code: "CS301",
        subject: "Object Oriented Programming",
        marks: 89,
        grade: "A+",
      },
      {
        code: "CS302",
        subject: "Computer Organization",
        marks: 84,
        grade: "A",
      },
      {
        code: "CS303",
        subject: "Operating Systems Basics",
        marks: 87,
        grade: "A",
      },
    ],

    "Semester IV": [
      { code: "CS401", subject: "Database Concepts", marks: 90, grade: "A+" },
      {
        code: "CS402",
        subject: "Theory of Computation",
        marks: 85,
        grade: "A",
      },
      {
        code: "CS403",
        subject: "Design & Analysis of Algorithms",
        marks: 88,
        grade: "A",
      },
    ],

    "Semester V": [
      { code: "CS501", subject: "Operating Systems", marks: 88, grade: "A" },
      {
        code: "CS502",
        subject: "Database Management Systems",
        marks: 91,
        grade: "A+",
      },
      { code: "CS503", subject: "Computer Networks", marks: 84, grade: "A" },
      { code: "CS504", subject: "Software Engineering", marks: 86, grade: "A" },
      { code: "CS505", subject: "Web Development", marks: 95, grade: "A+" },
    ],

    "Semester VI": [],
    "Semester VII": [],
    "Semester VIII": [],
  };

  const semesterData = results[semester as keyof typeof results];

  return (
    <DashboardLayout role="student">
      <Header
        title="Results"
        subtitle="View your semester-wise examination results"
      />

      <div className="bg-white rounded-3xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">{semester}</h2>

          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option>Semester I</option>
            <option>Semester II</option>
            <option>Semester III</option>
            <option>Semester IV</option>
            <option>Semester V</option>
            <option>Semester VI</option>
            <option>Semester VII</option>
            <option>Semester VIII</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 rounded-2xl p-6">
            <p className="text-gray-500">CGPA</p>
            <h2 className="text-3xl font-bold text-blue-700">--</h2>
          </div>

          <div className="bg-green-50 rounded-2xl p-6">
            <p className="text-gray-500">SGPA</p>
            <h2 className="text-3xl font-bold text-green-600">--</h2>
          </div>

          <div className="bg-purple-50 rounded-2xl p-6">
            <p className="text-gray-500">Result Status</p>
            <h2 className="text-3xl font-bold text-purple-600">--</h2>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-6 py-4 text-left">Course Code</th>
                <th className="px-6 py-4 text-left">Subject</th>
                <th className="px-6 py-4 text-center">Marks</th>
                <th className="px-6 py-4 text-center">Grade</th>
              </tr>
            </thead>

            <tbody>
              {semesterData.length > 0 ? (
                semesterData.map((subject) => (
                  <tr key={subject.code} className="border-b hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium">{subject.code}</td>

                    <td className="px-6 py-4">{subject.subject}</td>

                    <td className="px-6 py-4 text-center">{subject.marks}</td>

                    <td className="px-6 py-4 text-center">
                      <span className="font-semibold text-green-600">
                        {subject.grade}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-gray-500">
                    Results are not available for this semester.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
