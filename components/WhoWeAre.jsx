// components/WhoWeAre.jsx

"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin } from 'react-icons/fa';

const teamMembers = [
  {
    name: "Bhavy Sharma",
    linkedin: "https://www.linkedin.com/in/bhavy-sharma",
    bio: "Architect of our diagnostic engine, integrating Gemini API with precision healthcare logic."
  },
  {
    name: "Sakshi Jain",
    linkedin: "https://www.linkedin.com/in/sakshi-jain",
    bio: "Crafts intuitive user experiences with Next.js and modern UI/UX principles."
  },
  {
    name: "Tamanna Tiwari",
    linkedin: "https://www.linkedin.com/in/tamanna-tiwari-017a2129b/",
    bio: "Ensures medical accuracy and validates AI-generated insights with real-world health data."
  },
  {
    name: "Alishba",
    linkedin: "https://www.linkedin.com/in/alishba-ainul-435348365/",
    bio: "Designs seamless workflows that make complex health diagnostics feel simple."
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

const cardVariants = {
  hidden: { 
    y: 30, 
    opacity: 0 
  },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  },
  hover: {
    y: -10,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

const WhoWeAre = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Passionate creators building AI-powered health solutions for everyone
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="group relative"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg h-full border border-gray-100 transition-all duration-300 group-hover:shadow-xl">
                {/* Animated Avatar */}
                <div className="mx-auto mb-5 relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold mx-auto">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-full bg-blue-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 px-2">
                  {member.bio}
                </p>
                
                {/* LinkedIn Button */}
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 group/link"
                  aria-label={`Connect with ${member.name} on LinkedIn`}
                >
                  <FaLinkedin className="text-xl" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhoWeAre;