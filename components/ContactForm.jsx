"use client";

import { useState } from "react";
import { Mail, User, MessageSquare } from "lucide-react"; 

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("Sending...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("✅ Message sent successfully! We'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus(""), 5000);
      } else {
        setStatus(`❌ ${data.message || "Failed to send message."}`);
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("⚠️ Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 sm:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl">
        
        {/* Left Side - Information */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-8 sm:p-10 flex flex-col justify-center shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-5">Let's Talk 👋</h2>
          <p className="mb-6 text-base sm:text-lg leading-relaxed opacity-95">
            Have questions about <span className="font-semibold underline decoration-blue-300">HealthWise</span>?  
            We're here to help with <span className="font-medium">consultations, services, feedback, and partnerships</span>.
          </p>
          
          <ul className="space-y-3 mb-8">
            {[
              "Ask about our healthcare services",
              "Share feedback or suggestions",
              "Request technical support",
              "Explore collaboration opportunities"
            ].map((item, i) => (
              <li key={i} className="flex items-start">
                <span className="flex-shrink-0 mt-0.5 mr-3 text-blue-200">✓</span>
                <span className="text-sm sm:text-base">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-auto p-4 bg-blue-500/20 backdrop-blur-sm rounded-xl border border-blue-400/30">
            <p className="text-xs sm:text-sm opacity-90">
              <strong>Note:</strong> We respond to all messages within 24 hours. Your data is securely stored.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">Get in Touch</h3>
            <p className="text-gray-500 mt-2">We’d love to hear from you!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <User size={20} />
              </div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 text-gray-800 placeholder-gray-400 bg-gray-50 hover:bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <Mail size={20} />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 text-gray-800 placeholder-gray-400 bg-gray-50 hover:bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div className="relative">
              <div className="absolute top-3 left-3 pointer-events-none text-gray-400">
                <MessageSquare size={20} />
              </div>
              <textarea
                name="message"
                placeholder="Your Message..."
                value={formData.message}
                onChange={handleChange}
                required
                disabled={loading}
                rows="4"
                className="w-full pl-10 pr-4 pt-3.5 pb-3.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 text-gray-800 placeholder-gray-400 bg-gray-50 hover:bg-white resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl font-semibold text-base shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-80 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </div>
              ) : (
                "Send Message"
              )}
            </button>
          </form>

          {status && (
            <div 
              className={`mt-6 p-4 rounded-xl text-center font-medium transition-all duration-300 animate-fadeIn ${
                status.startsWith('✅') 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : status.startsWith('❌') || status.startsWith('⚠️')
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : 'bg-blue-50 text-blue-700 border border-blue-200'
              }`}
            >
              {status}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}