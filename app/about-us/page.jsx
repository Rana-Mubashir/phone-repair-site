"use client"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import {
  Smartphone,
  Tablet,
  Laptop,
  CheckCircle,
  Award,
  Clock,
  PenToolIcon as Tool,
  Users,
  ThumbsUp,
} from "lucide-react"
import Link from "next/link"

export default function AboutUsPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [storyRef, storyInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [teamRef, teamInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative bg-gradient-to-r from-blue-200 via-blue-100 to-purple-100 text-white overflow-hidden"
      >
        <div className="container mx-auto px-4 py-20 md:py-0 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              className="md:w-1/2 mb-10 md:mb-0"
              initial={{ opacity: 0, x: -30 }}
              animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-[#34c5f1] to-[#a855f7] bg-clip-text text-transparent">Expert Device Repair You Can Trust</h1>
              <div className="h-1 w-24 bg-gradient-to-r from-[#34c5f1] to-[#a855f7] rounded-full mb-6"></div>
              <p className="text-xl text-gray-700 mb-8 max-w-lg">
                We specialize in repairing mobile phones, tablets, and laptops of all brands with quality parts and
                expert technicians.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/repair-options"
                  className="bg-gradient-to-r from-[#34c5f1] to-[#a855f7] text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]"
                >
                  Start Repair
                </Link>
                <Link
                  href="/contact-us"
                  className="bg-transparent border-2 border-[#34c5f1] px-6 py-3 rounded-lg font-medium hover:bg-gradient-to-r hover:from-[#34c5f1]/10 hover:to-[#a855f7]/10 transition-all duration-300 bg-gradient-to-r from-[#34c5f1] to-[#a855f7] bg-clip-text text-transparent"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="md:w-1/2 flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#34c5f1]/20 to-[#a855f7]/20 rounded-full blur-lg"></div>
                <img
                  src="https://i.shgcdn.com/16fdb501-6cf7-4b89-aeba-34cb0323943a/-/format/auto/-/preview/3000x3000/-/quality/lighter/"
                  alt="Device Repair"
                  className="relative z-10 max-w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section ref={storyRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={storyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Story</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-[#34c5f1] to-[#a855f7] rounded-full mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-gray-600 text-lg">
              Learn about our journey to becoming the most trusted device repair service in the region.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={storyInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#34c5f1]/10 to-[#a855f7]/10 rounded-lg blur-lg"></div>
                <img
                  src="https://localcomputer.expert/wp-content/uploads/2024/04/Inside-the-workshop-2.jpg"
                  alt="Our Workshop"
                  className="rounded-lg shadow-lg relative z-10 w-full h-auto"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={storyInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-gray-800">From Passion to Profession</h3>
              <p className="text-gray-600">
                Founded in 2015, our repair service began with a simple mission: to provide honest, affordable, and
                high-quality device repairs. What started as a small workshop has grown into a trusted repair center
                serving thousands of satisfied customers.
              </p>
              <p className="text-gray-600">
                Our team of certified technicians brings years of experience and a passion for technology to every
                repair. We continuously train and stay updated with the latest repair techniques and tools to ensure we
                can fix even the most challenging issues.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-gradient-to-r from-[#34c5f1]/10 to-[#a855f7]/10 p-1.5 rounded-full">
                    <CheckCircle className="h-5 w-5 text-[#34c5f1]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Our Mission</h4>
                    <p className="text-gray-600">
                      To provide fast, reliable, and affordable device repair services that exceed customer
                      expectations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-gradient-to-r from-[#34c5f1]/10 to-[#a855f7]/10 p-1.5 rounded-full">
                    <CheckCircle className="h-5 w-5 text-[#34c5f1]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Our Vision</h4>
                    <p className="text-gray-600">
                      To be the most trusted device repair service, known for quality, integrity, and customer
                      satisfaction.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" ref={servicesRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-[#34c5f1] to-[#a855f7] rounded-full mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-gray-600 text-lg">
              We repair all types of devices across all major brands with quality parts and expert service.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
          >
            {/* Mobile Phones */}
            <motion.div
              variants={fadeIn}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="bg-gradient-to-r from-[#34c5f1]/10 to-[#a855f7]/10 p-8 flex justify-center">
                <Smartphone className="h-20 w-20 text-[#34c5f1]" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Mobile Phone Repair</h3>
                <p className="text-gray-600 mb-4">
                  We repair all brands including Apple, Samsung, Google, OnePlus, Xiaomi, and more.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#34c5f1]" />
                    <span className="text-gray-700">Screen Replacement</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#34c5f1]" />
                    <span className="text-gray-700">Battery Replacement</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#34c5f1]" />
                    <span className="text-gray-700">Water Damage Repair</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#34c5f1]" />
                    <span className="text-gray-700">Camera & Speaker Fixes</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Tablets */}
            <motion.div
              variants={fadeIn}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="bg-gradient-to-r from-[#34c5f1]/10 to-[#a855f7]/10 p-8 flex justify-center">
                <Tablet className="h-20 w-20 text-[#a855f7]" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Tablet Repair</h3>
                <p className="text-gray-600 mb-4">
                  Expert repair for all tablet brands including iPad, Samsung Galaxy Tab, Microsoft Surface, and more.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#a855f7]" />
                    <span className="text-gray-700">Screen Replacement</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#a855f7]" />
                    <span className="text-gray-700">Battery Service</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#a855f7]" />
                    <span className="text-gray-700">Charging Port Repair</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#a855f7]" />
                    <span className="text-gray-700">Software Issues</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Laptops */}
            <motion.div
              variants={fadeIn}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="bg-gradient-to-r from-[#34c5f1]/10 to-[#a855f7]/10 p-8 flex justify-center">
                <Laptop className="h-20 w-20 text-[#34c5f1]" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Laptop Repair</h3>
                <p className="text-gray-600 mb-4">
                  Professional repair services for all laptop brands including Apple, Dell, HP, Lenovo, and more.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#34c5f1]" />
                    <span className="text-gray-700">Screen Replacement</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#34c5f1]" />
                    <span className="text-gray-700">Keyboard Replacement</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#34c5f1]" />
                    <span className="text-gray-700">Hardware Upgrades</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#34c5f1]" />
                    <span className="text-gray-700">Data Recovery</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
          >
            <motion.div
              variants={fadeIn}
              className="bg-gradient-to-r from-[#34c5f1]/5 to-[#a855f7]/5 p-8 rounded-xl text-center"
            >
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Users className="h-10 w-10 text-[#34c5f1]" />
              </div>
              <h3 className="text-4xl font-bold text-gray-800 mb-2">10,000+</h3>
              <p className="text-gray-600">Happy Customers</p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="bg-gradient-to-r from-[#34c5f1]/5 to-[#a855f7]/5 p-8 rounded-xl text-center"
            >
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Tool className="h-10 w-10 text-[#a855f7]" />
              </div>
              <h3 className="text-4xl font-bold text-gray-800 mb-2">25,000+</h3>
              <p className="text-gray-600">Devices Repaired</p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="bg-gradient-to-r from-[#34c5f1]/5 to-[#a855f7]/5 p-8 rounded-xl text-center"
            >
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Award className="h-10 w-10 text-[#34c5f1]" />
              </div>
              <h3 className="text-4xl font-bold text-gray-800 mb-2">8+</h3>
              <p className="text-gray-600">Years Experience</p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="bg-gradient-to-r from-[#34c5f1]/5 to-[#a855f7]/5 p-8 rounded-xl text-center"
            >
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <ThumbsUp className="h-10 w-10 text-[#a855f7]" />
              </div>
              <h3 className="text-4xl font-bold text-gray-800 mb-2">99%</h3>
              <p className="text-gray-600">Satisfaction Rate</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Why Choose Us</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-[#34c5f1] to-[#a855f7] rounded-full mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-gray-600 text-lg">
              We are committed to providing the best repair experience with quality, speed, and excellent customer
              service.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="bg-gradient-to-r from-[#34c5f1]/10 to-[#a855f7]/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Award className="h-7 w-7 text-[#34c5f1]" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Quality Parts</h3>
              <p className="text-gray-600">
                We use only high-quality, genuine or OEM-grade parts for all our repairs to ensure optimal performance
                and longevity.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="bg-gradient-to-r from-[#34c5f1]/10 to-[#a855f7]/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-7 w-7 text-[#a855f7]" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Fast Service</h3>
              <p className="text-gray-600">
                Most repairs are completed the same day, often while you wait, getting your device back to you as
                quickly as possible.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="bg-gradient-to-r from-[#34c5f1]/10 to-[#a855f7]/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Users className="h-7 w-7 text-[#34c5f1]" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Expert Technicians</h3>
              <p className="text-gray-600">
                Our certified repair specialists have years of experience and undergo continuous training to stay
                up-to-date.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="bg-gradient-to-r from-[#34c5f1]/10 to-[#a855f7]/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
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
                  className="h-7 w-7 text-[#a855f7]"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Warranty Included</h3>
              <p className="text-gray-600">
                All our repairs come with a warranty, giving you peace of mind that your device is protected after
                service.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="bg-gradient-to-r from-[#34c5f1]/10 to-[#a855f7]/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
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
                  className="h-7 w-7 text-[#34c5f1]"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Competitive Pricing</h3>
              <p className="text-gray-600">
                We offer fair, transparent pricing with no hidden fees or surprises. Get a free estimate before any work
                begins.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="bg-gradient-to-r from-[#34c5f1]/10 to-[#a855f7]/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
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
                  className="h-7 w-7 text-[#a855f7]"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Excellent Support</h3>
              <p className="text-gray-600">
                Our friendly customer service team is always ready to answer your questions and provide assistance when
                needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Commented out as in original */}
      {/* <section ref={teamRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-[#34c5f1] to-[#a855f7] rounded-full mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-gray-600 text-lg">
              Our skilled technicians bring years of experience and passion to every repair.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={teamInView ? "visible" : "hidden"}
          >
            {[
              {
                name: "John Smith",
                role: "Lead Technician",
                bio: "Specializes in iPhone and Samsung repairs with 10+ years of experience.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Sarah Johnson",
                role: "Tablet Repair Specialist",
                bio: "Expert in iPad and Android tablet repairs with 8 years of experience.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Michael Chen",
                role: "Laptop Technician",
                bio: "Specializes in MacBook and PC laptop repairs and upgrades.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Emily Rodriguez",
                role: "Customer Service Manager",
                bio: "Ensures every customer receives exceptional service and support.",
                image: "/placeholder.svg?height=300&width=300",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
              >
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-64 object-cover object-center"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                  <p className="bg-gradient-to-r from-[#34c5f1] to-[#a855f7] bg-clip-text text-transparent font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section id="contact" ref={ctaRef} className="py-20 bg-gradient-to-r from-[#34c5f1] to-[#a855f7] text-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Fix Your Device?</h2>
            <div className="h-1 w-20 bg-white rounded-full mx-auto mb-6"></div>
            <p className="text-xl text-white/90 mb-8">
              Contact us today for a free diagnostic and get your device working like new again!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact-us"
                className="bg-white text-[#34c5f1] px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]"
              >
                Contact Us
              </Link>
              <Link
                href="/repair-services"
                className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-all duration-300"
              >
                Start Repair
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}