import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function AdminSubmissions() {

  const [submissions, setSubmissions] = useState([]);
  const navigate = useNavigate();

  const fetchSubmissions = async () => {
    try {
      const res = await API.get("/submissions");
      const data = Array.isArray(res.data) ? res.data : [];
      setSubmissions(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const getStatusClass = (status) => {
    if (status === "APPROVED") return "border p-2 font-bold text-green-600";
    return "border p-2 font-bold text-orange-500";
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
            Back
          </button>

          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Intern Submissions
          </h2>

          {submissions.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-8 text-center text-gray-400">
              No submissions yet.
            </div>
          ) : (
            <table className="w-full border bg-white rounded-xl shadow">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border p-2">Intern</th>
                  <th className="border p-2">Task</th>
                  <th className="border p-2">Github</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Evaluate</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50">

                    <td className="border p-2">
                      {s.intern ? s.intern.name : "Intern"}
                    </td>

                    <td className="border p-2">
                      {s.task ? s.task.title : "N/A"}
                    </td>

                    <td className="border p-2">
                      <a
                        href={s.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline"
                      >
                        View
                      </a>
                    </td>

                    <td className={getStatusClass(s.status)}>
                      {s.status}
                    </td>

                    <td className="border p-2">
                      <button
                        onClick={() => navigate(`/evaluate/${s.id}`)}
                        className="bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Evaluate
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          )}

        </div>
      </div>
    </div>
  );
}

export default AdminSubmissions;
