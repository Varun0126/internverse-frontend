import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Evaluations() {

  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchSubmissions = async () => {
    try {
      const res = await API.get("/submissions");
      setSubmissions(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load submissions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const pending = submissions.filter(s => s.status === "PENDING");
  const approved = submissions.filter(s => s.status === "APPROVED");

  return (

    <div className="p-6">

      <h2 className="text-2xl font-bold mb-6">
        Evaluations
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <>
          {/* Pending Submissions */}
          <h3 className="text-lg font-semibold mb-3 text-orange-600">
            Pending ({pending.length})
          </h3>

          {pending.length === 0 ? (
            <p className="text-gray-500 mb-6">No pending submissions.</p>
          ) : (
            <table className="w-full border mb-8">

              <thead className="bg-orange-100">
                <tr>
                  <th className="border p-2">Intern</th>
                  <th className="border p-2">Task</th>
                  <th className="border p-2">Github</th>
                  <th className="border p-2">Submitted On</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>

              <tbody>
                {pending.map((s) => (
                  <tr key={s.id}>

                    <td className="border p-2">
                      {s.intern?.name || s.intern?.email || "Unknown"}
                    </td>

                    <td className="border p-2">
                      {s.task?.title || "N/A"}
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

                    <td className="border p-2">
                      {s.submissionDate}
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

          {/* Approved Submissions */}
          <h3 className="text-lg font-semibold mb-3 text-green-600">
            Approved ({approved.length})
          </h3>

          {approved.length === 0 ? (
            <p className="text-gray-500">No approved submissions yet.</p>
          ) : (
            <table className="w-full border">

              <thead className="bg-green-100">
                <tr>
                  <th className="border p-2">Intern</th>
                  <th className="border p-2">Task</th>
                  <th className="border p-2">Github</th>
                  <th className="border p-2">Submitted On</th>
                  <th className="border p-2">Status</th>
                </tr>
              </thead>

              <tbody>
                {approved.map((s) => (
                  <tr key={s.id}>

                    <td className="border p-2">
                      {s.intern?.name || s.intern?.email || "Unknown"}
                    </td>

                    <td className="border p-2">
                      {s.task?.title || "N/A"}
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

                    <td className="border p-2">
                      {s.submissionDate}
                    </td>

                    <td className="border p-2 font-bold text-green-600">
                      {s.status}
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          )}
        </>
      )}

    </div>

  );

}

export default Evaluations;
