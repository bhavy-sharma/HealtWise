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

    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
    const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    });

    if (res.ok) {
        setStatus("✅ Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
    } else {
        setStatus("❌ Failed to send message.");
    }
    } catch (error) {
    console.error(error);
    setStatus("⚠️ Something went wrong.");
    }
    };

    return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-2xl rounded-3xl w-full max-w-6xl overflow-hidden">
        
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-10 flex flex-col justify-center">
        <h2 className="text-4xl font-bold mb-6">Let’s Talk 👋</h2>
        <p className="mb-6 text-lg leading-relaxed">
            Have questions about <span className="font-semibold">HealthWise</span>?  
            We’re here to help you with <span className="underline">consultations, services, collaborations</span> and more.
        </p>
        <ul className="space-y-3 text-lg">
            <li>✅ Ask about our healthcare services</li>
            <li>✅ Share feedback or suggestions</li>
            <li>✅ Request technical support</li>
            <li>✅ Partner or collaborate with us</li>
        </ul>
        </div>

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
                className="w-full border border-gray-300 pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-gray-800 placeholder-gray-500"
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
                className="w-full border border-gray-300 pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-gray-800 placeholder-gray-500"
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
                className="w-full border border-gray-300 pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-gray-800 placeholder-gray-500 h-32 resize-none"
            />
            </div>

            <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition shadow-md text-lg font-medium"
            >
            Send Message
            </button>
        </form>

        {status && (
            <p className="mt-6 text-center text-gray-700 font-medium">{status}</p>
        )}
        </div>
    </div>
    </div>
    );
}

