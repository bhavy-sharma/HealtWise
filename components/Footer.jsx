// components/Footer.js
"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Footer() {
  const { user, loading: authLoading } = useAuth();
  const [isClient, setIsClient] = useState(false);

  // Ensure this runs only on client (to avoid hydration issues)
  useEffect(() => {
    setIsClient(true);
  }, []);

  // While auth is loading, show a minimal skeleton
  if (!isClient || authLoading) {
    return (
      <footer className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="space-y-4">
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
              ))}
              <div className="flex space-x-2 pt-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-9 h-9 rounded-lg bg-gray-200 animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-gray-100">
            <div className="h-4 w-64 bg-gray-200 rounded mx-auto animate-pulse"></div>
          </div>
        </div>
      </footer>
    );
  }

  // Quick Links (conditionally include "AI Diagnosis")
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Contact Support", href: "/contact" },
  ];

  // Only show "AI Diagnosis" if user is logged in
  if (user) {
    quickLinks.splice(2, 0, { name: "AI Diagnosis", href: "/diagnose" });
  }

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Brand & Description */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center space-x-2 group">
              <div className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">H</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Healthwise</span>
            </Link>
            <p className="text-gray-600 leading-relaxed max-w-xs">
              Empowering your wellness journey with AI-driven insights and compassionate care.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-4">Quick Links</h2>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="inline-block text-gray-600 hover:text-gray-900 transition-colors duration-200 relative group"
                  >
                    {link.name}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gray-900 transition-all duration-200 group-hover:w-6"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-4">Contact Us</h2>
            <div className="space-y-2.5 text-gray-600">
              <p className="flex items-start">
                <span className="mr-2 mt-0.5">📍</span>
                <span>New Delhi, India</span>
              </p>
              <p className="flex items-start">
                <span className="mr-2 mt-0.5">✉️</span>
                <a 
                  href="mailto:support@healthwise.com" 
                  className="hover:text-gray-900 transition-colors"
                >
                  support@healthwise.com
                </a>
              </p>
              <p className="flex items-start">
                <span className="mr-2 mt-0.5">📞</span>
                <a 
                  href="tel:+919876543210" 
                  className="hover:text-gray-900 transition-colors"
                >
                  +91 98765 43210
                </a>
              </p>
            </div>

            <div className="flex space-x-3 mt-5">
              {[
                { Icon: FaFacebookF, href: "https://facebook.com/yourpage", hover: "hover:bg-blue-600" },
                { Icon: FaTwitter, href: "https://twitter.com/yourpage", hover: "hover:bg-sky-500" },
                { Icon: FaInstagram, href: "https://instagram.com/yourpage", hover: "hover:bg-pink-600" },
                { Icon: FaLinkedinIn, href: "https://linkedin.com/company/yourpage", hover: "hover:bg-blue-700" },
              ].map(({ Icon, href, hover }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 rounded-lg flex items-center justify-center bg-gray-100 text-gray-600 ${hover} hover:text-white transition-all duration-200`}
                  aria-label={`Follow on ${Icon.name}`}
                >
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Healthwise. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}