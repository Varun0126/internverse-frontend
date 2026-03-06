import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  // ✅ add this
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function MySubmissions() {

  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();  // ✅ add this

  const fetchSubmissions = async () => {
    try {
      const res = await API.get("/submissions/my");
      const data = Array.isArray(res.data) ? res.data : [];
      setSubmissions(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-8">

          {/* ✅ Back button */}
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-500 hover:text-gray-700 mb-6 flex items-center gap-1"
          >
            ← Back
          </button>

          <h2 className="text-2xl font-bold text-gray-800 mb-6">My Submissions</h2>

          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : submissions.length === 0 ? (
            <p className="text-gray-500">No submissions yet.</p>
          ) : (
            <div className="grid gap-4">
              {submissions.map((s) => (
                <div key={s.id} className="border rounded-lg p-5 bg-white shadow-sm">

                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-lg font-bold text-gray-800">
                        {s.task?.title || "Task"}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Submitted: {s.submissionDate || "—"}
                      </div>
                    </div>
                    <span className={`font-bold text-sm px-3 py-1 rounded-full border ${
                      s.status === "APPROVED"
                        ? "bg-green-50 border-green-300 text-green-600"
                        : "bg-orange-50 border-orange-300 text-orange-500"
                    }`}>
                      {s.status}
                    </span>
                  </div>

                  <div className="text-sm mb-3">
                    <span className="text-gray-500">GitHub: </span>
                    <a href={s.githubLink} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                      {s.githubLink}
                    </a>
                  </div>

                  {s.comment && (
                    <div className="text-sm text-gray-600 mb-3">
                      <span className="font-semibold">Your comment: </span>{s.comment}
                    </div>
                  )}

                  {s.status === "APPROVED" && s.evaluation && (
                    <div className="mt-3 bg-green-50 border border-green-200 rounded p-3">
                      <div className="text-sm font-bold text-green-700 mb-2">Evaluation Result</div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-gray-600">Rating:</span>
                        <span className="font-bold text-green-700">
                          {"⭐".repeat(s.evaluation.rating)} ({s.evaluation.rating}/5)
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-semibold">Feedback: </span>{s.evaluation.feedback}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        Evaluated on: {s.evaluation.evaluatedDate}
                      </div>
                    </div>
                  )}

                  {s.status === "PENDING" && (
                    <div className="mt-3 bg-orange-50 border border-orange-200 rounded p-3 text-sm text-orange-600">
                      ⏳ Awaiting evaluation from admin...
                    </div>
                  )}

                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default MySubmissions;