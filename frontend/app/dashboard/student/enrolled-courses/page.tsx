"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Header from "@/components/layout/header";

export default function EnrolledCoursesPage() {
  const [semester, setSemester] = useState("Semester V");

  const courses = {
    "Semester I": [
      {
        code: "CS101",
        subject: "Programming Fundamentals",
        credits: 4,
        faculty: "Dr. Sharma",
      },
      {
        code: "MA101",
        subject: "Engineering Mathematics I",
        credits: 4,
        faculty: "Dr. Patil",
      },
    ],

    "Semester II": [
      {
        code: "CS201",
        subject: "Data Structures",
        credits: 4,
        faculty: "Prof. Kulkarni",
      },
      {
        code: "MA201",
        subject: "Discrete Mathematics",
        credits: 4,
        faculty: "Dr. Joshi",
      },
    ],

    "Semester III": [
      {
        code: "CS301",
        subject: "Object Oriented Programming",
        credits: 4,
        faculty: "Prof. Deshmukh",
      },
      {
        code: "CS302",
        subject: "Computer Organization",
        credits: 4,
        faculty: "Dr. Rao",
      },
    ],

    "Semester IV": [
      {
        code: "CS401",
        subject: "Theory of Computation",
        credits: 4,
        faculty: "Prof. Kale",
      },
      {
        code: "CS402",
        subject: "Microprocessors",
        credits: 4,
        faculty: "Dr. Patwardhan",
      },
    ],

    "Semester V": [
      {
        code: "CS501",
        subject: "Operating Systems",
        credits: 4,
        faculty: "Dr. Sharma",
      },
      {
        code: "CS502",
        subject: "Database Management Systems",
        credits: 4,
        faculty: "Prof. Patil",
      },
      {
        code: "CS503",
        subject: "Computer Networks",
        credits: 4,
        faculty: "Dr. Kulkarni",
      },
      {
        code: "CS504",
        subject: "Software Engineering",
        credits: 3,
        faculty: "Prof. Joshi",
      },
      {
        code: "CS505",
        subject: "Web Development",
        credits: 3,
        faculty: "Prof. Deshmukh",
      },
    ],

    "Semester VI": [],
    "Semester VII": [],
    "Semester VIII": [],
  };

  const selectedCourses = courses[semester as keyof typeof courses];

  return (
    <DashboardLayout role="student">
      <Header
        title="Enrolled Courses"
        subtitle="View your semester-wise enrolled courses"
      />

      <div className="bg-white rounded-3xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800">{semester}</h2>

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

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-6 py-4 text-left">Course Code</th>

                <th className="px-6 py-4 text-left">Course Name</th>

                <th className="px-6 py-4 text-center">Credits</th>

                <th className="px-6 py-4 text-left">Faculty</th>
              </tr>
            </thead>

            <tbody>
              {selectedCourses.length > 0 ? (
                selectedCourses.map((course) => (
                  <tr key={course.code} className="border-b hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium">{course.code}</td>

                    <td className="px-6 py-4">{course.subject}</td>

                    <td className="px-6 py-4 text-center">{course.credits}</td>

                    <td className="px-6 py-4">{course.faculty}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-gray-500">
                    No courses available for this semester.
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
