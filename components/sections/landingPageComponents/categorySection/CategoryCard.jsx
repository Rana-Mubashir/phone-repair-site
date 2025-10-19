"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

// Animation variants for the card
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
  hover: {
    y: -5,
    transition: { duration: 0.2 },
  },
}

export default function CategoryCard({ data }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full"
    >
      <Link href={`/select-brand/${data._id}`} className="block h-full">
        <div className="flex flex-col h-full">
          {/* Image container */}
          <div className="relative overflow-hidden h-48">
            <img
              src={data?.image || "/placeholder.svg?height=200&width=400"}
              alt={data?.name || "Category image"}
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
              <div className="p-4 text-white">
                <span className="font-medium flex items-center gap-1">
                  View options <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="font-bold text-xl text-center text-gray-900 mb-3">{data?.name || "Category Name"}</h3>

            <p className="text-center text-gray-600 flex-grow mb-4">
              {data?.description ||
                "Category description goes here. This explains what kind of devices can be repaired in this category."}
            </p>

            <div className="mt-auto">
              <div className="bg-indigo-50 text-indigo-700 py-2 px-4 rounded-lg text-sm font-medium text-center hover:bg-indigo-100 transition-colors duration-300">
                Explore {data?.name || "Category"}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

