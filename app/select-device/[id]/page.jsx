"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import DeviceHeader from '../../../components/sections/devicePage/TopHeader'
import SeriesSection from '../../../components/sections/devicePage/SeriesSection'
import { useParams } from "next/navigation"
import axios from "axios"

function Page() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      getDevices()
    }
  }, [id])

  async function getDevices() {
    setLoading(true)
    try {
      const resp = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/device/getdevicesbybrand/${id}`)
      if (resp) {
        setData(resp?.data?.data?.series)
        console.log("response for devices", resp)
      }
    } catch (error) {
      console.log("error in getting devices", error)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <DeviceHeader />

      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-center text-slate-700 max-w-[90%] md:max-w-[70%] lg:max-w-[60%] mx-auto text-lg leading-relaxed">
              Browse through our extensive collection of devices organized by series. Each device comes with expert
              repair services, quality parts, and competitive pricing. Select your device to see available repair
              options.
            </p>
          </motion.div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-32 w-32 bg-blue-200 rounded-lg mb-4"></div>
              <div className="h-4 w-24 bg-blue-200 rounded"></div>
              <p className="mt-4 text-slate-500">Loading devices...</p>
            </div>
          </div>
        ) : (
          <div>
            {data && data?.filter(series => series.devices.length > 0).map((series, index) => (
              <SeriesSection key={series.id} series={series} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Page

