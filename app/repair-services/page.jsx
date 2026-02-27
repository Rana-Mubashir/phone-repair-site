"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import axios from "axios"
import { Smartphone, Loader2, AlertCircle, ArrowRight, CheckCircle } from "lucide-react"

function Page() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getCategories()
  }, [])

  async function getCategories() {
    try {
      const resp = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/category/getall`)
      if (resp) {
        console.log("response for categories", resp?.data?.categories)
        setData(resp?.data?.categories)
      }
    } catch (error) {
      console.log("error in getting categories", error)
      setError("Failed to load categories. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Side hero section */}
      <div className="bg-gradient-to-r from-blue-200 via-blue-100 to-purple-100">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between">
            <div className="md:w-1/2 mt-10 md:mt-0">
              <div className="relative inline-block mb-3">
                <h1 className="text-4xl md:text-[37px] font-bold bg-gradient-to-r from-[#34c5f1] to-[#a855f7] bg-clip-text text-transparent">Device Categories</h1>
                <div className="absolute -bottom-3 left-0 w-24 h-1 bg-gradient-to-r from-[#34c5f1] to-[#a855f7] rounded-full"></div>
              </div>
              <p className="text-xl text-gray-700 mt-6 max-w-lg">
                Choose your device category to find the perfect repair solution for your needs.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-[#34c5f1]/10 to-[#a855f7]/10 p-2 rounded-full">
                    <CheckCircle className="h-5 w-5 text-[#1ab5e4]" />
                  </div>
                  <span className="text-gray-700">Expert technicians for all device types</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-[#34c5f1]/10 to-[#a855f7]/10 p-2 rounded-full">
                    <CheckCircle className="h-5 w-5 text-[#1ab5e4]" />
                  </div>
                  <span className="text-gray-700">Quality parts and warranty included</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-[#34c5f1]/10 to-[#a855f7]/10 p-2 rounded-full">
                    <CheckCircle className="h-5 w-5 text-[#1ab5e4]" />
                  </div>
                  <span className="text-gray-700">Fast turnaround on all repairs</span>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#34c5f1]/20 via-white to-[#a855f7]/20 rounded-full blur-lg opacity-70 animate-pulse"></div>
                <img
                  src="https://cdn.accentuate.io/4454285341/4070909739097/ipad-v1644579547641.png?500x500"
                  alt="Devices"
                  className="relative h-64 w-64 md:h-80 md:w-80 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories section with horizontal layout */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 inline-block relative">
            Select Your Device
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-[#34c5f1] to-[#a855f7] rounded-full"></div>
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Indepth Solutions provides expert repair services for all types of devices. Choose your device category
            below to get started.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#34c5f1]/20 to-[#a855f7]/20 rounded-full blur opacity-70"></div>
                <Loader2 className="h-12 w-12 text-[#1ab5e4] animate-spin relative" />
              </div>
              <p className="mt-4 text-slate-600">Loading your device categories...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex justify-center py-10">
            <div className="bg-red-50 border border-red-100 rounded-xl p-8 max-w-md text-center shadow-sm">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
                <AlertCircle className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-lg font-medium text-red-800 mb-2">Unable to Load Categories</h3>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={getCategories}
                className="px-5 py-2.5 bg-gradient-to-r from-[#34c5f1] to-[#a855f7] text-white rounded-lg hover:from-[#2ba8d0] hover:to-[#9333ea] transition-all duration-300 shadow-sm"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : (
          <>
            {data && data.length > 0 ? (
              <div className="overflow-x-auto pb-6">
                <div className="flex justify-center items-center flex-nowrap gap-6 min-w-full pb-4">
                  {data.map((category, index) => (
                    <Link href={`/select-brand/${category._id}`} key={index} className="w-64 flex-shrink-0 first:ml-0">
                      <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col overflow-hidden group border border-purple-50">
                        <div className="p-6 flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 flex-grow">
                          {category?.image ? (
                            <img
                              src={category.image || "/placeholder.svg"}
                              alt={category.name || "Device"}
                              className="h-40 w-40 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="h-48 w-48 flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-full">
                              <Smartphone className="h-20 w-20 text-[#1ab5e4]" />
                            </div>
                          )}
                        </div>
                        <div className="p-4 border-t border-purple-50 flex items-center justify-between bg-white">
                          <h3 className="font-medium text-gray-800">{category?.name}</h3>
                          <div className="bg-gradient-to-r from-[#34c5f1]/10 to-[#a855f7]/10 p-1.5 rounded-full transform translate-x-0 group-hover:translate-x-1 transition-transform">
                            <ArrowRight className="h-4 w-4 text-[#1ab5e4]" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                {/* <div className="flex justify-center mt-6">
                  <div className="flex gap-1.5">
                    {[...Array(Math.min(5, Math.ceil(data.length / 4)))].map((_, i) => (
                      <div
                        key={i}
                        className={`h-2 w-2 rounded-full ${i === 0 ? "bg-gradient-to-r from-[#34c5f1] to-[#a855f7]" : "bg-gradient-to-r from-[#34c5f1]/30 to-[#a855f7]/30"}`}
                      ></div>
                    ))}
                  </div>
                </div> */}
              </div>
            ) : (
              <div className="py-16 flex justify-center">
                <div className="bg-white rounded-xl p-10 shadow-sm border border-purple-50 max-w-md text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 mb-4">
                    <Smartphone className="h-8 w-8 text-[#1ab5e4]" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">No Categories Found</h3>
                  <p className="text-gray-500">
                    We're currently updating our device categories. Please check back later.
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Info cards */}
      {data && data.length > 0 && (
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-purple-50 hover:shadow-md transition-all duration-300">
              <div className="p-3 rounded-full bg-gradient-to-r from-[#34c5f1]/10 to-[#a855f7]/10 w-fit mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#1ab5e4]"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">
                All our repairs come with a warranty and are performed using high-quality replacement parts.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-purple-50 hover:shadow-md transition-all duration-300">
              <div className="p-3 rounded-full bg-gradient-to-r from-[#34c5f1]/10 to-[#a855f7]/10 w-fit mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#1ab5e4]"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Fast Turnaround</h3>
              <p className="text-gray-600">
                Most repairs are completed the same day, getting your device back to you as quickly as possible.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-purple-50 hover:shadow-md transition-all duration-300">
              <div className="p-3 rounded-full bg-gradient-to-r from-[#34c5f1]/10 to-[#a855f7]/10 w-fit mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#1ab5e4]"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Expert Technicians</h3>
              <p className="text-gray-600">
                Our certified repair specialists have years of experience fixing all types of devices.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Page