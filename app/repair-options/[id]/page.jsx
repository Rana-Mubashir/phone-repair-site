"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import axios from "axios"
import { useEffect, useState } from "react"
import { Clock, Shield, PenTool, ArrowRight, CheckCircle, Star } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import CountUp from "react-countup"
import { FiTool, FiClock, FiShield, FiStar } from "react-icons/fi"

export default function RepairOptionsPage() {
    const { id } = useParams()
    const [data, setData] = useState(null)
    const [deviceInfo, setDeviceInfo] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const [heroRef, heroInView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })

    const [servicesRef, servicesInView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })

    useEffect(() => {
        if (id) {
            getRepairOptions()
        }
    }, [id])

    async function getRepairOptions() {
        setIsLoading(true)
        try {
            const resp = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/repairoptions/getdeviceoptions/${id}`)

            if (resp) {
                console.log("response in repair options", resp)
                setData(resp?.data?.data)
                setDeviceInfo({
                    name: resp?.data?.data?.name || "Your Device",
                    image: resp?.data?.data?.image || "/placeholder.svg?height=300&width=300",
                })
            }
        } catch (error) {
            console.log("error in getting repair options", error)
        } finally {
            setIsLoading(false)
        }
    }

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <motion.div
                    ref={heroRef}
                    initial="hidden"
                    animate={heroInView ? "show" : "hidden"}
                    variants={container}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12"
                >
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 md:p-10">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <motion.div variants={item} className="relative w-64 h-64 flex-shrink-0">
                                {deviceInfo?.image ? (
                                    <Image
                                        src={deviceInfo.image || "/placeholder.svg"}
                                        alt={deviceInfo?.name || "Device"}
                                        fill
                                        className="object-contain rounded-xl shadow-lg p-2 bg-white"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 rounded-xl animate-pulse"></div>
                                )}
                            </motion.div>
                            <div className="flex-1 space-y-4">
                                <motion.div variants={item}>
                                    <div className="inline-block bg-gradient-to-r from-blue-50 to-purple-50 text-transparent bg-clip-text bg-gradient-to-r from-[#34c5f1] to-[#a855f7] border border-purple-200 rounded-full px-3 py-1 text-sm mb-2">
                                        Professional Repair Service
                                    </div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                                        {deviceInfo?.name || "Device"} <span className="bg-gradient-to-r from-[#34c5f1] to-[#a855f7] bg-clip-text text-transparent">Repair</span>
                                    </h1>
                                    <p className="mt-2 text-xl text-gray-700 font-medium">Expert repairs by certified technicians</p>
                                </motion.div>

                                <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                        <span className="text-sm text-gray-700">Genuine Parts</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                        <span className="text-sm text-gray-700">Expert Technicians</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                        <span className="text-sm text-gray-700">Quick Service</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                        <span className="text-sm text-gray-700">Warranty Included</span>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Repair Services */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center mb-10"
                >
                    <h2 className="text-3xl font-bold text-gray-900">Choose Your Repair Service</h2>
                    <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
                        Select the service you need from our comprehensive repair options. Each repair comes with a warranty and is
                        performed by certified technicians.
                    </p>
                </motion.div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                                <div className="h-48 bg-gradient-to-r from-blue-100 to-purple-100"></div>
                                <div className="p-6">
                                    <div className="h-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded mb-4"></div>
                                    <div className="h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded"></div>
                                    <div className="h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded mt-4"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        ref={servicesRef}
                        initial="hidden"
                        animate={servicesInView ? "show" : "hidden"}
                        variants={container}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {data &&
                            data?.repairOptions.map((option, index) => (
                                <motion.div
                                    key={option._id}
                                    variants={item}
                                    whileHover={{
                                        scale: 1.03,
                                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                                    }}
                                    className="bg-white rounded-xl shadow-md overflow-hidden"
                                >
                                    <div className="relative h-48 bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-center p-6">
                                        {option.image ? (
                                            <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
                                                <Image
                                                    src={option.image || "/placeholder.svg"}
                                                    alt={option.name}
                                                    width={120}
                                                    height={120}
                                                    className="object-contain max-h-32"
                                                />
                                            </motion.div>
                                        ) : (
                                            <PenTool className="w-20 h-20 bg-gradient-to-r from-[#049fce] to-[#6411b3] bg-clip-text text-transparent" />
                                        )}

                                        {option.price && (
                                            <div className="absolute top-4 right-4 bg-gradient-to-r from-[#34c5f1] to-[#a855f7] text-white px-3 py-1 rounded-full text-sm font-medium">
                                                ${option.price}
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{option.name}</h3>

                                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-2 mb-4">
                                            {option.estimatedTime && (
                                                <div className="flex items-center gap-1">
                                                    <Clock className="h-4 w-4 bg-gradient-to-r from-[#34c5f1] to-[#a855f7] bg-clip-text text-transparent" />
                                                    <span>{option.estimatedTime}</span>
                                                </div>
                                            )}

                                            {option.warranty && (
                                                <div className="flex items-center gap-1">
                                                    <Shield className="h-4 w-4 text-green-500" />
                                                    <span>{option.warranty}</span>
                                                </div>
                                            )}
                                        </div>

                                        <p className="text-gray-600 text-sm mb-4">
                                            {option.description || "Professional repair service with quality parts and expert technicians."}
                                        </p>

                                        <div className="flex items-center gap-1 mb-6">
                                            <Star className="h-4 w-4 text-yellow-400" fill="#FACC15" />
                                            <Star className="h-4 w-4 text-yellow-400" fill="#FACC15" />
                                            <Star className="h-4 w-4 text-yellow-400" fill="#FACC15" />
                                            <Star className="h-4 w-4 text-yellow-400" fill="#FACC15" />
                                            <Star className="h-4 w-4 text-yellow-400" fill="#FACC15" />
                                            <span className="text-xs text-gray-500 ml-1">5.0 (24 reviews)</span>
                                        </div>

                                        <Link href={`/book-appointment/${option._id}`}>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="w-full bg-gradient-to-r from-[#34c5f1] to-[#a855f7] hover:from-[#2ba8d0] hover:to-[#9333ea] text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center transition-all duration-300"
                                            >
                                                Book Repair
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </motion.button>
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                    </motion.div>
                )}

                {/* Why Choose Us */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-16 bg-white rounded-2xl shadow-xl p-8 md:p-10"
                >
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-gray-900">Why Choose Our Repair Services?</h3>
                        <p className="mt-2 text-gray-600">We pride ourselves on providing the highest quality repair services</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div whileHover={{ y: -5 }} className="bg-gray-50 rounded-xl p-6 text-center">
                            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                                <FiTool className="h-6 w-6 bg-gradient-to-r from-[#34c5f1] to-[#a855f7] bg-clip-text text-transparent" />
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">Expert Technicians</h4>
                            <p className="text-gray-600 text-sm">
                                Our certified technicians have years of experience repairing all types of devices
                            </p>
                        </motion.div>

                        <motion.div whileHover={{ y: -5 }} className="bg-gray-50 rounded-xl p-6 text-center">
                            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
                                <FiShield className="h-6 w-6 text-green-600" />
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">Quality Guarantee</h4>
                            <p className="text-gray-600 text-sm">
                                We use only high-quality replacement parts and offer warranty on all repairs
                            </p>
                        </motion.div>

                        <motion.div whileHover={{ y: -5 }} className="bg-gray-50 rounded-xl p-6 text-center">
                            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                                <FiClock className="h-6 w-6 bg-gradient-to-r from-[#34c5f1] to-[#a855f7] bg-clip-text text-transparent" />
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">Quick Turnaround</h4>
                            <p className="text-gray-600 text-sm">
                                Most repairs are completed within hours, not days, getting your device back to you faster
                            </p>
                        </motion.div>
                    </div>

                    <div className="mt-10 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-purple-100">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="flex-1">
                                <h4 className="text-xl font-semibold text-gray-900 mb-2">Need help choosing the right repair?</h4>
                                <p className="text-gray-600">
                                    Our team is ready to assist you in identifying the best repair option for your device. Contact us for
                                    a free consultation.
                                </p>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-gradient-to-r from-[#34c5f1] to-[#a855f7] hover:from-[#2ba8d0] hover:to-[#9333ea] text-white py-2 px-6 rounded-lg font-medium transition-all duration-300"
                            >
                                Contact Support
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mt-16 bg-gradient-to-r from-[#34c5f1] to-[#a855f7] rounded-2xl shadow-xl p-8 md:p-10 text-white"
                >
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold">Our Repair Excellence</h3>
                        <p className="mt-2 text-blue-100">The numbers speak for themselves</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold">
                                <CountUp end={5000} prefix="+" duration={2.5} />
                            </div>
                            <p className="text-blue-100 mt-2">Repairs Completed</p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold">
                                <CountUp end={98} suffix="%" decimals={1} duration={2.5} />
                            </div>
                            <p className="text-blue-100 mt-2">Satisfaction Rate</p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold">
                                <CountUp end={15} suffix="+" duration={2.5} />
                            </div>
                            <p className="text-blue-100 mt-2">Years Experience</p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold">
                                <CountUp end={24} duration={2.5} />
                            </div>
                            <p className="text-blue-100 mt-2">Hour Turnaround</p>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    )
}