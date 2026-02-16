"use client"

import { useEffect, useState } from "react"
import TopBanner from "@/components/sections/brandsPage/TopBanner"
import Link from "next/link"
import { useParams } from "next/navigation"
import axios from "axios"

function Page() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { id } = useParams()

  useEffect(() => {
    getBrands()
  }, [])

  async function getBrands() {
    try {
      setLoading(true)
      const resp = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/brand/getbycategory/${id}`)
      if (resp?.data?.brands) {
        console.log("response for getting brands", resp?.data?.brands[0])
        setData(resp?.data?.brands[0])
      }
    } catch (error) {
      console.log("error in getting brand", error)
      setError("Failed to load brands. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b ">
      <TopBanner categoryName={data?.name} />

      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center mb-12">
          <p className="text-center text-slate-700 max-w-[90%] md:max-w-[70%] lg:max-w-[60%] text-lg leading-relaxed">
            Tech Repair is your one-stop shop for all your device needs. We provide expert advice, fast turnaround
            times, competitive pricing, and quality workmanship. With our team of highly skilled professionals, we can
            help you with any device repairs.
          </p>
        </div>

        <div className="mb-10">
          <h1 className="text-center text-3xl md:text-4xl font-bold text-[#34c5f1] relative">
            <span className="relative z-10">Select Your Device Brand</span>
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#34c5f1] rounded-full"></span>
          </h1>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-32 w-32 bg-blue-200 rounded-lg mb-4"></div>
              <div className="h-4 w-24 bg-blue-200 rounded"></div>
              <p className="mt-4 text-slate-500">Loading devices...</p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-10 px-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 inline-block">
              <p className="text-red-500">{error}</p>
              <button
                onClick={getBrands}
                className="mt-4 px-4 py-2 bg-[#34c5f1] text-white rounded-lg hover:bg-[#2ba8d0] transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-5">
            {data?.brands && data.brands.length > 0 ? (
              data.brands.map((brand, index) => (
                <Link href={`/select-device/${brand._id}`} key={index} className="w-full max-w-xs">
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden h-full flex flex-col">
                    <div className="p-6 flex-grow flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
                      <img
                        src={brand?.image || "/placeholder.svg"}
                        alt={brand?.name || "Device"}
                        className="h-48 w-48 object-contain transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                    <div className="p-4 border-t border-blue-100">
                      <p className="text-lg font-bold text-center text-[#34c5f1]">{brand?.name}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full py-16 text-center">
                <div className="bg-blue-50 rounded-lg p-8 inline-block">
                  <p className="text-xl text-slate-700">No brands found for this category</p>
                  <p className="mt-2 text-slate-500">Please try another category or check back later</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Page

