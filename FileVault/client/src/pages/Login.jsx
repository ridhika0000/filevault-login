
import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-blue-700 via-blue-800 to-gray-900 flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500 opacity-20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-500 opacity-20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>

      <div className="text-center text-white z-10 mb-8">
        <h1 className="text-5xl font-extrabold tracking-tight drop-shadow-md">
          Welcome Back
        </h1>
        <p className="mt-4 text-lg max-w-xl mx-auto text-gray-200 drop-shadow-sm">
          Log in to manage and share your files securely with FileVault.
        </p>
      </div>

      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 w-full max-w-sm shadow-2xl z-10">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Log In
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 pr-10 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-2 flex items-center text-sm text-gray-300">
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold p-3 rounded-lg transition duration-200 shadow-md">
            Log In
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-300">
          Don't have an account?{" "}
          <Link
            to="/"
            className="text-pink-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}