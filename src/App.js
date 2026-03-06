import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import CreateTask from "./pages/CreateTask";
import TaskList from "./pages/TaskList";
import InternDashboard from "./pages/InternDashboard";
import SubmitTask from "./pages/SubmitTask";
import MySubmissions from "./pages/MySubmissions";
import AdminSubmissions from "./pages/AdminSubmissions";
import EvaluateSubmission from "./pages/EvaluateSubmission";
import MyCertificates from "./pages/MyCertificates";
import Certificates from "./pages/Certificates";       // ✅ missing import added
        // ✅ missing import added

function App() {
  return (
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/AdminDashboard" element={<AdminDashboard />} />
      <Route path="/InternDashboard" element={<InternDashboard />} />
      <Route path="/create-task" element={<CreateTask />} />
      <Route path="/tasks" element={<TaskList />} />
      <Route path="/submit/:taskId" element={<SubmitTask />} />
      <Route path="/my-submissions" element={<MySubmissions />} />
      <Route path="/admin-submissions" element={<AdminSubmissions />} />
      <Route path="/evaluate/:id" element={<EvaluateSubmission />} />
      <Route path="/Certificates" element={<Certificates />} />
      <Route path="/my-certificates" element={<MyCertificates />} />     {/* ✅ added */}
      <Route path="/evaluations" element={<EvaluateSubmission />} />     {/* ✅ added */}
    </Routes>
    </BrowserRouter>
  );
}

export default App;
