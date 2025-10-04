"use client"; // Needed for React state in App Router

import { useState } from "react";
import { useRouter } from "next/navigation"; // For App Router
// If using Pages Router, use: import { useRouter } from "next/router";

export default function Disclaimer() {
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();

  const handleContinue = () => {
    if (agreed) {
      // Redirect to dashboard or home page
      router.push("/diagnose"); // Change to your landing page
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-6 py-12">
      <div className="max-w-3xl bg-white p-10 rounded-3xl shadow-xl border border-blue-100">
        <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">
          HealthWise Disclaimer
        </h1>

        <p className="text-gray-600 mb-4 leading-relaxed">
          Welcome to <strong>HealthWise</strong>. The information and suggestions provided by this platform
          are generated using Artificial Intelligence (AI) and are intended for <strong>informational and
          educational purposes only</strong>.
        </p>

        <p className="text-gray-600 mb-4 leading-relaxed">
          We are <strong>not medical professionals</strong>, and the content provided should not be considered
          medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider for medical
          concerns.
        </p>

        <p className="text-gray-600 mb-6 leading-relaxed">
          By using HealthWise, you acknowledge that you do so at your own discretion and risk.
        </p>

        {/* Checkbox */}
        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            id="agree"
            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
          />
          <label htmlFor="agree" className="ml-3 text-gray-700">
            I have read and agree to the disclaimer
          </label>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!agreed}
          className={`w-full py-3 rounded-xl text-white font-semibold transition ${
            agreed
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Continue
        </button>

        <div className="mt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} HealthWise. All Rights Reserved.
        </div>
      </div>
    </main>
  );
}
