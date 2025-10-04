"use client";
import { useState } from "react";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState(""); // ✅ Custom message

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginMessage(`Welcome, ${username}!`);
    console.log("Username:", username, "Password:", password);
    setUsername("");
    setPassword("");
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative"
      style={{
        backgroundImage:
          "url('https://cdn.wallpapersafari.com/90/51/x2aS0f.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay dark effect */}
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 text-white">
        <h1 className="text-5xl font-extrabold mb-4">Healthwise</h1>
        <p className="text-lg mb-6">
          Your trusted platform for smarter health & wellness.
        </p>
        <button
          onClick={() => {
            setShowLogin(true);
            setLoginMessage(""); // Reset previous message
          }}
          className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 transition"
        >
          Login
        </button>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Modal Overlay */}
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setShowLogin(false)}
          ></div>

          {/* Modal Box */}
          <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative z-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Login to Healthwise
            </h2>

            <form
              onSubmit={handleLoginSubmit}
              className="flex flex-col gap-4 text-gray-800"
            >
              {/* Username */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium">Username</label>
                <input
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  required
                />
              </div>

              {/* Password */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium">Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="bg-blue-600 text-white rounded py-2 hover:bg-blue-700 transition"
              >
                Login
              </button>
            </form>

            {/* Custom Message */}
            {loginMessage && (
              <p className="mt-4 text-green-600 font-semibold text-center">
                {loginMessage}
              </p>
            )}

            {/* Close Button */}
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-2 right-3 text-gray-600 hover:text-black text-lg"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
