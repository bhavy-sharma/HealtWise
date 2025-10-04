"use client";

import { Heart, ShieldCheck, Users, Stethoscope } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function AboutPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const handleExploreServices = () => {
    if (user) {
      router.push("/diagnose");
    } else {
      setShowLoginPopup(true);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-blue-600">HealthWise</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Empowering healthier lives through compassionate care, innovative solutions, and trusted medical expertise.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-4">
                At HealthWise, we believe everyone deserves access to high-quality, personalized healthcare. 
                We bridge the gap between patients and providers through technology, empathy, and evidence-based practices.
              </p>
              <p className="text-lg text-gray-700">
                Founded in 2025, we’ve served over 15,000 patients and partnered with 50+ clinics nationwide.
              </p>
            </div>
            <div 
              className="relative bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-8 sm:p-10 shadow-lg
                         transition-all duration-300 ease-out
                         hover:shadow-2xl hover:scale-[1.02] hover:from-blue-700 hover:to-indigo-800
                         cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -translate-y-16 translate-x-16"></div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-white/10 mb-5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 tracking-tight">Our Vision</h3>
                <p className="text-blue-100 leading-relaxed opacity-95">
                  A world where healthcare is proactive, accessible, and centered around the individual — 
                  not just the illness. We’re building a future where wellness is a shared journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values / Why Choose Us */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Why Patients Trust Us</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              We’re guided by principles that put people first — always.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Heart className="h-8 w-8 text-blue-600 group-hover:text-blue-700 transition-colors" />,
                title: "Compassionate Care",
                desc: "We treat every patient with dignity, empathy, and respect."
              },
              {
                icon: <ShieldCheck className="h-8 w-8 text-blue-600 group-hover:text-blue-700 transition-colors" />,
                title: "Trusted Expertise",
                desc: "Board-certified professionals using the latest medical standards."
              },
              {
                icon: <Users className="h-8 w-8 text-blue-600 group-hover:text-blue-700 transition-colors" />,
                title: "Patient-Centered",
                desc: "Your goals, values, and voice shape your care plan."
              },
              {
                icon: <Stethoscope className="h-8 w-8 text-blue-600 group-hover:text-blue-700 transition-colors" />,
                title: "Innovative Solutions",
                desc: "From telehealth to AI-assisted diagnostics, we embrace progress."
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="group bg-white p-6 rounded-xl border border-gray-100 
                           shadow-sm hover:shadow-lg hover:border-blue-200 
                           transition-all duration-300 ease-out
                           hover:-translate-y-1"
              >
                <div className="mb-4 text-blue-600">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of patients who’ve transformed their wellness journey with HealthWise.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-xl shadow-md transition duration-200"
            >
              Contact Us
            </Link>
            <motion.button
              onClick={handleExploreServices}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-3 px-8 rounded-xl shadow-sm transition duration-200"
            >
              Explore Services
            </motion.button>
          </div>
        </div>
      </div>

      {/* 🔥 Full-Screen Login Required Modal */}
      <AnimatePresence>
        {showLoginPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLoginPopup(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-6 px-6 text-center">
                <h2 className="text-2xl font-bold text-white">Login Required</h2>
              </div>

              {/* Body */}
              <div className="p-6">
                <div className="flex justify-center mb-5">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                </div>

                <p className="text-gray-700 text-center mb-8">
                  Please log in to explore our AI-powered health services and get personalized insights.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      setShowLoginPopup(false);
                      router.push("/login");
                    }}
                    className="flex-1 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
                  >
                    Go to Login
                  </button>
                  <button
                    onClick={() => setShowLoginPopup(false)}
                    className="flex-1 px-5 py-3 bg-gray-100 text-gray-800 font-semibold rounded-xl hover:bg-gray-200 transition"
                  >
                    Cancel
                  </button>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link
                      href="/register"
                      className="text-blue-600 font-medium hover:underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowLoginPopup(false);
                      }}
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}