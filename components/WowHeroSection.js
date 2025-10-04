// components/WowHeroSection.js
'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const WowHeroSection = () => {
  const router = useRouter();
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const handleGetStarted = () => {
    router.push('/Issue');
  };

  const features = [
    {
      id: 1,
      icon: '🔍',
      title: 'Symptom Analysis',
      description: 'AI-powered symptom checker for accurate health insights',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 border-blue-200',
      delay: 0.1
    },
    {
      id: 2,
      title: 'Personalized Remedies',
      icon: '💊',
      description: 'Custom precautions and treatment recommendations',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 border-green-200',
      delay: 0.2
    },
    {
      id: 3,
      icon: '👨‍⚕️',
      title: 'Specialist Doctors',
      description: 'Find the right medical specialists for your condition',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50 border-purple-200',
      delay: 0.3
    },
    {
      id: 4,
      icon: '🏥',
      title: 'Nearby Hospitals',
      description: 'Locate best hospitals with ratings and distance',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50 border-orange-200',
      delay: 0.4
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  // Text animation variants for the expanding effect
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const lineVariants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: {
        duration: 1,
        delay: 1.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="h-screen bg-white flex flex-col lg:flex-row overflow-hidden">
      {/* Left Side - Content with Text Expand Animation */}
      <div className="w-full lg:w-1/2 h-full flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30 relative order-2 lg:order-1">
        
        {/* Subtle Background Animation */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 right-1/4 w-32 h-32 bg-blue-100 rounded-full blur-2xl"
          />
          <motion.div
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-green-100 rounded-full blur-2xl"
          />
        </div>

        <motion.div
          className="max-w-2xl mx-auto relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Animated Heading with Expand Effect */}
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
                  style={{ 
                    display: 'inline-block',
                    overflow: 'hidden'
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {/* Animated Underline */}
            <motion.div
              variants={lineVariants}
              className="h-1 bg-gradient-to-r from-blue-600 to-green-600 rounded-full"
            />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed"
          >
            Your journey to better health starts here. Get personalized medical guidance, 
            connect with expert doctors, and discover the best healthcare facilities near you.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <motion.button
              onClick={handleGetStarted}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 justify-center"
            >
              <span>Start Health Assessment</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-lg"
              >
                →
              </motion.span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300"></div>
            </motion.button>
          </motion.div>

          {/* Features Grid */}
          

          {/* Stats */}
        </motion.div>
      </div>

      {/* Right Side - Animated Healthcare Visualization */}
      <div className="w-full lg:w-1/2 h-full flex items-center justify-center p-8 bg-gradient-to-br from-blue-50/80 via-cyan-50/40 to-emerald-50/60 relative overflow-hidden order-1 lg:order-2">
        
        {/* Animated Background Circles */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl"
        />
        
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-green-200/30 rounded-full blur-3xl"
        />

        {/* Main Healthcare Animation Container */}
        <div className="relative z-10 w-full max-w-lg">
          
          {/* Central Medical Hub */}
          <div className="relative mx-auto mb-12">
            {/* Pulse Rings */}
            <motion.div
              animate={{
                scale: [1, 1.5, 2],
                opacity: [0.8, 0.4, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeOut"
              }}
              className="absolute inset-0 border-4 border-blue-300/50 rounded-full"
            />
            
            <motion.div
              animate={{
                scale: [1, 1.8, 2.2],
                opacity: [0.6, 0.2, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.5
              }}
              className="absolute inset-0 border-4 border-green-300/40 rounded-full"
            />

            {/* Central Hospital Building */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-2xl flex items-center justify-center"
            >
              <div className="text-4xl text-white">🏥</div>
              
              {/* Shine Effect */}
              <motion.div
                animate={{ x: [-100, 100] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
              />
            </motion.div>
          </div>

          {/* Floating Healthcare Elements */}
          <div className="grid grid-cols-3 gap-8 relative">
            {/* Doctor */}
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, -5, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-white rounded-2xl shadow-lg border border-blue-100 flex items-center justify-center text-2xl mb-2">
                👨‍⚕️
              </div>
              <span className="text-xs font-medium text-gray-600">Doctors</span>
            </motion.div>

            {/* Ambulance */}
            <motion.div
              animate={{ 
                x: [-10, 10, -10],
                rotate: [0, 2, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-white rounded-2xl shadow-lg border border-red-100 flex items-center justify-center text-2xl mb-2">
                🚑
              </div>
              <span className="text-xs font-medium text-gray-600">Ambulance</span>
            </motion.div>

            {/* Medicine */}
            <motion.div
              animate={{ 
                y: [0, 15, 0],
                rotate: [0, 5, 0]
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-white rounded-2xl shadow-lg border border-green-100 flex items-center justify-center text-2xl mb-2">
                💊
              </div>
              <span className="text-xs font-medium text-gray-600">Medicine</span>
            </motion.div>

            {/* Heart Rate */}
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-white rounded-2xl shadow-lg border border-pink-100 flex items-center justify-center text-2xl mb-2">
                ❤️
              </div>
              <span className="text-xs font-medium text-gray-600">Heart Care</span>
            </motion.div>

            {/* Stethoscope */}
            <motion.div
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, -3, 0]
              }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.8
              }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-white rounded-2xl shadow-lg border border-purple-100 flex items-center justify-center text-2xl mb-2">
                🩺
              </div>
              <span className="text-xs font-medium text-gray-600">Diagnosis</span>
            </motion.div>

            {/* Shield */}
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.2
              }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-white rounded-2xl shadow-lg border border-yellow-100 flex items-center justify-center text-2xl mb-2">
                🛡️
              </div>
              <span className="text-xs font-medium text-gray-600">Protection</span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WowHeroSection;