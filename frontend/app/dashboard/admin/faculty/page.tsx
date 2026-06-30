"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Header from "@/components/layout/header";

export default function ManageFacultyPage() {
  const [search, setSearch] = useState("");

  const faculty = [
    {
      id: "FAC001",
      name: "Dr. Rahul Sharma",
      department: "Computer Science",
      designation: "Assistant Professor",
      email: "rahul.sharma@college.edu",
    },
    {
      id: "FAC002",
      name: "Dr. Priya Patel",
      department: "Computer Science",
      designation: "Associate Professor",
      email: "priya.patel@college.edu",
    },
    {
      id: "FAC003",
      name: "Dr. Amit Kumar",
      department: "Information Technology",
      designation: "Assistant Professor",
      email: "amit.kumar@college.edu",
    },
    {
      id: "FAC004",
      name: "Dr. Sneha Joshi",
      department: "Electronics",
      designation: "Professor",
      email: "sneha.joshi@college.edu",
    },
    {
      id: "FAC005",
      name: "Dr. Rohan Mehta",
      department: "Mechanical",
      designation: "Assistant Professor",
      email: "rohan.mehta@college.edu",
    },
  ];

  const filteredFaculty = faculty.filter(
    (member) =>
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.id.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <DashboardLayout role="admin">
      <Header
        title="Manage Faculty"
        subtitle="Add, edit, delete and search faculty records."
      />

      {/* Search and Add */}

      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Faculty ID or Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-xl px-4 py-3 w-full md:w-96 outline-none focus:ring-2 focus:ring-blue-600"
        />

        <button
          onClick={() =>
            alert("Add Faculty feature will be connected to backend.")
          }
          className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl font-semibold"
        >
          + Add Faculty
        </button>
      </div>

      {/* Faculty Table */}

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-6 py-4 text-left">Faculty ID</th>
                <th className="px-6 py-4 text-left">Faculty Name</th>
                <th className="px-6 py-4 text-left">Department</th>
                <th className="px-6 py-4 text-left">Designation</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredFaculty.map((member) => (
                <tr key={member.id} className="border-b hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium">{member.id}</td>

                  <td className="px-6 py-4">{member.name}</td>

                  <td className="px-6 py-4">{member.department}</td>

                  <td className="px-6 py-4">{member.designation}</td>

                  <td className="px-6 py-4">{member.email}</td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() =>
                          alert(`Edit ${member.name} (Frontend Only)`)
                        }
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          alert(`${member.name} deleted successfully!`)
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
