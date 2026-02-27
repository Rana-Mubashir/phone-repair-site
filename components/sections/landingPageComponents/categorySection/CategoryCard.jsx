"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  hover: {
    y: -8,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

const imageVariants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.4 },
  },
}

const buttonVariants = {
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.98,
  },
}

export default function CategoryCard({ data, onEdit, onDelete, showActions = false }) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="relative bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 max-w-sm mx-auto overflow-hidden border border-gray-200/60 backdrop-blur-sm group"
    >
      <Link href={`/select-brand/${data._id}`} className="block">
        <div className="relative h-56 bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-bl-full" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/5 to-purple-400/5 rounded-tr-full" />

          <motion.img
            variants={imageVariants}
            whileHover="hover"
            src={data?.image || "/placeholder.svg?height=224&width=300"}
            alt={data?.name || "Category image"}
            className="relative w-full h-full object-contain p-6 z-10"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/0 via-transparent to-transparent group-hover:from-blue-900/5 transition-all duration-500" />
        </div>

        <div className="p-7 relative">
          {/* Subtle top border accent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full" />

          <h3 className="font-bold text-2xl text-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-3 group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-blue-600 transition-all duration-300">
            {data?.name || "Category Name"}
          </h3>

          <p className="text-gray-600 text-center text-sm leading-relaxed mb-7  px-2">
            {data?.description || "No description available"}
          </p>

          <div className="flex justify-center">
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="relative inline-flex items-center gap-2 bg-gradient-to-r from-purple-400 to-indigo-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3.5 px-8 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl overflow-hidden"
            >
              {/* Button shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

              <span className="relative z-10">Explore {data?.name || "Category"}</span>
              <ArrowRight className="relative z-10 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </div>
        </div>
      </Link>

      <div className="absolute top-3 right-3 w-20 h-20 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-xl group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500" />
    </motion.div>
  )
}
