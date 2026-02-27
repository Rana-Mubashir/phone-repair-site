"use client"
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  User,
  CheckCircle,
  Wrench,
  Smartphone,
  DollarSign,
  Shield,
  Truck,
  Store,
  Home,
  AlertCircle,
  X
} from 'lucide-react'

function Page() {
  const { id } = useParams()
  const router = useRouter()
  const [data, setData] = useState(null)
  const [deviceInfo, setDeviceInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentStep, setCurrentStep] = useState(1)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [bookingDetails, setBookingDetails] = useState(null)

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    phone: '',
    repairOption: '',
    clinic: '',
    date: '',
    timeSlot: '',
    notes: ''
  })

  // Error state
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (id) {
      getRepairDetails()
    }
  }, [id])

  async function getRepairDetails() {
    setIsLoading(true)
    try {
      const resp = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/repairoptions/getrepairdetail/${id}`)
      if (resp) {
        console.log("response in book appointment", resp)
        const data = resp?.data?.data
        setData(data)
        setDeviceInfo({
          name: data?.device?.name || "Your Device",
          image: data?.device?.image || "/placeholder.svg?height=300&width=300",
          price: data?.price || 230,
          repairType: data?.name || "Screen Repair"
        })
      }
    } catch (error) {
      console.log("error in getting repair options", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }


  const validateStep = (step) => {
    const newErrors = {}

    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = 'First name is required'
      if (!formData.lastName) newErrors.lastName = 'Last name is required'
      if (!formData.email) newErrors.email = 'Email is required'
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
      if (formData.email !== formData.confirmEmail) newErrors.confirmEmail = 'Emails do not match'
      if (!formData.phone) newErrors.phone = 'Phone number is required'
      else if (!/^\d{10,}$/.test(formData.phone)) newErrors.phone = 'Phone number must be at least 10 digits'
    }

    if (step === 2) {
      if (!formData.repairOption) newErrors.repairOption = 'Please select a repair option'
      if (formData.repairOption === 'clinic' && !formData.clinic) newErrors.clinic = 'Please select a clinic'
      if (!formData.date) newErrors.date = 'Please select a date'
      if (!formData.timeSlot) newErrors.timeSlot = 'Please select a time slot'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePreviousStep = () => {
    setCurrentStep(prev => prev - 1)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateStep(2)) {
      // Generate booking number
      const bookingNumber = 'BK' + Date.now().toString().slice(-8) + Math.random().toString(36).substring(2, 8).toUpperCase()

      setBookingDetails({
        ...formData,
        bookingNumber,
        deviceName: deviceInfo?.name,
        repairType: deviceInfo?.repairType,
        price: deviceInfo?.price,
        bookingDate: new Date().toLocaleDateString(),
        bookingTime: new Date().toLocaleTimeString()
      })

      setShowConfirmation(true)
    }
  }

  const downloadReceipt = async () => {
    const receiptElement = document.getElementById('booking-receipt')
    if (receiptElement) {
      try {
        // Capture the receipt as canvas
        const canvas = await html2canvas(receiptElement, {
          scale: 2,
          backgroundColor: '#ffffff',
          logging: false,
          windowWidth: receiptElement.scrollWidth,
          windowHeight: receiptElement.scrollHeight
        })

        // Create PDF
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: [canvas.width * 0.75, canvas.height * 0.75]
        })

        // Add image to PDF
        const imgData = canvas.toDataURL('image/png')
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width * 0.75, canvas.height * 0.75)

        // Download PDF
        pdf.save(`receipt-${bookingDetails.bookingNumber}.pdf`)
      } catch (error) {
        console.error('Error generating receipt:', error)
      }
    }
  }

  const repairOptions = [
    { id: 'clinic', label: 'At Clinic', icon: Store, description: 'Visit our repair center' },
    { id: 'postal', label: 'Postal Repair', icon: Truck, description: 'Mail your device to us' },
  ]

  const clinics = [
    { id: 'downtown', name: 'Downtown Clinic', address: '123 Main St, Downtown', hours: '9AM - 6PM' },
    { id: 'citycenter', name: 'City Center Repair', address: '456 Market St, City Center', hours: '10AM - 8PM' },
    { id: 'techfix', name: 'TechFix Hub', address: '789 Tech Ave, Silicon Valley', hours: '8AM - 8PM' }
  ]

  const timeSlots = [
    '09:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '01:00 PM - 02:00 PM',
    '02:00 PM - 03:00 PM',
    '03:00 PM - 04:00 PM',
    '04:00 PM - 05:00 PM'
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading appointment details...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white rounded-full"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl font-bold text-white mb-4">Book Your Repair</h1>
            <p className="text-xl text-blue-100 mb-8">
              {deviceInfo?.name} - {deviceInfo?.repairType}
            </p>
            <div className="flex items-center justify-center gap-4 text-white">
              <div className="flex items-center gap-2">
                <Wrench className="w-5 h-5" />
                <span>Certified Technicians</span>
              </div>
              <div className="w-px h-6 bg-blue-400"></div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Quality Parts</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex justify-center items-center">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div className="flex items-center">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-semibold
                    ${currentStep >= step
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'}
                  `}>
                    {step}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-500">
                      {step === 1 ? 'Personal Info' : step === 2 ? 'Repair Details' : 'Review & Pay'}
                    </p>
                  </div>
                </div>
                {step < 3 && (
                  <div className={`
                    w-24 h-1 mx-4 rounded
                    ${currentStep > step ? 'bg-blue-600' : 'bg-gray-200'}
                  `}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              {currentStep === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Personal Information</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="John"
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.firstName ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                      </div>
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" /> {errors.firstName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Doe"
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.lastName ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                      </div>
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" /> {errors.lastName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@example.com"
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" /> {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Confirm Email <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="email"
                          name="confirmEmail"
                          value={formData.confirmEmail}
                          onChange={handleInputChange}
                          placeholder="john@example.com"
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.confirmEmail ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                      </div>
                      {errors.confirmEmail && (
                        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" /> {errors.confirmEmail}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-medium mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="1234567890"
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.phone ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" /> {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Repair Details</h2>

                  {/* Repair Options */}
                  <div className="mb-8">
                    <label className="block text-gray-700 font-medium mb-4">
                      How would you like to proceed? <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {repairOptions.map((option) => {
                        const Icon = option.icon
                        return (
                          <label
                            key={option.id}
                            className={`
                              relative border rounded-xl p-4 cursor-pointer transition-all
                              ${formData.repairOption === option.id
                                ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-200'
                                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'}
                            `}
                          >
                            <input
                              type="radio"
                              name="repairOption"
                              value={option.id}
                              checked={formData.repairOption === option.id}
                              onChange={handleInputChange}
                              className="sr-only"
                            />
                            <div className="flex items-start gap-3">
                              <div className={`
                                p-2 rounded-lg
                                ${formData.repairOption === option.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}
                              `}>
                                <Icon className="w-5 h-5" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-800">{option.label}</p>
                                <p className="text-sm text-gray-500">{option.description}</p>
                              </div>
                            </div>
                          </label>
                        )
                      })}
                    </div>
                    {errors.repairOption && (
                      <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" /> {errors.repairOption}
                      </p>
                    )}
                  </div>

                  {/* Clinic Selection (conditional) */}
                  {formData.repairOption === 'clinic' && (
                    <div className="mb-8">
                      <label className="block text-gray-700 font-medium mb-4">
                        Select Clinic <span className="text-red-500">*</span>
                      </label>
                      <div className="space-y-3">
                        {clinics.map((clinic) => (
                          <label
                            key={clinic.id}
                            className={`
                              block border rounded-lg p-4 cursor-pointer transition-all
                              ${formData.clinic === clinic.id
                                ? 'border-blue-600 bg-blue-50'
                                : 'border-gray-200 hover:border-blue-300'}
                            `}
                          >
                            <input
                              type="radio"
                              name="clinic"
                              value={clinic.id}
                              checked={formData.clinic === clinic.id}
                              onChange={handleInputChange}
                              className="sr-only"
                            />
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium text-gray-800">{clinic.name}</p>
                                <p className="text-sm text-gray-500 mt-1">{clinic.address}</p>
                                <p className="text-sm text-gray-500 mt-1">Hours: {clinic.hours}</p>
                              </div>
                              <MapPin className="w-5 h-5 text-blue-600" />
                            </div>
                          </label>
                        ))}
                      </div>
                      {errors.clinic && (
                        <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" /> {errors.clinic}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Date and Time */}
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Appointment Date <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          min={new Date().toISOString().split('T')[0]}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.date ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                      </div>
                      {errors.date && (
                        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" /> {errors.date}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Time Slot <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <select
                          name="timeSlot"
                          value={formData.timeSlot}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none bg-white ${errors.timeSlot ? 'border-red-500' : 'border-gray-300'
                            }`}
                        >
                          <option value="">Select a time slot</option>
                          {timeSlots.map((slot) => (
                            <option key={slot} value={slot}>{slot}</option>
                          ))}
                        </select>
                      </div>
                      {errors.timeSlot && (
                        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" /> {errors.timeSlot}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Any specific issues or special requests?"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                    ></textarea>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Review Your Booking</h2>

                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="font-semibold text-gray-800 mb-4">Personal Information</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Name</p>
                          <p className="font-medium">{formData.firstName} {formData.lastName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{formData.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-medium">{formData.phone}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="font-semibold text-gray-800 mb-4">Repair Details</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Device</p>
                          <p className="font-medium">{deviceInfo?.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Repair Type</p>
                          <p className="font-medium">{deviceInfo?.repairType}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Repair Option</p>
                          <p className="font-medium">
                            {repairOptions.find(opt => opt.id === formData.repairOption)?.label}
                          </p>
                        </div>
                        {formData.clinic && (
                          <div>
                            <p className="text-sm text-gray-500">Clinic</p>
                            <p className="font-medium">
                              {clinics.find(c => c.id === formData.clinic)?.name}
                            </p>
                          </div>
                        )}
                        <div>
                          <p className="text-sm text-gray-500">Date</p>
                          <p className="font-medium">{formData.date}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Time</p>
                          <p className="font-medium">{formData.timeSlot}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-6">
                      <h3 className="font-semibold text-gray-800 mb-4">Price Summary</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">{deviceInfo?.repairType}</span>
                          <span className="font-medium">${deviceInfo?.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Service Fee</span>
                          <span className="font-medium">$0</span>
                        </div>
                        <div className="border-t border-blue-200 pt-2 mt-2">
                          <div className="flex justify-between">
                            <span className="font-bold text-gray-800">Total</span>
                            <span className="font-bold text-blue-600">${deviceInfo?.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {currentStep > 1 && (
                  <button
                    onClick={handlePreviousStep}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Previous
                  </button>
                )}
                {currentStep < 3 ? (
                  <button
                    onClick={handleNextStep}
                    className="ml-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="ml-auto px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Confirm Booking
                  </button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Summary Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <Smartphone className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="font-bold text-xl text-gray-800">{deviceInfo?.name}</h3>
                <p className="text-gray-600">{deviceInfo?.repairType}</p>
              </div>

              <div className="space-y-4 mb-6">

                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Wrench className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Certified Technicians</p>
                    <p className="text-gray-500">Expert repair service</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Quality Parts</p>
                    <p className="text-gray-500">Genuine components</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">${deviceInfo?.price}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Tax:</span>
                  <span className="font-medium">$0</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold mt-4 pt-4 border-t border-gray-200">
                  <span>Total:</span>
                  <span className="text-blue-600">${deviceInfo?.price}</span>
                </div>
              </div>

              <div className="mt-6 bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-500 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Your payment information is secure and encrypted
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && bookingDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div id="booking-receipt" className="relative p-8">
                {/* Header with Logo */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    {/* Your Logo - Replace with your actual logo */}
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-xl font-bold text-gray-800">TechFix Pro</h1>
                      <p className="text-xs text-gray-500">Premium Device Repairs</p>
                    </div>
                  </div>

                  {/* Download Button */}
                  <button
                    onClick={downloadReceipt}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Receipt
                  </button>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => {
                    setShowConfirmation(false)
                    router.push('/')
                  }}
                  className="absolute top-8 right-8 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Success Message */}
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h2>
                  <p className="text-gray-600">Your repair appointment has been successfully booked.</p>
                </div>

                {/* Receipt Content */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 mb-6 border-2 border-blue-100">
                  {/* Watermark */}
                  <div className="absolute opacity-5 pointer-events-none">
                    <Smartphone className="w-64 h-64 text-blue-600" />
                  </div>

                  {/* Booking Number */}
                  <div className="text-center mb-6">
                    <p className="text-sm text-gray-600">Booking Number</p>
                    <p className="text-3xl font-bold text-blue-600 font-mono">{bookingDetails.bookingNumber}</p>
                  </div>

                  {/* Device & Customer Info */}
                  <div className="grid grid-cols-2 gap-8 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-blue-600" />
                        Device Details
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Device:</span>
                          <span className="font-medium">{bookingDetails.deviceName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Repair Type:</span>
                          <span className="font-medium">{bookingDetails.repairType}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                        <User className="w-4 h-4 text-blue-600" />
                        Customer Details
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Name:</span>
                          <span className="font-medium">{bookingDetails.firstName} {bookingDetails.lastName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Email:</span>
                          <span className="font-medium">{bookingDetails.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Phone:</span>
                          <span className="font-medium">{bookingDetails.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Appointment Details */}
                  <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                    <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      Appointment Details
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-gray-500 text-sm">Date</p>
                        <p className="font-medium">{bookingDetails.date}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Time</p>
                        <p className="font-medium">{bookingDetails.timeSlot}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Location</p>
                        <p className="font-medium">
                          {bookingDetails.repairOption === 'clinic'
                            ? clinics.find(c => c.id === bookingDetails.clinic)?.name
                            : repairOptions.find(opt => opt.id === bookingDetails.repairOption)?.label}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Price Summary */}
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-blue-600" />
                      Payment Summary
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500">{bookingDetails.repairType}:</span>
                        <span className="font-medium">${bookingDetails.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Service Fee:</span>
                        <span className="font-medium">$0</span>
                      </div>
                      <div className="border-t border-gray-200 pt-2 mt-2">
                        <div className="flex justify-between">
                          <span className="font-bold text-gray-800">Total Paid:</span>
                          <span className="font-bold text-blue-600">${bookingDetails.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer Note */}
                  <div className="mt-6 text-center text-xs text-gray-500">
                    <p>This is a computer generated receipt. No signature required.</p>
                    <p>Booking Date: {new Date().toLocaleString()}</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <p className="text-sm text-gray-600">
                      Confirmation email sent to <span className="font-medium">{bookingDetails.email}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <p className="text-sm text-gray-600">
                      We'll send you a reminder at <span className="font-medium">{bookingDetails.phone}</span>
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex gap-4">
                  <button
                    onClick={() => {
                      setShowConfirmation(false)
                      router.push('/')
                    }}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Back to Home
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="flex-1 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Print
                  </button>
                  <button
                    onClick={downloadReceipt}
                    className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Receipt
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Page