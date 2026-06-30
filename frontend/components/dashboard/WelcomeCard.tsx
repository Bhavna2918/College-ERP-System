interface WelcomeCardProps {
  name: string;
  role: string;
}

export default function WelcomeCard({ name, role }: WelcomeCardProps) {
  return (
    <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-sky-600 rounded-3xl shadow-xl p-8 text-white">
      <p className="text-lg opacity-90">Welcome Back,</p>

      <h2 className="text-4xl font-bold mt-2">{name}</h2>

      <p className="mt-2 text-blue-100">{role} Dashboard</p>
    </div>
  );
}
