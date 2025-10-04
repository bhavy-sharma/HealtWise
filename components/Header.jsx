"use client";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const Header = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-[#f0f4ff] text-black flex justify-between items-center px-6 py-4 shadow-md">
      <Link href="/" className="text-2xl font-bold">Healthwise</Link>

      <nav>
        <ul className="flex space-x-6">
          <li><Link href="/" className="hover:underline">Home</Link></li>
          <li><Link href="/about" className="hover:underline">About</Link></li>
          <li><Link href="/diagnoses" className="hover:underline">Diagnoses</Link></li>
          <li><Link href="/contact" className="hover:underline">Contact</Link></li>
        </ul>
      </nav>

      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span className="text-sm">Welcome, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-[#f0f4ff] text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <div className="flex space-x-2">
            <Link
              href="/login"
              className="bg-[#f0f4ff] text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;