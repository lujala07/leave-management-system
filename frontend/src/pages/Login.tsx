import { useState } from "react";
import { useAuth } from "../context/useAuth";

const Login = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const success = login(email, password);
    if (!success) {
      setError("Invalid credentials");
    } else {
      setError("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <label htmlFor="email" className="block text-sm">Email</label>
        <input type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative mb-6">
          <label htmlFor="password" className="block text-sm">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-7 text-gray-600"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {error && <p className="text-red-500 mb-3">{error}</p>}
        <button type="submit" className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-500 shadow-xl mx-auto block">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
