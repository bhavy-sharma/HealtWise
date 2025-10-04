// app/diagnose/page.js
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  HeartIcon, 
  ShieldCheckIcon, 
  UserIcon,
  MapPinIcon,
  ArrowPathIcon,
  StethoscopeIcon
} from "@heroicons/react/24/outline";

export default function DiagnosePage() {
  const [formData, setFormData] = useState({
    name: '',
    pincode: '',
    age: '',
    gender: '',
    issue: '',
    days: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const validateForm = () => {
    const { name, pincode, age, gender, issue, days } = formData;
    
    if (!name || !pincode || !age || !gender || !issue || !days) {
      return "All fields are required";
    }
    
    if (!/^\d{6}$/.test(pincode)) {
      return "PINCODE must be 6 digits";
    }
    
    if (age < 1 || age > 120) {
      return "Age must be between 1 and 120";
    }
    
    if (days < 1) {
      return "Days must be at least 1";
    }
    
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get diagnosis');
      }

      const result = await response.json();
      localStorage.setItem('diagnosisResult', JSON.stringify(result));
      router.push('/results');
      
    } catch (err) {
      console.error('Diagnosis error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Floating animation for icons
  const FloatingIcon = ({ Icon, delay = 0 }) => (
    <div 
      className="absolute opacity-10 animate-float"
      style={{ 
        animationDelay: `${delay}s`,
        top: `${10 + Math.random() * 80}%`,
        left: `${5 + Math.random() * 90}%`
      }}
    >
      <Icon className="h-8 w-8 text-blue-400" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4 sm:px-6 relative overflow-hidden">
      {/* Floating medical icons */}
      <FloatingIcon Icon={HeartIcon} delay={0} />
      <FloatingIcon Icon={StethoscopeIcon} delay={2} />
      <FloatingIcon Icon={MapPinIcon} delay={4} />
      <FloatingIcon Icon={ShieldCheckIcon} delay={6} />
      
      {/* Decorative wave */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
        <svg 
          className="relative" 
          viewBox="0 0 1200 120" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            opacity=".25" 
            fill="url(#gradient)"
          ></path>
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4f46e5" stopOpacity="1"></stop>
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="1"></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white mb-5 shadow-lg">
            <StethoscopeIcon className="h-8 w-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            AI Health Diagnosis
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Get personalized health insights, hospital recommendations, and specialist advice
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-8 border border-gray-200/70 transition-all duration-300 hover:shadow-2xl">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg animate-fadeIn">
              <div className="flex items-start">
                <span className="mr-2">⚠️</span>
                <span>{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="animate-slideUp">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Full Name *
              </label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-12 pr-5 py-4 text-gray-800 bg-white/90 border border-gray-300 rounded-xl focus:ring-3 focus:ring-blue-300 focus:border-blue-500 transition-all duration-300 shadow-sm"
                  placeholder="e.g., Priya Sharma"
                />
              </div>
            </div>

            {/* PINCODE */}
            <div className="animate-slideUp animation-delay-100">
              <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                PINCODE *
              </label>
              <div className="relative">
                <MapPinIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="w-full pl-12 pr-5 py-4 text-gray-800 bg-white/90 border border-gray-300 rounded-xl focus:ring-3 focus:ring-blue-300 focus:border-blue-500 transition-all duration-300 shadow-sm"
                  placeholder="6-digit PINCODE"
                  maxLength={6}
                />
              </div>
            </div>

            {/* Age & Gender */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-slideUp animation-delay-200">
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Age *
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="1"
                  max="120"
                  className="w-full px-5 py-4 text-gray-800 bg-white/90 border border-gray-300 rounded-xl focus:ring-3 focus:ring-blue-300 focus:border-blue-500 transition-all duration-300 shadow-sm"
                  placeholder="e.g., 32"
                />
              </div>

              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Gender *
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-5 py-4 text-gray-800 bg-white/90 border border-gray-300 rounded-xl focus:ring-3 focus:ring-blue-300 focus:border-blue-500 transition-all duration-300 shadow-sm appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSI4IiB2aWV3Qm94PSIwIDAgMTIgOCI+PHBhdGggZmlsbD0iIzY2NzBhMCIgZD0iTTAuOTQgMGgxMC4xMmMuNTUgMCAxIC40NSAxIDF2NmMwIC41NS0uNDUgMS0xIDFINGMuNTUgMCAxLS40NSAxLTFWNy45NGMwLS41NS0uNDUtMS0xLTFIMC45NGMtLjU1IDAtMSAuNDUtMSAxdjZjMCAuNTUuNDUgMSAxIDF6Ii8+PC9zdmc+')] bg-right-4 bg-no-repeat"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Issue */}
            <div className="animate-slideUp animation-delay-300">
              <label htmlFor="issue" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Health Issue / Symptoms *
              </label>
              <textarea
                id="issue"
                name="issue"
                value={formData.issue}
                onChange={handleChange}
                rows={4}
                className="w-full px-5 py-4 text-gray-800 bg-white/90 border border-gray-300 rounded-xl focus:ring-3 focus:ring-blue-300 focus:border-blue-500 transition-all duration-300 shadow-sm resize-none"
                placeholder="Describe your symptoms in detail..."
              />
            </div>

            {/* Days */}
            <div className="animate-slideUp animation-delay-400">
              <label htmlFor="days" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Duration (Days) *
              </label>
              <input
                type="number"
                id="days"
                name="days"
                value={formData.days}
                onChange={handleChange}
                min="1"
                className="w-full px-5 py-4 text-gray-800 bg-white/90 border border-gray-300 rounded-xl focus:ring-3 focus:ring-blue-300 focus:border-blue-500 transition-all duration-300 shadow-sm"
                placeholder="e.g., 5"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 disabled:opacity-80 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl flex items-center justify-center group"
            >
              {isSubmitting ? (
                <>
                  <ArrowPathIcon className="animate-spin mr-3 h-6 w-6" />
                  Analyzing Your Symptoms...
                </>
              ) : (
                <>
                  <HeartIcon className="mr-3 h-6 w-6 group-hover:animate-pulse" />
                  Get My Health Report
                </>
              )}
            </button>
          </form>
        </div>

        {/* Trust indicators */}
        <div className="mt-8 text-center text-sm text-gray-500 max-w-md mx-auto">
          <div className="flex items-center justify-center space-x-4 mb-2">
            <div className="flex items-center">
              <ShieldCheckIcon className="h-4 w-4 text-green-500 mr-1" />
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center">
              <HeartIcon className="h-4 w-4 text-blue-500 mr-1" />
              <span>AI-Powered Insights</span>
            </div>
          </div>
          <p>Your data is processed securely and never stored permanently</p>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.6s ease-out forwards;
          opacity: 0;
        }
        .animation-delay-100 { animation-delay: 0.1s; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-400 { animation-delay: 0.4s; }
      `}</style>
    </div>
  );
}