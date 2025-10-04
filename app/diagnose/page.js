// app/diagnose/page.js
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  HeartIcon, 
  ShieldCheckIcon, 
  UserIcon,
  MapPinIcon,
  ArrowPathIcon,
  BeakerIcon,
  ExclamationTriangleIcon,
  ClipboardDocumentListIcon,
  AcademicCapIcon
} from "@heroicons/react/24/outline";

export default function DiagnosePage() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    issue: '',
    days: '',
    issueLevel: '',
    previousIssues: '',
    allergies: ''
  });
  
  const [liveLocation, setLiveLocation] = useState(null); // ✅ Store GPS coordinates
  const [isUsingLocation, setIsUsingLocation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  // ✅ Get live location
  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setIsUsingLocation(true);
    setError('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLiveLocation({ latitude, longitude });
        setIsUsingLocation(false);
      },
      (err) => {
        console.error("Geolocation error:", err);
        setError("Unable to access your location. Please allow location permission.");
        setIsUsingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const validateForm = () => {
    const { name, age, gender, issue, days, issueLevel } = formData;
    
    if (!name || !age || !gender || !issue || !days || !issueLevel) {
      return "All required fields must be filled.";
    }
    
    const ageNum = Number(age);
    if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
      return "Age must be between 1 and 120";
    }
    
    const daysNum = Number(days);
    if (isNaN(daysNum) || daysNum < 1) {
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

    const symptoms = formData.issue.trim();
    if (!symptoms) {
      setError("Please describe your symptoms.");
      return;
    }

    // ✅ Ensure location is provided
    if (!liveLocation) {
      setError("Please use 'Use My Location' to find nearby hospitals.");
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // 👇 Send symptoms + LIVE LOCATION (not pincode)
        body: JSON.stringify({ 
          symptoms, 
          latitude: liveLocation.latitude,
          longitude: liveLocation.longitude
        }),
      });

      const data = await res.json();

      if (res.ok) {
        sessionStorage.setItem('diagnosisResult', JSON.stringify(data));
        router.push('/results');
      } else {
        setError(data.error || "Failed to get diagnosis.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
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
            We'll find the best hospitals near your current location
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
                  required
                />
              </div>
            </div>

            {/* ✅ LIVE LOCATION BUTTON (replaces PINCODE) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Location *
              </label>
              <button
                type="button"
                onClick={handleUseLocation}
                disabled={isUsingLocation}
                className="w-full flex items-center justify-center gap-3 py-4 px-5 bg-white/90 border border-gray-300 rounded-xl text-gray-800 hover:bg-blue-50 hover:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                {isUsingLocation ? (
                  <>
                    <ArrowPathIcon className="animate-spin h-5 w-5 text-blue-600" />
                    Detecting your location...
                  </>
                ) : liveLocation ? (
                  <>
                    <MapPinIcon className="h-5 w-5 text-green-600" />
                    <span>Location set: {liveLocation.latitude.toFixed(4)}, {liveLocation.longitude.toFixed(4)}</span>
                  </>
                ) : (
                  <>
                    <MapPinIcon className="h-5 w-5 text-gray-500" />
                    Use My Current Location
                  </>
                )}
              </button>
              <p className="mt-2 text-xs text-gray-500">
                We'll find the best hospitals near you instantly
              </p>
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
                  required
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
                  className="w-full px-5 py-4 text-gray-800 bg-white/90 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                  required
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Issue (Symptoms) */}
            <div>
              <label htmlFor="issue" className="block text-sm font-medium text-gray-700 mb-2">
                Health Issue / Symptoms *
              </label>
              <textarea
                id="issue"
                name="issue"
                value={formData.issue}
                onChange={handleChange}
                rows={3}
                className="w-full px-5 py-4 text-gray-800 bg-white/90 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                placeholder="e.g., Fever, headache, fatigue..."
                required
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
                placeholder="e.g., 3"
                required
              />
            </div>

            {/* Issue Level */}
            <div>
              <label htmlFor="issueLevel" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <ExclamationTriangleIcon className="h-4 w-4 mr-1 text-amber-500" />
                Severity Level *
              </label>
              <select
                id="issueLevel"
                name="issueLevel"
                value={formData.issueLevel}
                onChange={handleChange}
                className="w-full px-5 py-4 text-gray-800 bg-white/90 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                required
              >
                <option value="">Select severity</option>
                <option value="mild">Mild (Beginner)</option>
                <option value="moderate">Moderate</option>
                <option value="severe">Severe</option>
              </select>
            </div>

            {/* Previous Issues */}
            <div>
              <label htmlFor="previousIssues" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <ClipboardDocumentListIcon className="h-4 w-4 mr-1 text-blue-500" />
                Previous Medical Conditions / Medications
              </label>
              <textarea
                id="previousIssues"
                name="previousIssues"
                value={formData.previousIssues}
                onChange={handleChange}
                rows={2}
                className="w-full px-5 py-4 text-gray-800 bg-white/90 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                placeholder="e.g., Diabetes, BP, Asthma, or current medicines..."
              />
            </div>

            {/* Allergies */}
            <div>
              <label htmlFor="allergies" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <AcademicCapIcon className="h-4 w-4 mr-1 text-green-500" />
                Allergies (if any)
              </label>
              <input
                type="text"
                id="allergies"
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
                className="w-full px-5 py-4 text-gray-800 bg-white/90 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Penicillin, Dust, Peanuts..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !liveLocation}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-80 transition-all duration-200"
            >
              {isSubmitting ? (
                <>
                  <ArrowPathIcon className="animate-spin inline mr-2 h-5 w-5" />
                  Analyzing Your Health...
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
          <p>🔒 Your location is used only to find nearby hospitals and is never stored</p>
        </div>
      </div>
    </div>
  );
}