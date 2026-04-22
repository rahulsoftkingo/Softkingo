"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signIn } from "next-auth/react";

export default function LoginClient({ callbackUrl }) {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setError("");
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      username: credentials.username.trim(),
      password: credentials.password,
    });

    if (!result || result.error) {
      setError("Invalid credentials. Please check your username and password.");
      setIsLoading(false);
      return;
    }

    // Fetch the updated session to get roles
    const sessionRes = await fetch('/api/auth/session');
    const session = await sessionRes.json();
    const roles = session?.user?.roles || [];

    // Determine default route
    let targetUrl = callbackUrl || "/admin/dashboard";

    if (!callbackUrl) {
      if (roles.includes('admin')) targetUrl = "/admin/dashboard";
      else if (roles.includes('manager')) targetUrl = "/admin/dashboard";
      else if (roles.includes('writer')) targetUrl = "/admin/blog";
      else if (roles.includes('agent')) targetUrl = "/admin/tickets";
      else if (roles.includes('hr')) targetUrl = "/admin/users";
      else if (roles.includes('employee')) targetUrl = "/admin/profile";
    }

    router.push(targetUrl);
    router.refresh();
  };

   return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl max-w-5xl w-full items-center m-3 md:m-0">
        {/* Left Side - Image */}
        <div className="md:w-1/2 w-full h-[fit-content] py-2 pl-2 hidden md:flex">
          <img
            src="/images/services/digital-marketing-bg.png"
            alt="Login background"
            className="h-full w-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-t-none"
          />
        </div>

        {/* Right Side - Form */}
        <div className="md:w-1/2 w-full p-8 md:p-12">
          <div className="text-center mb-8">
            <a href="/" className="flex justify-center">
              <img src="/images/softkingo-logo.png" className="h-12" alt="Softkingo Logo" />
            </a>
            <h2 className="text-xl font-bold text-sky-900 mt-4">Welcome Back!</h2>
            <p className="text-gray-500 mt-2">Sign in to continue to your account.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                Employee ID or Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                placeholder="Enter your employee ID or username"
                autoComplete="username"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
                >
                  {showPassword ? (
                    <FaEye className="h-6 w-6 text-gray-400" />
                  ) : (
                    <FaEyeSlash className="h-6 w-6 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg border border-red-300 text-center text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition duration-300 ease-in-out transform hover:scale-105 ${
                isLoading ? 'bg-sky-300 cursor-not-allowed' : 'bg-sky-500 hover:bg-sky-600'
              }`}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>

            <div className="mt-6 text-center text-sm">
              <Link href="/forgot-password">
                <span className="text-sky-600 hover:text-sky-800 hover:underline cursor-pointer">
                  Forgot your password?
                </span>
              </Link>
            </div>
          </form>

          <div className="mt-12 text-center text-gray-500 text-xs">
            <p>© {new Date().getFullYear()} Softkingo. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
