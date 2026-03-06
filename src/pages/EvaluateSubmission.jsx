import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function EvaluateSubmission() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleEvaluate = async () => {
    if (!rating || !feedback) {
      alert("Please fill rating and feedback");
      return;
    }
    if (rating < 1 || rating > 5) {
      alert("Rating must be between 1 and 5");
      return;
    }
    try {
      await API.post("/evaluation", {
        rating,
        feedback,
        submission: { id }
      });
      alert("Evaluation submitted successfully");
      navigate("/evaluations");
    } catch (err) {
      console.log(err);
      alert("Evaluation failed");
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

          <h2 className="text-2xl font-bold text-gray-800 mb-6">Evaluate Submission</h2>

          <div className="bg-white rounded-xl shadow p-6 max-w-lg">

            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Rating (1-5)
            </label>
            <input
              type="number"
              min="1"
              max="5"
              className="border p-2 w-full mb-4 rounded"
              placeholder="Enter rating between 1 and 5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />

            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Feedback
            </label>
            <textarea
              className="border p-2 w-full mb-6 rounded"
              placeholder="Write your feedback for the intern..."
              rows={5}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />

            <button
              onClick={handleEvaluate}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded w-full transition"
            >
              Submit Evaluation
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default EvaluateSubmission;