import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function CreateTask() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const navigate = useNavigate();

  const handleCreateTask = async () => {
    if (!title || !description || !deadline) {
      alert("Please fill all fields");
      return;
    }
    try {
      await API.post("/tasks", { title, description, deadline });
      alert("Task Created Successfully");
      navigate("/AdminDashboard");
    } catch (err) {
      alert("Error creating task");
    }
  };

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

          <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Task</h2>

          <div className="bg-white rounded-xl shadow p-6 max-w-lg">

            <input
              className="border p-2 w-full mb-4 rounded"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              className="border p-2 w-full mb-4 rounded"
              placeholder="Task Description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <input
              type="date"
              className="border p-2 w-full mb-6 rounded"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />

            <button
              onClick={handleCreateTask}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded w-full transition"
            >
              Create Task
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default CreateTask;