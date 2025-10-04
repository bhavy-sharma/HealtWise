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
  BeakerIcon
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
  const router = useRouter();

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-2xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white mb-5 shadow-lg">
            <BeakerIcon className="h-8 w-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            AI Health Diagnosis
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Get personalized health insights, hospital recommendations, and specialist advice
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-8 border border-gray-200/70">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg">
              <div className="flex items-start">
                <span className="mr-2">⚠️</span>
                <span>{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
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
                  className="w-full pl-12 pr-5 py-4 text-gray-800 bg-white/90 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Priya Sharma"
                />
              </div>
            </div>

            {/* PINCODE */}
            <div>
              <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-2">
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
                  className="w-full pl-12 pr-5 py-4 text-gray-800 bg-white/90 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="6-digit PINCODE"
                  maxLength={6}
                />
              </div>
            </div>

            {/* Age & Gender */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
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
                  className="w-full px-5 py-4 text-gray-800 bg-white/90 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 32"
                />
              </div>

              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                  Gender *
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-5 py-4 text-gray-800 bg-white/90 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none custom-select"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Issue */}
            <div>
              <label htmlFor="issue" className="block text-sm font-medium text-gray-700 mb-2">
                Health Issue / Symptoms *
              </label>
              <textarea
                id="issue"
                name="issue"
                value={formData.issue}
                onChange={handleChange}
                rows={4}
                className="w-full px-5 py-4 text-gray-800 bg-white/90 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                placeholder="Describe your symptoms..."
              />
            </div>

            {/* Days */}
            <div>
              <label htmlFor="days" className="block text-sm font-medium text-gray-700 mb-2">
                Duration (Days) *
              </label>
              <input
                type="number"
                id="days"
                name="days"
                value={formData.days}
                onChange={handleChange}
                min="1"
                className="w-full px-5 py-4 text-gray-800 bg-white/90 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 5"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-80 transition-all duration-200"
            >
              {isSubmitting ? (
                <>
                  <ArrowPathIcon className="animate-spin inline mr-2 h-5 w-5" />
                  Analyzing...
                </>
              ) : (
                <>
                  <HeartIcon className="inline mr-2 h-5 w-5" />
                  Get My Health Report
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>🔒 Your data is processed securely and never stored</p>
        </div>
      </div>
    </div>
  );
}