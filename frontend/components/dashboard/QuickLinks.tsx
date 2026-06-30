import Link from "next/link";

interface QuickLink {
  title: string;
  icon: string;
  href: string;
}

interface QuickLinksProps {
  links: QuickLink[];
}

export default function QuickLinks({ links }: QuickLinksProps) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-slate-800 mb-6">Quick Links</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {links.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 hover:border-blue-600 hover:bg-blue-50 transition-all p-6"
          >
            <i className={`bi ${link.icon} text-3xl text-blue-700`}></i>

            <p className="mt-3 font-medium text-slate-700 text-center">
              {link.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
