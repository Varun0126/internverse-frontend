import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";

function AdminDashboard() {

  const name = localStorage.getItem("name");

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-8">

          <h2 className="text-3xl font-bold text-gray-800 mb-1">
            Welcome back, {name} 👋
          </h2>
          <p className="text-gray-500 mb-8">Here's what's happening on InternVerse.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <Link to="/create-task">
              <div className="bg-white rounded-xl shadow p-6 hover:shadow-md transition cursor-pointer border-l-4 border-blue-500">
                <div className="text-2xl mb-2">➕</div>
                <div className="font-bold text-gray-700">Create Task</div>
                <div className="text-sm text-gray-400 mt-1">Assign new tasks to interns</div>
              </div>
            </Link>

            <Link to="/admin-submissions">
              <div className="bg-white rounded-xl shadow p-6 hover:shadow-md transition cursor-pointer border-l-4 border-purple-500">
                <div className="text-2xl mb-2">📥</div>
                <div className="font-bold text-gray-700">Submissions</div>
                <div className="text-sm text-gray-400 mt-1">Review intern submissions</div>
              </div>
            </Link>

            <Link to="/evaluations">
              <div className="bg-white rounded-xl shadow p-6 hover:shadow-md transition cursor-pointer border-l-4 border-green-500">
                <div className="text-2xl mb-2">✅</div>
                <div className="font-bold text-gray-700">Evaluations</div>
                <div className="text-sm text-gray-400 mt-1">Evaluate and grade submissions</div>
              </div>
            </Link>

            <Link to="/certificates">
              <div className="bg-white rounded-xl shadow p-6 hover:shadow-md transition cursor-pointer border-l-4 border-yellow-500">
                <div className="text-2xl mb-2">🏅</div>
                <div className="font-bold text-gray-700">Certificates</div>
                <div className="text-sm text-gray-400 mt-1">Issue completion certificates</div>
              </div>
            </Link>

            <Link to="/tasks">
              <div className="bg-white rounded-xl shadow p-6 hover:shadow-md transition cursor-pointer border-l-4 border-orange-500">
                <div className="text-2xl mb-2">📋</div>
                <div className="font-bold text-gray-700">All Tasks</div>
                <div className="text-sm text-gray-400 mt-1">View all created tasks</div>
              </div>
            </Link>

          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;