"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Header from "@/components/layout/header";

export default function ManageTimetablePage() {
  const [showPopup, setShowPopup] = useState(false);

  const timetable = [
    {
      day: "Monday",
      time: "09:00 - 10:00",
      course: "Operating Systems",
      faculty: "Dr. Rahul Sharma",
      room: "A-205",
    },
    {
      day: "Tuesday",
      time: "10:00 - 11:00",
      course: "Database Management Systems",
      faculty: "Dr. Priya Patel",
      room: "B-104",
    },
    {
      day: "Wednesday",
      time: "11:00 - 12:00",
      course: "Computer Networks",
      faculty: "Dr. Amit Kumar",
      room: "A-301",
    },
    {
      day: "Thursday",
      time: "01:00 - 02:00",
      course: "Software Engineering",
      faculty: "Dr. Sneha Joshi",
      room: "B-201",
    },
    {
      day: "Friday",
      time: "02:00 - 03:00",
      course: "Web Development",
      faculty: "Dr. Rohan Mehta",
      room: "Lab-3",
    },
  ];

  return (
    <DashboardLayout role="admin">
      <Header
        title="Manage Timetable"
        subtitle="Create, update and manage the academic timetable."
      />

      {/* Top Buttons */}

      <div className="flex justify-end gap-4 mb-6">
        <button
          onClick={() => setShowPopup(true)}
          className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl font-semibold"
        >
          + Add Time Slot
        </button>
      </div>

      {/* Timetable */}

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="px-6 py-5 border-b">
          <h2 className="text-xl font-bold text-slate-800">Weekly Timetable</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-6 py-4 text-left">Day</th>
                <th className="px-6 py-4 text-left">Time</th>
                <th className="px-6 py-4 text-left">Course</th>
                <th className="px-6 py-4 text-left">Faculty</th>
                <th className="px-6 py-4 text-center">Room</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {timetable.map((slot, index) => (
                <tr key={index} className="border-b hover:bg-slate-50">
                  <td className="px-6 py-4">{slot.day}</td>

                  <td className="px-6 py-4">{slot.time}</td>

                  <td className="px-6 py-4">{slot.course}</td>

                  <td className="px-6 py-4">{slot.faculty}</td>

                  <td className="px-6 py-4 text-center">{slot.room}</td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => alert("Edit Timetable (Frontend Only)")}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          alert("Timetable slot deleted successfully!")
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

      {/* Room Summary */}

      <div className="bg-white rounded-3xl shadow-lg mt-8 overflow-hidden">
        <div className="px-6 py-5 border-b">
          <h2 className="text-xl font-bold text-slate-800">
            Classroom Allocation
          </h2>
        </div>

        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-6 py-4 text-left">Course</th>
              <th className="px-6 py-4 text-left">Faculty</th>
              <th className="px-6 py-4 text-center">Room</th>
            </tr>
          </thead>

          <tbody>
            {timetable.map((slot, index) => (
              <tr key={index} className="border-b hover:bg-slate-50">
                <td className="px-6 py-4">{slot.course}</td>

                <td className="px-6 py-4">{slot.faculty}</td>

                <td className="px-6 py-4 text-center">{slot.room}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Success Popup */}

      {showPopup && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-3xl p-8 w-96 shadow-xl text-center">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-3xl text-green-600">✓</span>
            </div>

            <h2 className="text-2xl font-bold mt-5">Time Slot Added</h2>

            <p className="text-gray-500 mt-2">
              Timetable has been updated successfully.
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
