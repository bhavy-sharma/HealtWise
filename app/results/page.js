// app/results/page.js
"use client";

import { useEffect, useState } from 'react';
import { HeartIcon, MapPinIcon, ShieldCheckIcon, AcademicCapIcon } from "@heroicons/react/24/outline";

export default function ResultsPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = sessionStorage.getItem('diagnosisResult');
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        setError("Invalid data. Please go back and try again.");
      }
    } else {
      setError("No diagnosis data found. Please complete the form first.");
    }
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-6 bg-white rounded-xl shadow">
          <div className="text-red-500 text-2xl mb-4">⚠️</div>
          <p className="text-gray-700">{error}</p>
          <button 
            onClick={() => window.history.back()}
            className="mt-4 text-blue-600 hover:underline"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-blue-600 text-white mb-5 shadow-lg">
            <ShieldCheckIcon className="h-8 w-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Your Health Report
          </h1>
          <p className="text-gray-600">Based on your symptoms and location</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Diagnosis */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
              <HeartIcon className="h-5 w-5 text-red-500 mr-2" />
              Possible Diagnosis
            </h2>
            <p className="text-gray-700 bg-red-50 p-4 rounded-lg">{data.diagnosis}</p>
          </div>

          {/* Remedies */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
              <AcademicCapIcon className="h-5 w-5 text-green-500 mr-2" />
              Home Remedies
            </h2>
            <ul className="space-y-2">
              {data.remedies?.map((remedy, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span className="text-gray-700">{remedy}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Precautions */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
              <ShieldCheckIcon className="h-5 w-5 text-amber-500 mr-2" />
              Precautions
            </h2>
            <ul className="space-y-2">
              {data.precautions?.map((precaution, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span className="text-gray-700">{precaution}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Specialists */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              Recommended Specialists
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.specialists?.map((spec, i) => (
                <span 
                  key={i} 
                  className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Hospitals (Placeholder - You can integrate Google Maps API later) */}
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
              <MapPinIcon className="h-5 w-5 text-purple-500 mr-2" />
              Best Hospitals Near {data.pincode}
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600 italic">
                🔍 Hospital data integration coming soon!  
                For now, search "Best hospitals near {data.pincode}" on Google Maps.
              </p>
            </div>
          </div>

          {/* Final Note */}
          <div className="p-6 bg-amber-50 border-t border-amber-200">
            <p className="text-amber-800 font-medium">{data.note}</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition"
          >
            ← Go Back
          </button>
        </div>
      </div>
    </div>
  );
}