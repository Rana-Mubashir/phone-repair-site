"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const TestimonialsCard = ({ name, position, image, review, rating }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white shadow-lg rounded-2xl p-6 max-w-md mx-auto relative overflow-hidden border border-gray-200"
    >
      {/* Quote Icon */}
      <FaQuoteLeft className="absolute top-5 left-5 text-gray-300 text-4xl" />

      {/* User Image */}
      <div className="flex flex-col items-center">
        <img
          src={image}
          alt={name}
          className="w-16 h-16 rounded-full border-4 border-blue-500 shadow-md"
        />
        <h3 className="text-lg font-semibold mt-3">{name}</h3>
        <p className="text-sm text-gray-500">{position}</p>
      </div>

      {/* Review Text */}
      <p className="text-gray-700 text-center mt-4 italic">"{review}"</p>

      {/* Rating */}
      <div className="flex justify-center mt-3">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`text-yellow-400 ${i < rating ? "opacity-100" : "opacity-30"}`}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default TestimonialsCard;
