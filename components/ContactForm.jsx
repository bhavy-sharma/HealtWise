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
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setStatus("");
        }, 5000);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-2xl rounded-3xl w-full max-w-6xl overflow-hidden">
        
        {/* Left Side - Information */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-10 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-6">Let's Talk 👋</h2>
          <p className="mb-6 text-lg leading-relaxed">
            Have questions about <span className="font-semibold">HealthWise</span>?  
            We're here to help you with <span className="underline">consultations, services, collaborations</span> and more.
          </p>
          <ul className="space-y-3 text-lg">
            <li className="flex items-center">
              <span className="mr-2">✅</span>
              Ask about our healthcare services
            </li>
            <li className="flex items-center">
              <span className="mr-2">✅</span>
              Share feedback or suggestions
            </li>
            <li className="flex items-center">
              <span className="mr-2">✅</span>
              Request technical support
            </li>
            <li className="flex items-center">
              <span className="mr-2">✅</span>
              Partner or collaborate with us
            </li>
          </ul>

          {/* Additional Info */}
          <div className="mt-8 p-4 bg-blue-500 rounded-lg">
            <p className="text-sm">
              <strong>Note:</strong> Your message will be saved in our database and our team will respond within 24 hours.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="p-10">
          <h3 className="text-3xl font-bold mb-8 text-center text-blue-700">
            Contact Us
          </h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full border border-gray-300 pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-gray-800 placeholder-gray-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full border border-gray-300 pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-gray-800 placeholder-gray-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 text-gray-400" size={20} />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full border border-gray-300 pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-gray-800 placeholder-gray-500 h-32 resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition shadow-md text-lg font-medium disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </form>

          {status && (
            <div className={`mt-6 p-4 rounded-lg text-center font-medium ${
              status.includes('✅') 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : status.includes('❌') || status.includes('⚠️')
                ? 'bg-red-100 text-red-700 border border-red-200'
                : 'bg-blue-100 text-blue-700 border border-blue-200'
            }`}>
              {status}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}