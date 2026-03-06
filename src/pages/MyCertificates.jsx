import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  // ✅ add
import API from "../services/api";
import Navbar from "../components/Navbar";        // ✅ add
import Sidebar from "../components/Sidebar";      // ✅ add

function MyCertificates() {

  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();  // ✅ add

  const fetchCertificates = async () => {
    const internEmail = localStorage.getItem("userEmail");
    if (!internEmail) {
      alert("Session expired. Please login again.");
      setLoading(false);
      return;
    }
    try {
      const res = await API.get(`/certificates/intern/${internEmail}`);
      setCertificates(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const downloadCertificate = (cert) => {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8"/>
          <title>Certificate - ${cert.internName}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Lato:wght@400;700&display=swap');
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Lato', sans-serif; background: #fff; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
            .certificate { width: 860px; padding: 60px 80px; border: 16px solid #6b21a8; outline: 4px solid #d8b4fe; outline-offset: -24px; text-align: center; background: linear-gradient(135deg, #faf5ff 0%, #ffffff 50%, #faf5ff 100%); }
            .logo { font-size: 28px; font-weight: 700; color: #6b21a8; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 8px; }
            .divider { width: 80px; height: 3px; background: #6b21a8; margin: 16px auto; }
            .title { font-family: 'Playfair Display', serif; font-size: 42px; color: #1e1b4b; margin: 20px 0 8px; }
            .subtitle { font-size: 16px; color: #6b7280; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 40px; }
            .presented { font-size: 15px; color: #6b7280; margin-bottom: 12px; }
            .name { font-family: 'Playfair Display', serif; font-size: 48px; color: #6b21a8; border-bottom: 2px solid #d8b4fe; display: inline-block; padding-bottom: 8px; margin-bottom: 32px; }
            .description { font-size: 16px; color: #374151; margin-bottom: 8px; }
            .course { font-size: 22px; font-weight: 700; color: #1e1b4b; margin-bottom: 40px; }
            .footer { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 50px; }
            .sig-block { text-align: center; }
            .sig-line { width: 160px; border-top: 2px solid #374151; margin-bottom: 6px; }
            .sig-label { font-size: 13px; color: #6b7280; text-transform: uppercase; letter-spacing: 1px; }
            .date-block { text-align: center; }
            .date-value { font-size: 16px; font-weight: 700; color: #1e1b4b; }
            .date-label { font-size: 13px; color: #6b7280; text-transform: uppercase; letter-spacing: 1px; }
            .seal { width: 80px; height: 80px; border: 4px solid #6b21a8; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: #6b21a8; text-transform: uppercase; letter-spacing: 1px; text-align: center; line-height: 1.3; }
            @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
          </style>
        </head>
        <body>
          <div class="certificate">
            <div class="logo">InternVerse</div>
            <div class="divider"></div>
            <div class="title">Certificate of Completion</div>
            <div class="subtitle">This is to certify that</div>
            <div class="presented">With great pride, we present this certificate to</div>
            <div class="name">${cert.internName}</div>
            <div class="description">for successfully completing the program</div>
            <div class="course">${cert.course}</div>
            <div class="footer">
              <div class="sig-block">
                <div class="sig-line"></div>
                <div class="sig-label">Program Director</div>
              </div>
              <div class="seal">Official<br/>Seal</div>
              <div class="date-block">
                <div class="date-value">${cert.completionDate}</div>
                <div class="date-label">Date of Completion</div>
              </div>
            </div>
          </div>
          <script>window.onload = function() { window.print(); }</script>
        </body>
      </html>
    `;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const win = window.open(url, "_blank");
    if (!win) alert("Please allow popups to download the certificate.");
  };

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

          <h2 className="text-2xl font-bold text-gray-800 mb-6">My Certificates</h2>

          {loading ? (
            <p className="text-gray-500">Loading your certificates...</p>
          ) : certificates.length === 0 ? (
            <div className="text-center mt-16">
              <p className="text-gray-500 text-lg">No certificates issued yet.</p>
              <p className="text-gray-400 mt-2">Complete your tasks and get evaluated to earn certificates.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {certificates.map((c) => (
                <div key={c.id} className="border rounded-lg p-5 bg-purple-50 flex items-center justify-between">
                  <div>
                    <div className="text-lg font-bold text-purple-800">{c.course}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      Issued to: <span className="font-semibold">{c.internName}</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Completed: {c.completionDate}
                    </div>
                  </div>
                  <button
                    onClick={() => downloadCertificate(c)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded flex items-center gap-2 transition"
                  >
                    ⬇ Download PDF
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default MyCertificates;