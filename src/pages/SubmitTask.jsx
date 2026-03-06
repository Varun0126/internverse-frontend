import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function SubmitTask() {

  const { taskId } = useParams();
  const navigate = useNavigate();
  const [githubLink, setGithubLink] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    if (!githubLink) {
      alert("Please enter a GitHub link");
      return;
    }
    try {
      await API.post("/submissions", {
        githubLink,
        comment,
        task: { id: taskId }
      });
      alert("Task submitted successfully");
      navigate("/InternDashboard");
    } catch (err) {
      console.log(err);
      alert("Submission failed");
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

          <h2 className="text-2xl font-bold text-gray-800 mb-6">Submit Task</h2>

          <div className="bg-white rounded-xl shadow p-6 max-w-lg">

            <input
              className="border p-2 w-full mb-4 rounded"
              placeholder="GitHub Repository Link"
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
            />

            <textarea
              className="border p-2 w-full mb-6 rounded"
              placeholder="Add a comment (optional)"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded w-full transition"
            >
              Submit Task
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default SubmitTask;