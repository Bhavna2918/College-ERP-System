interface ProfileCardProps {
  name: string;
  id: string;
  role: string;
  department: string;
  email: string;
}

export default function ProfileCard({
  name,
  id,
  role,
  department,
  email,
}: ProfileCardProps) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-blue-700 text-white flex items-center justify-center text-4xl font-bold">
          {name.charAt(0)}
        </div>

        <h2 className="text-xl font-bold mt-4 text-slate-800">{name}</h2>

        <p className="text-gray-500">{role}</p>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-500">ID</span>
          <span className="font-medium">{id}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Department</span>
          <span className="font-medium">{department}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Email</span>
          <span className="font-medium text-right">{email}</span>
        </div>
      </div>
    </div>
  );
}
