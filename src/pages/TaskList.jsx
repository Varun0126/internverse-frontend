import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function TaskList() {

  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      const data = Array.isArray(res.data) ? res.data : [];
      setTasks(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-8">

          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-500 hover:text-gray-700 mb-6 flex items-center gap-1"
          >
            ← Back
          </button>

          <h2 className="text-2xl font-bold text-gray-800 mb-6">All Tasks</h2>

          {tasks.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-8 text-center text-gray-400">
              No tasks created yet.
            </div>
          ) : (
            <div className="grid gap-4">
              {tasks.map((task) => (
                <div key={task.id} className="bg-white rounded-xl shadow p-5">
                  <div className="font-bold text-gray-800 text-lg">{task.title}</div>
                  <div className="text-sm text-gray-500 mt-1">{task.description}</div>
                  <div className="text-xs text-red-400 mt-2">⏰ Deadline: {task.deadline}</div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default TaskList;