// components/WhatWeDo.jsx
"use client";
import React from "react";
import {
  UserIcon,
  MapPinIcon,
  HeartIcon,
  ShieldCheckIcon,
  BeakerIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Link from "next/link";

const WhatWeDo = () => {
  const steps = [
    {
      id: 1,
      title: "Enter Your Details",
      description:
        "Provide basic information: Name, PINCODE, Age, Gender, Symptoms, and Duration (Days)",
      icon: <UserIcon className="h-6 w-6 text-gray-700" />,
      bg: "bg-white",
      border: "border-gray-100",
    },
    {
      id: 2,
      title: "AI-Powered Diagnosis",
      description:
        "Our Gemini AI analyzes your symptoms and provides probability-based health insights with visual progress indicators",
      icon: <BeakerIcon className="h-6 w-6 text-gray-700" />,
      bg: "bg-white",
      border: "border-gray-100",
    },
    {
      id: 3,
      title: "Nearby Hospitals",
      description:
        "Get top-rated hospitals near your PINCODE with contact details and specialties",
      icon: <MapPinIcon className="h-6 w-6 text-gray-700" />,
      bg: "bg-white",
      border: "border-gray-100",
    },
    {
      id: 4,
      title: "Specialist Doctors",
      description:
        "Find the best available specialists in your area matching your health condition",
      icon: <AcademicCapIcon className="h-6 w-6 text-gray-700" />,
      bg: "bg-white",
      border: "border-gray-100",
    },
    {
      id: 5,
      title: "Personalized Remedies",
      description:
        "Receive customized home remedies and lifestyle recommendations for your condition",
      icon: <HeartIcon className="h-6 w-6 text-gray-700" />,
      bg: "bg-white",
      border: "border-gray-100",
    },
    {
      id: 6,
      title: "Essential Precautions",
      description:
        "Get critical do's and don'ts to prevent worsening of your condition",
      icon: <ShieldCheckIcon className="h-6 w-6 text-gray-700" />,
      bg: "bg-white",
      border: "border-gray-100",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            How Our Health Diagnosis Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Enter your details and get AI-powered health insights with
            personalized recommendations
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.3,
                delay: index * 0.08,
                ease: "easeOut",
              }}
              whileHover={{
                y: -8,
                boxShadow: "0 12px 30px -10px rgba(0,0,0,0.05)",
                scale: 1.02,
              }}
              className="group relative bg-white rounded-xl p-6 border border-gray-100 cursor-pointer transition-all duration-300"
            >
              {/* Icon Circle */}
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${step.bg} border ${step.border} group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors duration-300`}
              >
                {step.icon}
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {step.description}
              </p>

              {/* Subtle underline on hover */}
              <div className="mt-4 h-0.5 bg-transparent group-hover:bg-blue-500 transition-all duration-300 rounded-full"></div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.3, ease: "easeOut" }}
          className="mt-16 text-center"
        >
          <Link href="/diagnose" passHref>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full font-semibold shadow-sm hover:shadow-md transition-all duration-300"
              asChild 
            >
              <span>Get Your Personalized Health Report in 60 Seconds</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 0.3, repeat: Infinity }}
                className="ml-2"
              >
                →
              </motion.span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeDo;
