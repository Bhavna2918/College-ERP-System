interface StatCardProps {
  title: string;
  value: string;
  icon: string;
  color: string;
}

export default function StatCard({ title, value, icon, color }: StatCardProps) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition-all">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>

          <h2 className="text-3xl font-bold mt-2 text-slate-800">{value}</h2>
        </div>

        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color}`}
        >
          <i className={`bi ${icon} text-white text-2xl`}></i>
        </div>
      </div>
    </div>
  );
}
