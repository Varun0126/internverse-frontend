import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Certificates() {

  const [certificates, setCertificates] = useState([]);
  const [internEmail, setInternEmail] = useState("");
  const [course, setCourse] = useState("");
  const [completionDate, setCompletionDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchCertificates = async () => {
    try {
      const res = await API.get("/certificates");
      const data = Array.isArray(res.data) ? res.data : [];
      setCertificates(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleGenerate = async () => {

    setError("");

    if (!internEmail || !course || !completionDate) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      await API.post("/certificates", {
        internEmail,
        course,
        completionDate
      });

      alert("Certificate issued successfully");
      setInternEmail("");
      setCourse("");
      setCompletionDate("");
      fetchCertificates();

    } catch (err) {
      console.log(err);
      // ✅ Show backend error message (e.g. intern not found)
      const msg = err.response?.data?.message || err.response?.data || "Failed to issue certificate";
      setError(typeof msg === "string" ? msg : "Intern not found. Please check the email.");
    } finally {
      setLoading(false);
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

          <h2 className="text-2xl font-bold text-gray-800 mb-6">Issue Certificates</h2>

          {/* Issue Certificate Form */}
          <div className="bg-white rounded-xl shadow p-6 mb-8 max-w-md">

            <h3 className="text-lg font-semibold mb-4">Issue New Certificate</h3>

            {/* ✅ Error message */}
            {error && (
              <div className="bg-red-50 border border-red-300 text-red-600 text-sm rounded p-3 mb-4">
                ❌ {error}
              </div>
            )}

            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Intern Email
            </label>
            <input
              type="email"
              className="border p-2 w-full mb-4 rounded"
              placeholder="Enter intern's registered email"
              value={internEmail}
              onChange={(e) => { setInternEmail(e.target.value); setError(""); }}
            />

            <p className="text-xs text-gray-400 mb-4 -mt-3">
              ℹ️ The intern's name will be fetched automatically from their account.
            </p>

            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Course / Task Title
            </label>
            <input
              className="border p-2 w-full mb-4 rounded"
              placeholder="e.g. React Development Internship"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            />

            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Completion Date
            </label>
            <input
              type="date"
              className="border p-2 w-full mb-6 rounded"
              value={completionDate}
              onChange={(e) => setCompletionDate(e.target.value)}
            />

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded w-full transition"
            >
              {loading ? "Issuing..." : "Issue Certificate"}
            </button>

          </div>

          {/* All Issued Certificates */}
          <h3 className="text-lg font-semibold mb-3">All Issued Certificates</h3>

          {certificates.length === 0 ? (
            <p className="text-gray-500">No certificates issued yet.</p>
          ) : (
            <table className="w-full border bg-white rounded-xl shadow">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">#</th>
                  <th className="border p-2">Intern Name</th>
                  <th className="border p-2">Intern Email</th>
                  <th className="border p-2">Course</th>
                  <th className="border p-2">Completion Date</th>
                </tr>
              </thead>
              <tbody>
                {certificates.map((c, index) => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="border p-2 text-center">{index + 1}</td>
                    <td className="border p-2">{c.internName}</td>
                    <td className="border p-2 text-gray-500">{c.internEmail}</td>
                    <td className="border p-2">{c.course}</td>
                    <td className="border p-2">{c.completionDate}</td>
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

export default Certificates;