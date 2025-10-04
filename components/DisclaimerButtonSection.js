// components/DisclaimerButtonSection.js
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, AlertTriangle, Shield, Stethoscope, FileText } from 'lucide-react';

const DisclaimerButtonSection = () => {
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);

  const toggleDisclaimer = () => {
    setIsDisclaimerOpen(!isDisclaimerOpen);
  };

  const disclaimerContent = [
    {
      icon: <Stethoscope className="w-5 h-5" />,
      title: "Medical Disclaimer",
      content: "The information provided on this platform is for educational and informational purposes only and does not constitute medical advice. Always consult with qualified healthcare professionals for medical diagnosis and treatment."
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Not Medical Advice",
      content: "Our health assessment tools and suggestions are not substitutes for professional medical advice, diagnosis, or treatment. Never disregard professional medical advice or delay seeking it because of something you have read on this platform."
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: "Emergency Situations",
      content: "In case of medical emergencies, immediately contact your local emergency services or visit the nearest hospital. Do not rely on this platform for emergency medical situations."
    },
    {
      icon: <AlertTriangle className="w-5 h-5" />,
      title: "Accuracy of Information",
      content: "While we strive to provide accurate and up-to-date information, medical knowledge is constantly evolving. We cannot guarantee the completeness or timeliness of the information provided."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <>
      {/* Fixed Disclaimer Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.button
          onClick={toggleDisclaimer}
          whileHover={{ 
            scale: 1.05,
            backgroundColor: "rgba(59, 130, 246, 0.1)"
          }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-3 bg-white/90 backdrop-blur-lg border border-blue-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-blue-700 font-medium text-sm"
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Disclaimer</span>
        </motion.button>
      </motion.div>

      {/* Disclaimer Modal */}
      <AnimatePresence>
        {isDisclaimerOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={toggleDisclaimer}
            >
              {/* Modal Content */}
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-blue-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <AlertTriangle className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">Important Medical Disclaimer</h2>
                        <p className="text-sm text-gray-600">Please read this information carefully</p>
                      </div>
                    </div>
                    <motion.button
                      onClick={toggleDisclaimer}
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 hover:bg-white/50 rounded-lg transition-colors duration-200"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </motion.button>
                  </div>
                </div>

                {/* Content */}
                <div className="overflow-y-auto max-h-[60vh] p-6">
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                  >
                    {disclaimerContent.map((item, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200"
                      >
                        <div className="flex-shrink-0 p-2 bg-white rounded-lg shadow-sm border border-gray-200">
                          <div className="text-blue-600">
                            {item.icon}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            {item.title}
                          </h3>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {item.content}
                          </p>
                        </div>
                      </motion.div>
                    ))}

                    {/* Additional Important Notes */}
                    <motion.div
                      variants={itemVariants}
                      className="bg-orange-50 border border-orange-200 rounded-xl p-4"
                    >
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-orange-800 mb-2">
                            Important Notice
                          </h4>
                          <p className="text-orange-700 text-sm">
                            By using this platform, you acknowledge that you have read, understood, 
                            and agree to this disclaimer. The platform owners and contributors are 
                            not liable for any decisions made based on the information provided here.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
                    <p className="text-xs text-gray-500 text-center sm:text-left">
                      Last updated: {new Date().toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                    <motion.button
                      onClick={toggleDisclaimer}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 text-sm"
                    >
                      I Understand
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Alternative: Inline Disclaimer Section (if you want it as part of the page flow) */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50/30 py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Your Health & Safety Matters
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We are committed to providing helpful health information while ensuring 
              you understand the limitations of our platform.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Professional Medical Guidance
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  This platform is designed to support your health journey, not replace professional 
                  medical care. Always consult healthcare providers for personalized medical advice.
                </p>
                <motion.button
                  onClick={toggleDisclaimer}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200"
                >
                  <FileText className="w-4 h-4" />
                  Read Full Disclaimer
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default DisclaimerButtonSection;