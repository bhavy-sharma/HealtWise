// app/results/page.js
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function ResultsPage() {
  const [result, setResult] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedResult = localStorage.getItem('diagnosisResult');
    if (!storedResult) {
      router.push('/diagnose');
      return;
    }
    setResult(JSON.parse(storedResult));
  }, [router]);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  const { user, diagnosis, hospitals, doctors } = result;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.push('/diagnose')}
          className="flex items-center text-blue-600 mb-8 hover:text-blue-800"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Back to form
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
            <h1 className="text-2xl font-bold">Your Health Report</h1>
            <p className="opacity-90">For {user.name}, {user.age} years old</p>
          </div>

          <div className="p-6 md:p-8 space-y-8">
            {/* Diagnosis Probabilities */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Possible Conditions</h2>
              <div className="space-y-3">
                {diagnosis.conditions.map((cond, i) => (
                  <div key={i} className="border-l-4 border-blue-500 pl-4 py-1">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{cond.name}</span>
                      <span className="font-bold text-blue-600">{cond.probability}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${cond.probability}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Remedies */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Home Remedies</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {diagnosis.remedies.map((remedy, i) => (
                  <li key={i}>{remedy}</li>
                ))}
              </ul>
            </div>

            {/* Precautions */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Precautions</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {diagnosis.precautions.map((precaution, i) => (
                  <li key={i}>{precaution}</li>
                ))}
              </ul>
            </div>

            {/* Hospitals */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Nearby Hospitals</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hospitals.map((hospital, i) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-bold text-gray-900">{hospital.name}</h3>
                    <p className="text-sm text-gray-600">{hospital.distance} • ⭐ {hospital.rating}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Doctors */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recommended Specialists</h2>
              <div className="space-y-3">
                {doctors.map((doctor, i) => (
                  <div key={i} className="flex items-start border border-gray-200 rounded-lg p-4">
                    <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                      <span className="font-bold text-blue-800">D</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{doctor.name}</h3>
                      <p className="text-sm text-gray-600">{doctor.specialty} • {doctor.experience}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}