// components/Header.js
"use client";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const { user, logout, loading: authLoading } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
  };

  // While auth is loading, show a minimal skeleton
  if (authLoading) {
    return (
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl bg-gray-200 animate-pulse"></div>
              <div className="h-6 w-28 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-8 w-32 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </div>
      </header>
    );
  }

  // Navigation items (conditionally include "Diagnose")
  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // Only show "Diagnose" if user is logged in
  if (user) {
    navItems.splice(2, 0, { name: "Diagnose", href: "/diagnose" });
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 group-hover:opacity-90 transition-opacity">
              Healthwise
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 ease-in-out"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="hidden sm:inline-block text-sm font-medium text-gray-700 truncate max-w-[120px]">
                  Hi, {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-medium rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all shadow-sm hover:shadow-md"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className="px-4 py-2 bg-white text-gray-800 font-medium rounded-xl border border-gray-300 hover:bg-gray-50 transition-all shadow-sm hover:shadow"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;