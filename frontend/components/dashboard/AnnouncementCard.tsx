interface Announcement {
  title: string;
  date: string;
}

interface AnnouncementCardProps {
  announcements: Announcement[];
}

export default function AnnouncementCard({
  announcements,
}: AnnouncementCardProps) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-5">
        <i className="bi bi-megaphone-fill text-blue-700 text-xl"></i>

        <h2 className="text-xl font-bold text-slate-800">Announcements</h2>
      </div>

      <div className="space-y-4">
        {announcements.map((announcement, index) => (
          <div key={index} className="border-l-4 border-blue-600 pl-4 py-1">
            <h3 className="font-semibold text-slate-700">
              {announcement.title}
            </h3>

            <p className="text-sm text-gray-500 mt-1">{announcement.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
