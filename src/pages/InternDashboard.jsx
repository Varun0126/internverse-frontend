import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function InternDashboard() {

  const [tasks, setTasks] = useState([]);
  const [submittedTaskIds, setSubmittedTaskIds] = useState([]);
  const name = localStorage.getItem("name");

  const fetchData = async () => {
    try {
      // ✅ Fetch both tasks and intern's submissions in parallel
      const [tasksRes, submissionsRes] = await Promise.all([
        API.get("/tasks"),
        API.get("/submissions/my")
      ]);

      const allTasks = Array.isArray(tasksRes.data) ? tasksRes.data : [];
      const mySubmissions = Array.isArray(submissionsRes.data) ? submissionsRes.data : [];

      // ✅ Collect IDs of tasks already submitted
      const submittedIds = mySubmissions
        .map(s => s.task?.id)
        .filter(Boolean);

      setTasks(allTasks);
      setSubmittedTaskIds(submittedIds);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Filter out already submitted tasks
  const pendingTasks = tasks.filter(t => !submittedTaskIds.includes(t.id));

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-8">

          <h2 className="text-3xl font-bold text-gray-800 mb-1">
            Welcome, {name} 👋
          </h2>
          <p className="text-gray-500 mb-8">Here are your pending tasks.</p>

          {pendingTasks.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-8 text-center text-gray-400">
              <div className="text-4xl mb-3">🎉</div>
              <div className="font-semibold text-gray-600">All tasks submitted!</div>
              <div className="text-sm mt-1">Check your submissions tab to track evaluations.</div>
              <Link to="/my-submissions">
                <button className="mt-4 bg-purple-600 text-white px-5 py-2 rounded-lg text-sm">
                  View My Submissions
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {pendingTasks.map((task) => (
                <div key={task.id} className="bg-white rounded-xl shadow p-5 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-gray-800 text-lg">{task.title}</div>
                    <div className="text-sm text-gray-500 mt-1">{task.description}</div>
                    <div className="text-xs text-red-400 mt-2">⏰ Deadline: {task.deadline}</div>
                  </div>
                  <Link to={`/submit/${task.id}`}>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm transition">
                      Submit
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default InternDashboard;