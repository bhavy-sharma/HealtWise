// components/WhoWeAre.jsx
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin } from 'react-icons/fa';

const teamMembers = [
  {
    name: "Bhavy Sharma",
    role: "AI Architect",
    linkedin: "https://www.linkedin.com/in/bhavy-sharma",
    bio: "Architect of our diagnostic engine, integrating Gemini API with precision healthcare logic."
  },
  {
    name: "Sakshi Jain",
    role: "UI/UX Lead",
    linkedin: "https://www.linkedin.com/in/sakshi-jain",
    bio: "Crafts intuitive user experiences with Next.js and modern UI/UX principles."
  },
  {
    name: "Tamanna Tiwari",
    role: "Medical Validator",
    linkedin: "https://www.linkedin.com/in/tamanna-tiwari-017a2129b/",
    bio: "Ensures medical accuracy and validates AI-generated insights with real-world health data."
  },
  {
    name: "Alishba",
    role: "Product Designer",
    linkedin: "https://www.linkedin.com/in/alishba-ainul-435348365/",
    bio: "Designs seamless workflows that make complex health diagnostics feel simple."
  }
];

const WhoWeAre = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-1/3 -right-20 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-4"
            whileHover={{ scale: 1.02 }}
          >
            Meet Our Team
          </motion.h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Passionate creators building AI-powered health solutions for everyone
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              whileHover={{ 
                y: -12,
                transition: {
                  type: "spring",
                  stiffness: 500,
                  damping: 25
                }
              }}
              className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-7 text-center border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Avatar */}
              <div className="relative inline-block mb-6">
                <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-800 text-xl font-bold mx-auto border-2 border-gray-300/30 group-hover:border-blue-400/50 transition-colors duration-300">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/20 to-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {member.name}
              </h3>
              <p className="text-blue-600 font-medium mb-3">
                {member.role}
              </p>
              <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                {member.bio}
              </p>
              
              {/* LinkedIn Button */}
              <motion.a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gray-900 text-white group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Connect with ${member.name} on LinkedIn`}
              >
                <FaLinkedin className="text-base" />
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;