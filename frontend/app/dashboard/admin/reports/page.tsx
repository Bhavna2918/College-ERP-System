"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Header from "@/components/layout/header";

export default function ReportsPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [reportName, setReportName] = useState("");

  const reports = [
    {
      title: "Student Report",
      description: "Complete list of registered students.",
    },
    {
      title: "Faculty Report",
      description: "Faculty details and department information.",
    },
    {
      title: "Attendance Report",
      description: "Overall student attendance report.",
    },
    {
      title: "Result Report",
      description: "Semester-wise examination results.",
    },
    {
      title: "Course Allocation Report",
      description: "Faculty course allocation details.",
    },
    {
      title: "Timetable Report",
      description: "Complete academic timetable.",
    },
  ];

  const recentReports = [
    {
      name: "Student Report",
      date: "12 July 2026",
      status: "Generated",
    },
    {
      name: "Attendance Report",
      date: "10 July 2026",
      status: "Generated",
    },
    {
      name: "Faculty Report",
      date: "08 July 2026",
      status: "Generated",
    },
  ];

  return (
    <DashboardLayout role="admin">
      <Header
        title="Reports"
        subtitle="Generate and download institutional reports."
      />

      {/* Report Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <div
            key={report.title}
            className="bg-white rounded-3xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-slate-800">{report.title}</h2>

            <p className="text-gray-500 mt-3">{report.description}</p>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setReportName(report.title);
                  setShowPopup(true);
                }}
                className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg"
              >
                Generate
              </button>

              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Reports */}

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden mt-8">
        <div className="px-6 py-5 border-b">
          <h2 className="text-xl font-bold text-slate-800">
            Recently Generated Reports
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-6 py-4 text-left">Report Name</th>

                <th className="px-6 py-4 text-center">Generated On</th>

                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>

            <tbody>
              {recentReports.map((report, index) => (
                <tr key={index} className="border-b hover:bg-slate-50">
                  <td className="px-6 py-4">{report.name}</td>

                  <td className="px-6 py-4 text-center">{report.date}</td>

                  <td className="px-6 py-4 text-center">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      {report.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Popup */}

      {showPopup && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-3xl p-8 w-96 shadow-xl text-center">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-3xl text-green-600">✓</span>
            </div>

            <h2 className="text-2xl font-bold mt-5">Report Generated</h2>

            <p className="text-gray-500 mt-2">
              {reportName} has been generated successfully.
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
