"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Header from "@/components/layout/header";

export default function ManageStudentsPage() {
  const [search, setSearch] = useState("");

  const students = [
    {
      rollNo: "23CS001",
      name: "Rahul Sharma",
      department: "Computer Science",
      semester: "V",
      email: "rahul@college.edu",
    },
    {
      rollNo: "23CS002",
      name: "Priya Patel",
      department: "Computer Science",
      semester: "V",
      email: "priya@college.edu",
    },
    {
      rollNo: "23CS003",
      name: "Amit Kumar",
      department: "Computer Science",
      semester: "V",
      email: "amit@college.edu",
    },
    {
      rollNo: "23CS004",
      name: "Sneha Joshi",
      department: "Computer Science",
      semester: "VI",
      email: "sneha@college.edu",
    },
    {
      rollNo: "23CS005",
      name: "Rohan Mehta",
      department: "Computer Science",
      semester: "VI",
      email: "rohan@college.edu",
    },
  ];

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <DashboardLayout role="admin">
      <Header
        title="Manage Students"
        subtitle="Add, edit, delete and search student records."
      />

      {/* Top Bar */}

      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Roll No. or Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-xl px-4 py-3 w-full md:w-96 outline-none focus:ring-2 focus:ring-blue-600"
        />

        <button
          onClick={() =>
            alert("Add Student feature will be connected to backend.")
          }
          className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl font-semibold"
        >
          + Add Student
        </button>
      </div>

      {/* Students Table */}

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-6 py-4 text-left">Roll No.</th>
                <th className="px-6 py-4 text-left">Student Name</th>
                <th className="px-6 py-4 text-left">Department</th>
                <th className="px-6 py-4 text-center">Semester</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.rollNo} className="border-b hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium">{student.rollNo}</td>

                  <td className="px-6 py-4">{student.name}</td>

                  <td className="px-6 py-4">{student.department}</td>

                  <td className="px-6 py-4 text-center">{student.semester}</td>

                  <td className="px-6 py-4">{student.email}</td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => alert(`Edit ${student.name} `)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          alert(`${student.name} deleted successfully!`)
                        }
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
