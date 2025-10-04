import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function Footer() {
    return (
    <footer className="bg-gradient-to-r from-blue-50 to-blue-100 text-gray-700 pt-10">
    <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div>
        <h1 className="text-2xl font-bold text-blue-600">Healthwise</h1>
        <p className="mt-3 text-sm text-gray-600 leading-relaxed">
            Empowering health with AI-powered insights & personalized care.  
            Get the right guidance for your wellness journey.
        </p>
        </div>

        <div>
        <h2 className="text-lg font-semibold mb-3 text-gray-800">Quick Links</h2>
        <ul className="space-y-2">
            <li><Link href="/" className="hover:text-blue-600 transition">Home</Link></li>
            <li><Link href="/about" className="hover:text-blue-600 transition">About</Link></li>
            <li><Link href="/diagnoses" className="hover:text-blue-600 transition">Diagnoses</Link></li>
            <li><Link href="/contact" className="hover:text-blue-600 transition">Contact</Link></li>
        </ul>
        </div>

        <div>
        <h2 className="text-lg font-semibold mb-3 text-gray-800">Contact Us</h2>
        <p className="text-sm text-gray-600">📍 New Delhi, India</p>
        <p className="text-sm text-gray-600">📧 support@healthwise.com</p>
        <p className="text-sm text-gray-600">📞 +91 98765 43210</p>

        <div className="flex space-x-4 mt-4">
            <a href="#" className="p-2 rounded-full bg-white shadow hover:bg-blue-600 hover:text-white transition">
            <FaFacebookF />
            </a>
            <a href="#" className="p-2 rounded-full bg-white shadow hover:bg-sky-500 hover:text-white transition">
            <FaTwitter />
            </a>
            <a href="#" className="p-2 rounded-full bg-white shadow hover:bg-pink-600 hover:text-white transition">
            <FaInstagram />
            </a>
            <a href="#" className="p-2 rounded-full bg-white shadow hover:bg-blue-700 hover:text-white transition">
            <FaLinkedinIn />
            </a>
        </div>
        </div>
    </div>

    <div className="mt-10 text-center text-sm text-gray-500 bg-white/40 py-4">
        © {new Date().getFullYear()} Healthwise. All rights reserved.
    </div>
    </footer>
);
}