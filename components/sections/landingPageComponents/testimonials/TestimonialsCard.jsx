// TestimonialsCard.jsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar, FaMobile, FaWrench } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

const TestimonialsCard = ({ name, position, image, review, rating, device, service, date }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 relative border border-gray-100"
    >
      {/* Verified Badge */}
      <div className="absolute top-4 right-4">
        <div className="flex items-center bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full">
          <MdVerified className="mr-1" />
          Verified
        </div>
      </div>

      {/* Customer Info */}
      <div className="flex items-start space-x-4">
        <img
          src={image}
          alt={name}
          className="w-14 h-14 rounded-full object-cover border-2 border-blue-100"
          loading="lazy"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-500">{position}</p>
          
          {/* Service Details */}
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="inline-flex items-center text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
              <FaMobile className="mr-1 text-xs" />
              {device}
            </span>
            <span className="inline-flex items-center text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
              <FaWrench className="mr-1 text-xs" />
              {service}
            </span>
          </div>
        </div>
      </div>

      {/* Review Content */}
      <div className="mt-4">
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`text-sm ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-400 ml-2">{date}</span>
        </div>
        
        <p className="text-gray-600 text-sm leading-relaxed">
          <FaQuoteLeft className="inline text-gray-300 mr-1 text-xs" />
          {review}
        </p>
      </div>
    </motion.div>
  );
};

export default TestimonialsCard;