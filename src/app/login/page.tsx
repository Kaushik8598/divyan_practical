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
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background p-4">
      <div className="w-full max-w-md bg-white dark:bg-surface p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-borderDark">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-textMain tracking-tight">
            Divyan{" "}
            <span className="text-cyan-700 dark:text-primary drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]">
              AI
            </span>
          </h1>
          <p className="text-sm text-gray-600 dark:text-textMuted mt-2">
            Sign in to your analytics dashboard
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 text-sm text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-textMuted mb-1"
            >
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-background border border-gray-300 dark:border-borderDark rounded-lg focus:ring-2 focus:ring-cyan-700 dark:focus:ring-primary focus:border-transparent outline-none transition-all text-gray-900 dark:text-textMain placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="admin@divyan.ai"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-textMuted mb-1"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-background border border-gray-300 dark:border-borderDark rounded-lg focus:ring-2 focus:ring-cyan-700 dark:focus:ring-primary focus:border-transparent outline-none transition-all text-gray-900 dark:text-textMain placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label
              htmlFor="remember"
              className="flex items-center space-x-2 text-sm text-gray-700 dark:text-textMuted"
            >
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-gray-300 text-cyan-700 dark:text-primary focus:ring-cyan-700 dark:focus:ring-primary bg-gray-50 dark:bg-background"
              />
              <span>Remember me</span>
            </label>
            <a
              href="#"
              className="text-sm text-cyan-700 dark:text-primary hover:text-cyan-800 dark:hover:text-primary-dark transition-colors"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-cyan-700 dark:bg-primary hover:bg-cyan-800 dark:hover:bg-primary-dark text-white dark:text-background rounded-lg font-medium transition-all shadow-sm dark:shadow-neon"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
