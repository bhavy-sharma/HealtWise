// components/WhatWeDo.jsx
"use client";
import React from 'react';
import { 
  UserIcon, 
  MapPinIcon, 
  HeartIcon, 
  ShieldCheckIcon, 
  BeakerIcon, 
  AcademicCapIcon 
} from '@heroicons/react/24/outline';

const WhatWeDo = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How Our Health Diagnosis Works
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Enter your details and get AI-powered health insights with personalized recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Step 1: User Input */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <UserIcon className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Enter Your Details</h3>
            <p className="text-gray-600">
              Provide basic information: Name, PINCODE, Age, Gender, Symptoms, and Duration (Days)
            </p>
          </div>

          {/* Step 2: AI Analysis */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
              <BeakerIcon className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Diagnosis</h3>
            <p className="text-gray-600">
              Our Gemini AI analyzes your symptoms and provides probability-based health insights with visual progress indicators
            </p>
          </div>

          {/* Step 3: Hospital Finder */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <MapPinIcon className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Nearby Hospitals</h3>
            <p className="text-gray-600">
              Get top-rated hospitals near your PINCODE with contact details and specialties
            </p>
          </div>

          {/* Step 4: Doctor Recommendations */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
              <AcademicCapIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Specialist Doctors</h3>
            <p className="text-gray-600">
              Find the best available specialists in your area matching your health condition
            </p>
          </div>

          {/* Step 5: Remedies */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
              <HeartIcon className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalized Remedies</h3>
            <p className="text-gray-600">
              Receive customized home remedies and lifestyle recommendations for your condition
            </p>
          </div>

          {/* Step 6: Precautions */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
              <ShieldCheckIcon className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Essential Precautions</h3>
            <p className="text-gray-600">
              Get critical do's and don'ts to prevent worsening of your condition
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-full font-medium">
            <span>Get Your Personalized Health Report in 60 Seconds</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;