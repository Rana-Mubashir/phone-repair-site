// Main.jsx
"use client"
import React from 'react'
import TestimonialsCard from './TestimonialsCard'
import { motion } from 'framer-motion'
import { FaShieldAlt, FaClock,FaStar } from 'react-icons/fa';
function Main() {
    return (
        <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <motion.h2 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                    >
                        What Our Customers Say
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-600 max-w-2xl mx-auto"
                    >
                        Join thousands of satisfied customers who trust us with their devices
                    </motion.p>
                </div>

                {/* Testimonials Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    <TestimonialsCard
                        name="Michael Chen"
                        position="iPhone 14 Pro Customer"
                        image="https://randomuser.me/api/portraits/men/32.jpg"
                        review="My iPhone fell in water and stopped working. They fixed it in just 2 hours! The screen protector installation was perfect too. Very reasonable prices."
                        rating={5}
                        device="iPhone 14 Pro"
                        service="Water Damage Repair"
                        date="2 days ago"
                    />
                    <TestimonialsCard
                        name="Sarah Johnson"
                        position="Samsung S23 Ultra Customer"
                        image="https://randomuser.me/api/portraits/women/44.jpg"
                        review="Battery was draining quickly on my Samsung. They replaced it with an original battery and now it lasts all day. Great warranty policy too!"
                        rating={5}
                        device="Samsung S23 Ultra"
                        service="Battery Replacement"
                        date="1 week ago"
                    />
                    <TestimonialsCard
                        name="David Rodriguez"
                        position="Google Pixel 7 Customer"
                        image="https://randomuser.me/api/portraits/men/75.jpg"
                        review="Cracked screen was fixed perfectly. They even gave me a temporary phone while waiting. Excellent customer service and very professional."
                        rating={4}
                        device="Google Pixel 7"
                        service="Screen Repair"
                        date="3 days ago"
                    />
                    <TestimonialsCard
                        name="Emily Watson"
                        position="MacBook Pro Customer"
                        image="https://randomuser.me/api/portraits/women/63.jpg"
                        review="My MacBook wouldn't charge. They diagnosed the problem immediately - it was just a charging port issue. Fast service and honest diagnosis."
                        rating={5}
                        device="MacBook Pro"
                        service="Charging Port Repair"
                        date="5 days ago"
                    />
                    <TestimonialsCard
                        name="James Wilson"
                        position="OnePlus 11 Customer"
                        image="https://randomuser.me/api/portraits/men/46.jpg"
                        review="Dropped my phone and the back glass shattered. They replaced it with original quality glass. Looks brand new! Definitely my go-to repair shop now."
                        rating={5}
                        device="OnePlus 11"
                        service="Back Glass Replacement"
                        date="1 day ago"
                    />
                    <TestimonialsCard
                        name="Lisa Anderson"
                        position="iPad Air Customer"
                        image="https://randomuser.me/api/portraits/women/17.jpg"
                        review="My kid cracked the iPad screen. They fixed it quickly and even applied a screen protector for free. Very kid-friendly environment!"
                        rating={5}
                        device="iPad Air"
                        service="Screen Repair"
                        date="4 days ago"
                    />
                </div>

                {/* Trust Badges */}
                <div className="mt-12 flex flex-wrap justify-center gap-8 items-center">
                    <div className="flex items-center space-x-2">
                        <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                        </div>
                        <span className="text-gray-600">4.9/5 (1,234 reviews)</span>
                    </div>
                    <div className="h-8 w-px bg-gray-300"></div>
                    <div className="flex items-center space-x-2">
                        <FaShieldAlt className="text-blue-600 text-xl" />
                        <span className="text-gray-600">90-Day Warranty</span>
                    </div>
                    <div className="h-8 w-px bg-gray-300"></div>
                    <div className="flex items-center space-x-2">
                        <FaClock className="text-blue-600 text-xl" />
                        <span className="text-gray-600">2-Hour Fast Repair</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Main