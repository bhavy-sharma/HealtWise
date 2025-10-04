// components/WowHeroSection.js
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from "next/link";

const WowHeroSection = () => {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const handleGetStarted = () => {
    if (user) {
      router.push('/diagnose');
    } else {
      setShowLoginPopup(true);
      // Auto-hide after 4 seconds
      setTimeout(() => setShowLoginPopup(false), 4000);
    }
  };

  // Text Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const lineVariants = {
    hidden: { width: 0 },
    visible: { width: "100%", transition: { duration: 1, delay: 1.5, ease: "easeInOut" } }
  };

  if (authLoading) {
    return (
      <div className="h-screen bg-white flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-white flex flex-col lg:flex-row overflow-hidden relative">
      {/* Left Side - Content */}
      <div className="w-full lg:w-1/2 h-full flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-white relative order-2 lg:order-1">
        {/* Background Orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.03, 0.06, 0.03] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 right-1/4 w-32 h-32 bg-gray-200 rounded-full blur-2xl"
          />
          <motion.div
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.02, 0.04, 0.02] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-gray-100 rounded-full blur-2xl"
          />
        </div>

        <motion.div
          className="max-w-2xl mx-auto relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={textContainerVariants}
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            <motion.h2 
              variants={wordVariants}
              className="text-lg sm:text-xl font-medium text-gray-500 mb-4 tracking-wide uppercase"
            >
              Are you Ready to Start Your Health Journey?
            </motion.h2>
            
            <motion.h1
              variants={textContainerVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            >
              {"Healthwise".split(' ').map((word, index) => (
                <motion.span
                  key={index}
                  variants={wordVariants}
                  className="inline-block mr-2"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.div
              variants={lineVariants}
              className="h-1 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full"
            />
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed"
          >
            Your journey to better health starts here. Get personalized medical guidance, 
            connect with expert doctors, and discover the best healthcare facilities near you.
          </motion.p>

          {/* ✅ Always "Start Health Assessment" — never disabled */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <motion.button
              onClick={handleGetStarted}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-semibold rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 justify-center cursor-pointer"
            >
              <span>Start Health Assessment</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-lg"
              >
                →
              </motion.span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Right Side - Image */}
      <div className="w-full lg:w-1/2 h-full flex items-center justify-center p-8 bg-gradient-to-br from-white via-gray-50 to-gray-100/50 relative overflow-hidden order-1 lg:order-2">
        <motion.div
          whileHover={{
            scale: 1.05,
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
            rotate: 1
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-white"
        >
          <img
            src="https://picsum.photos/id/1003/800/800"
            alt="AI Doctor & Health Tech"
            className="w-full h-full object-cover"
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.2 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-green-500/20"
          ></motion.div>
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-200"
          >
            <span className="text-blue-600 text-xl">🧠</span>
          </motion.div>
          <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-3 text-center">
            <p className="text-xs font-medium text-gray-700">AI-Powered Health Assistant</p>
          </div>
        </motion.div>
      </div>

      {/* 🔥 POPUP: Login Required */}
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
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
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
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>

          <p className="text-gray-700 text-center mb-8">
            Please log in to access your personalized health assessment and unlock all features.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                setShowLoginPopup(false);
                router.push('/login');
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
              Don't have an account?{' '}
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
};

export default WowHeroSection;