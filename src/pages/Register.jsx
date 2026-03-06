import { useState } from "react";
import { useNavigate } from "react-router-dom";  // ✅ add this
import API from "../services/api";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();  // ✅ add this

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
        role: "INTERN"
      });
      alert("Registered Successfully");
      navigate("/login");  // ✅ redirect to login after registration
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">

      <h2 className="text-2xl font-bold mb-6">Register</h2>

      <input
        className="border p-2 mb-3 w-64"
        placeholder="Full Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="border p-2 mb-3 w-64"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="border p-2 mb-3 w-64"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleRegister}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        Register as Intern
      </button>

      <p className="mt-4 text-sm text-gray-500">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-blue-600 cursor-pointer hover:underline"
        >
          Login here
        </span>
      </p>

    </div>
  );
}

export default Register;