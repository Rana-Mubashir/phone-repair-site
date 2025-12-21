"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'

// Import the CategoryCard component
import CategoryCard from './CategoryCard'

export default function CategorySection() {
  const [categories, setCategories] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCategories()
  }, [])

  async function getCategories() {
    try {
      const resp = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/category/getall`)
      console.log("categories response",resp)
      if (resp) {
        console.log("response for categories", resp?.data?.categories)
        setCategories(resp?.data?.categories)
      }
    } catch (error) {
      console.log("error in getting categories", error)
    }
    finally {
      setLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <section className="py-16 px-4 ">
      <div className="container mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            <span className="relative inline-block">
              <span className="relative z-10">Repair Categories</span>
              {/* <span className="absolute bottom-2 left-0 w-full h-3 bg-indigo-100 -z-10"></span> */}
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Choose from our wide range of repair services tailored to your specific device needs
          </p>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-xl overflow-hidden shadow-md bg-white">
                <div className="animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Categories grid
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {categories && categories.map((category) => (
              <CategoryCard
                key={category._id}
                data={category}
              />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
