import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  return (
    <div className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center shadow-md">

      <div className="flex items-center gap-3">
        <span className="text-purple-400 text-2xl font-black tracking-tight">
          InternVerse
        </span>
        <span className="text-xs bg-purple-700 text-purple-100 px-2 py-0.5 rounded-full">
          {role === "ROLE_ADMIN" ? "Admin" : "Intern"}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-gray-400 text-sm">
          👤 {name || "User"}
        </span>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-1.5 rounded transition"
        >
          Logout
        </button>
      </div>

    </div>
  );
}

export default Navbar;