// app/diagnose/page.js
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

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
    if (error) setError(''); // Clear error on input change
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
      
      // Store result in localStorage and redirect to results page
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Health Diagnosis</h1>
          <p className="text-gray-600">
            Enter your details below to get AI-powered health insights
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200">
          {error && (
            <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Rajesh Kumar"
              />
            </div>

            {/* PINCODE */}
            <div>
              <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
                PINCODE *
              </label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="6-digit PINCODE"
                maxLength={6}
              />
            </div>

            {/* Age */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 28"
                />
              </div>

              {/* Gender */}
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                  Gender *
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              <label htmlFor="issue" className="block text-sm font-medium text-gray-700 mb-1">
                Health Issue / Symptoms *
              </label>
              <textarea
                id="issue"
                name="issue"
                value={formData.issue}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe your symptoms..."
              />
            </div>

            {/* Days */}
            <div>
              <label htmlFor="days" className="block text-sm font-medium text-gray-700 mb-1">
                Duration (Days) *
              </label>
              <input
                type="number"
                id="days"
                name="days"
                value={formData.days}
                onChange={handleChange}
                min="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 3"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3.5 px-6 rounded-xl font-semibold text-lg shadow-md hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-80 transition-all duration-200 flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <ArrowPathIcon className="animate-spin -ml-1 mr-2 h-5 w-5" />
                  Analyzing...
                </>
              ) : (
                'Get Diagnosis Report'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}