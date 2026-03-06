import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("userEmail", email); // ✅ save email as unique identifier

      alert("Login successful");

      if (res.data.role === "ROLE_ADMIN") {
        navigate("/AdminDashboard");
      } else {
        navigate("/InternDashboard");
      }

    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">

      <h2 className="text-2xl font-bold mb-6">Login</h2>

      <input
        className="border p-2 mb-4 w-64"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="border p-2 mb-4 w-64"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Login
      </button>

    </div>
  );
}

export default Login;