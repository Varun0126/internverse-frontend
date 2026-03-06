import { Link, useLocation } from "react-router-dom";

function Sidebar() {

  const role = localStorage.getItem("role");
  const location = useLocation();

  const adminLinks = [
    { to: "/AdminDashboard",     label: "🏠 Dashboard" },
    { to: "/create-task",        label: "➕ Create Task" },
    { to: "/tasks",              label: "📋 All Tasks" },
    { to: "/admin-submissions",  label: "📥 Submissions" },
    { to: "/evaluations",        label: "✅ Evaluations" },
    { to: "/certificates",       label: "🏅 Certificates" },
  ];

  const internLinks = [
    { to: "/InternDashboard",    label: "🏠 Dashboard" },
    { to: "/my-submissions",     label: "📄 My Submissions" },
    { to: "/my-certificates",    label: "🏅 My Certificates" },
  ];

  const links = role === "ROLE_ADMIN" ? adminLinks : internLinks;

  return (
    <div className="w-56 bg-gray-800 text-white min-h-screen p-4 flex flex-col">

      <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 mt-2">
        Menu
      </h2>

      <ul className="space-y-1 flex-1">
        {links.map((link) => {
          const isActive = location.pathname === link.to;
          return (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`flex items-center px-3 py-2 rounded text-sm transition ${
                  isActive
                    ? "bg-purple-600 text-white font-semibold"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>

    </div>
  );
}

export default Sidebar;