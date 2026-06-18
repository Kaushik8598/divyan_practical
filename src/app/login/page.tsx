"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic Validation
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    // Mock Authentication Dispatch
    dispatch(login({ email, rememberMe }));
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Divyan{" "}
            <span className="text-cyan-500 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
              AI
            </span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Sign in to your analytics dashboard
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all dark:text-white"
                placeholder="admin@divyan.ai"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all dark:text-white"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-gray-300 text-cyan-500 focus:ring-cyan-500 bg-gray-50 dark:bg-gray-800"
              />
              <span>Remember me</span>
            </label>
            <a
              href="#"
              className="text-sm text-cyan-500 hover:text-cyan-400 transition-colors"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)]"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
