"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Smartphone, Laptop, Tablet,  ChevronRight, X } from "lucide-react"

function RepairServicesDropDown() {
    const [activeTab, setActiveTab] = useState("Phone")

    const repairData = [
        {
            category: "Phone",
            icon: <Smartphone className="h-5 w-5" />,
            brands: [
                {
                    name: "Apple",
                    logo: "/placeholder.svg?height=30&width=30",
                    devices: [
                        "iPhone 15 Pro Max",
                        "iPhone 15 Pro",
                        "iPhone 15 Plus",
                        "iPhone 15",
                        "iPhone 14 Pro Max",
                        "iPhone 14 Pro",
                        "iPhone 14 Plus",
                        "iPhone 14",
                        "iPhone 13 Pro Max",
                        "iPhone 13 Pro",
                        "iPhone 13",
                        "iPhone 13 Mini",
                        "iPhone 12 Pro Max",
                        "iPhone 12 Pro",
                        "iPhone 12",
                        "iPhone 12 Mini",
                        "iPhone 11 Pro Max",
                        "iPhone 11 Pro",
                        "iPhone 11",
                        "iPhone XS Max",
                        "iPhone XS",
                        "iPhone XR",
                        "iPhone X",
                        "iPhone SE (3rd gen)",
                        "iPhone SE (2nd gen)",
                    ],
                },
                {
                    name: "Samsung",
                    logo: "/placeholder.svg?height=30&width=30",
                    devices: [
                        "Galaxy S23 Ultra",
                        "Galaxy S23+",
                        "Galaxy S23",
                        "Galaxy S22 Ultra",
                        "Galaxy S22+",
                        "Galaxy S22",
                        "Galaxy S21 Ultra",
                        "Galaxy S21+",
                        "Galaxy S21",
                        "Galaxy S21 FE",
                        "Galaxy S20 Ultra",
                        "Galaxy S20+",
                        "Galaxy S20",
                        "Galaxy S20 FE",
                        "Galaxy Note 20 Ultra",
                        "Galaxy Note 20",
                        "Galaxy Z Fold 5",
                        "Galaxy Z Fold 4",
                        "Galaxy Z Fold 3",
                        "Galaxy Z Flip 5",
                        "Galaxy Z Flip 4",
                        "Galaxy Z Flip 3",
                        "Galaxy A54",
                        "Galaxy A53",
                        "Galaxy A52",
                    ],
                },
                {
                    name: "Google",
                    logo: "/placeholder.svg?height=30&width=30",
                    devices: [
                        "Pixel 8 Pro",
                        "Pixel 8",
                        "Pixel 7 Pro",
                        "Pixel 7",
                        "Pixel 7a",
                        "Pixel 6 Pro",
                        "Pixel 6",
                        "Pixel 6a",
                        "Pixel 5",
                        "Pixel 5a",
                        "Pixel 4 XL",
                        "Pixel 4",
                        "Pixel 4a",
                    ],
                },
                {
                    name: "OnePlus",
                    logo: "/placeholder.svg?height=30&width=30",
                    devices: [
                        "OnePlus 11",
                        "OnePlus 10 Pro",
                        "OnePlus 10T",
                        "OnePlus 9 Pro",
                        "OnePlus 9",
                        "OnePlus 8 Pro",
                        "OnePlus 8",
                        "OnePlus Nord 3",
                        "OnePlus Nord 2",
                        "OnePlus Nord",
                    ],
                },
                {
                    name: "Xiaomi",
                    logo: "/placeholder.svg?height=30&width=30",
                    devices: [
                        "Xiaomi 13 Pro",
                        "Xiaomi 13",
                        "Xiaomi 12 Pro",
                        "Xiaomi 12",
                        "Xiaomi 12T Pro",
                        "Xiaomi 12T",
                        "Xiaomi 11T Pro",
                        "Xiaomi 11T",
                        "Redmi Note 12 Pro+",
                        "Redmi Note 12 Pro",
                        "Redmi Note 12",
                    ],
                },
            ],
        },
        {
            category: "Laptop",
            icon: <Laptop className="h-5 w-5" />,
            brands: [
                {
                    name: "Apple",
                    logo: "/placeholder.svg?height=30&width=30",
                    devices: [
                        'MacBook Pro 16" (M3)',
                        'MacBook Pro 14" (M3)',
                        'MacBook Pro 16" (M2)',
                        'MacBook Pro 14" (M2)',
                        'MacBook Pro 13" (M2)',
                        'MacBook Air 15" (M2)',
                        'MacBook Air 13" (M2)',
                        'MacBook Air 13" (M1)',
                    ],
                },
                {
                    name: "Dell",
                    logo: "/placeholder.svg?height=30&width=30",
                    devices: [
                        "XPS 13 Plus",
                        "XPS 13",
                        "XPS 15",
                        "XPS 17",
                    ],
                },
            ],
        },
        {
            category: "Tablet",
            icon: <Tablet className="h-5 w-5" />,
            brands: [
                {
                    name: "Apple",
                    logo: "/placeholder.svg?height=30&width=30",
                    devices: [
                        'iPad Pro 12.9" (M2)',
                        'iPad Pro 11" (M2)',
                        "iPad Air (5th gen)",
                        "iPad (10th gen)",
                        "iPad (9th gen)",
                        "iPad mini (6th gen)",
                    ],
                },
                {
                    name: "Samsung",
                    logo: "/placeholder.svg?height=30&width=30",
                    devices: [
                        "Galaxy Tab S9 Ultra",
                        "Galaxy Tab S9+",
                        "Galaxy Tab S9",
                        "Galaxy Tab S8 Ultra",
                        "Galaxy Tab S8+",
                        "Galaxy Tab S8",
                        "Galaxy Tab A8",
                        "Galaxy Tab A7 Lite",
                    ],
                },
                {
                    name: "Microsoft",
                    logo: "/placeholder.svg?height=30&width=30",
                    devices: ["Surface Pro 9", "Surface Pro 8", "Surface Go 3"],
                },
                {
                    name: "Lenovo",
                    logo: "/placeholder.svg?height=30&width=30",
                    devices: ["Tab P12 Pro", "Tab P11 Pro Gen 2", "Tab P11 (2nd Gen)", "Tab M10 Plus (3rd Gen)"],
                },
            ],
        },
    ]

    const dropdownVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                staggerChildren: 0.05,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0 },
    }

    const currentCategory = repairData.find((cat) => cat.category === activeTab)

    return (
        <motion.div
            className="absolute top-[100%] left-0  bg-gradient-to-br from-[#152344] to-[#6d7896] text-white shadow-2xl rounded-xl z-50  overflow-hidden"
            initial="hidden"
            animate="visible"
            variants={dropdownVariants}
        >
            <div className="flex">
                <div className=" border-r border-gray-700/50 bg-gray-900/30">
                    <div className="p-3 border-b border-gray-700/50">
                        <h3 className="font-medium text-sm text-gray-400">CATEGORIES</h3>
                    </div>
                    <div className="py-2">
                        {repairData.map((category) => (
                            <button
                                key={category.category}
                                className={`flex items-center gap-3 w-full text-left px-4 py-3 transition-colors ${activeTab === category.category
                                    ? "bg-[#34c5f1]/10 text-[#34c5f1] border-l-2 border-[#34c5f1]"
                                    : "hover:bg-gray-800/30 text-gray-300 border-l-2 border-transparent"
                                    }`}
                                onClick={() => setActiveTab(category.category)}
                            >
                                <span className="flex-shrink-0">{category.icon}</span>
                                <span>{category.category}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-grow p-6 max-h-[80vh] overflow-y-auto">

                    {
                        currentCategory && (
                            <div>
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                    <span className="p-2 rounded-full bg-[#34c5f1]/20 text-[#34c5f1]">{currentCategory.icon}</span>
                                    <span>{currentCategory.category} Repair Services</span>
                                </h2>

                                <div className="flex  flex-wrap gap-24">
                                    {currentCategory.brands.map((brand, bIdx) => (
                                        <motion.div key={bIdx} variants={itemVariants} className="space-y-3">
                                            <div className="flex items-center gap-3 pb-2 border-b border-gray-700/50">
                                                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center overflow-hidden">
                                                </div>
                                                <h3 className="font-bold text-lg text-[#34c5f1]">{brand.name}</h3>
                                            </div>

                                            <div className="space-y-1 max-h-60 overflow-y-auto pr-2 scrollbar-thin">
                                                {brand.devices.map((device, dIdx) => (
                                                    <div key={dIdx} className="group">
                                                        <Link
                                                            href={`/repair-services/${currentCategory.category.toLowerCase()}/${brand.name.toLowerCase()}/${device.toLowerCase().replace(/ /g, "-")}`}
                                                            className="flex items-center justify-between p-2 rounded-lg hover:bg-[#34c5f1]/10 transition-colors"
                                                        >
                                                            <span className="text-gray-300 group-hover:text-white">{device}</span>
                                                            <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 text-[#34c5f1] transition-opacity" />
                                                        </Link>
                                                    </div>
                                                ))}
                                            </div>

                                            <Link
                                                href={`/repair-services/${currentCategory.category.toLowerCase()}/${brand.name.toLowerCase()}`}
                                                className="inline-flex items-center text-sm text-[#34c5f1] hover:underline mt-2"
                                            >
                                                
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>

            <div className="bg-gray-900/50 p-4 border-t border-gray-700/50 flex justify-between items-center">
                <div>
                </div>
                <div className="text-xs text-gray-400">Fast repairs for all device brands</div>
            </div>
        </motion.div>
    )
}

export default RepairServicesDropDown
