import { useState } from "react";
import axios from "axios";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AuthForm() {
  const [formData, setFormData] = useState({ email: "", password: "", username: "" });
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isRegister ? "/auth/register" : "/auth/login";
      const { data } = await axios.post(`http://localhost:5000${endpoint}`, formData, { withCredentials: true });

      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Authentication failed"); 
    }
  };

  const handleGoogleAuth = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {isRegister ? "Register" : "Login"}
        </h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <input type="text" name="username" placeholder="Username" className="input" onChange={handleChange} required />
          )}
          <input type="email" name="email" placeholder="Email" className="input" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" className="input" onChange={handleChange} required />

          <button type="submit" className="btn">
            {isRegister ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="flex items-center my-4">
          <div className="border-t flex-grow border-gray-300"></div>
          <span className="px-2 text-gray-500">or</span>
          <div className="border-t flex-grow border-gray-300"></div>
        </div>

        <button onClick={handleGoogleAuth} className="btn bg-red-500 hover:bg-red-600">
          <FaGoogle className="mr-2" /> Continue with Google
        </button>

        <p className="text-sm text-gray-600 mt-4 text-center">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <span className="text-blue-600 cursor-pointer" onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
}
