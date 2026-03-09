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
  X,
  Loader2,
  Store as StoreIcon
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
  
  // Shop addresses state
  const [shopAddresses, setShopAddresses] = useState([])
  const [loadingAddresses, setLoadingAddresses] = useState(false)
  const [addressesError, setAddressesError] = useState(null)

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

  // Fetch shop addresses when clinic option is selected
  useEffect(() => {
    if (formData.repairOption === 'clinic') {
      fetchShopAddresses()
    } else {
      setShopAddresses([])
      setAddressesError(null)
    }
  }, [formData.repairOption])

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

  // Fetch shop addresses from API
  const fetchShopAddresses = async () => {
    setLoadingAddresses(true)
    setAddressesError(null)
    try {
      // Fetch only active addresses
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/address/active`)
      console.log("response for addresses",response)
      if (response.data.success) {
        setShopAddresses(response.data.data)
      } else {
        setAddressesError('Failed to load shop addresses')
      }
    } catch (error) {
      console.error('Error fetching shop addresses:', error)
      setAddressesError('Network error. Please try again.')
    } finally {
      setLoadingAddresses(false)
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

      // Get selected clinic details
      const selectedClinic = shopAddresses.find(c => c._id === formData.clinic)

      setBookingDetails({
        ...formData,
        bookingNumber,
        deviceName: deviceInfo?.name,
        repairType: deviceInfo?.repairType,
        price: deviceInfo?.price,
        bookingDate: new Date().toLocaleDateString(),
        bookingTime: new Date().toLocaleTimeString(),
        clinicDetails: selectedClinic // Add clinic details for receipt
      })

      setShowConfirmation(true)
    }
  }

  const downloadReceipt = async () => {
    const receiptElement = document.getElementById('booking-receipt')
    if (receiptElement) {
      try {
        const canvas = await html2canvas(receiptElement, {
          scale: 2,
          backgroundColor: '#ffffff',
          logging: false,
          windowWidth: receiptElement.scrollWidth,
          windowHeight: receiptElement.scrollHeight
        })

        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: [canvas.width * 0.75, canvas.height * 0.75]
        })

        const imgData = canvas.toDataURL('image/png')
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width * 0.75, canvas.height * 0.75)
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#34c5f1] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading appointment details...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#34c5f1] to-[#a855f7] py-20 px-6 overflow-hidden">
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
              <div className="w-px h-6 bg-white/30"></div>
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
                    w-10 h-[33px] md:h-10 rounded-full flex items-center justify-center font-semibold
                    ${currentStep >= step
                      ? 'bg-gradient-to-r from-[#34c5f1] to-[#a855f7] text-white'
                      : 'bg-gray-200 text-gray-600'}
                  `}
                  >
                    {step}
                  </div>
                  <div className="ml-2">
                    <p className=" text-xs md:text-sm text-gray-500">
                      {step === 1 ? 'Personal Info' : step === 2 ? 'Repair Details' : 'Review & Pay'}
                    </p>
                  </div>
                </div>
                {step < 3 && (
                  <div className={`
                    w-24 h-1 mx-4 rounded
                    ${currentStep > step ? 'bg-gradient-to-r from-[#34c5f1] to-[#a855f7]' : 'bg-gray-200'}
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
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#34c5f1] focus:outline-none ${errors.firstName ? 'border-red-500' : 'border-gray-300'
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
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#34c5f1] focus:outline-none ${errors.lastName ? 'border-red-500' : 'border-gray-300'
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
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#34c5f1] focus:outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'
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
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#34c5f1] focus:outline-none ${errors.confirmEmail ? 'border-red-500' : 'border-gray-300'
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
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#34c5f1] focus:outline-none ${errors.phone ? 'border-red-500' : 'border-gray-300'
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
                                ? 'border-[#34c5f1] bg-blue-50 ring-2 ring-[#34c5f1]/20'
                                : 'border-gray-200 hover:border-[#34c5f1] hover:bg-gray-50'}
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
                            <div className="flex flex-col md:flex-row items-start gap-2 md:gap-3">
                              <div className={`
                                p-2 rounded-lg
                                ${formData.repairOption === option.id ? 'bg-[#34c5f1] text-white' : 'bg-gray-100 text-gray-600'}
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

                  {/* Clinic Selection with actual shop addresses */}
                  {formData.repairOption === 'clinic' && (
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <label className="block text-gray-700 font-medium">
                          Select Clinic <span className="text-red-500">*</span>
                        </label>
                        {loadingAddresses && (
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Loading clinics...
                          </div>
                        )}
                      </div>

                      {loadingAddresses ? (
                        <div className="text-center py-8 bg-gray-50 rounded-lg">
                          <Loader2 className="w-8 h-8 animate-spin text-[#34c5f1] mx-auto mb-3" />
                          <p className="text-gray-600">Loading available clinics...</p>
                        </div>
                      ) : addressesError ? (
                        <div className="text-center py-8 bg-red-50 rounded-lg">
                          <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-3" />
                          <p className="text-red-600 mb-2">Failed to load clinics</p>
                          <button
                            onClick={fetchShopAddresses}
                            className="text-sm text-[#34c5f1] hover:underline"
                          >
                            Try again
                          </button>
                        </div>
                      ) : shopAddresses.length === 0 ? (
                        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                          <StoreIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                          <h3 className="text-lg font-semibold text-gray-700 mb-2">No Clinics Available</h3>
                          <p className="text-gray-500 max-w-md mx-auto">
                            We currently don't have any active clinic locations. 
                            Please choose the "Postal Repair" option or contact our support.
                          </p>
                          <div className="mt-4">
                            <button
                              onClick={() => setFormData(prev => ({ ...prev, repairOption: 'postal' }))}
                              className="text-sm bg-gradient-to-r from-[#34c5f1] to-[#a855f7] text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                            >
                              Switch to Postal Repair
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                          {shopAddresses.map((clinic) => (
                            <label
                              key={clinic._id}
                              className={`
                                block border rounded-lg p-4 cursor-pointer transition-all
                                ${formData.clinic === clinic._id
                                  ? 'border-[#34c5f1] bg-blue-50 ring-2 ring-[#34c5f1]/20'
                                  : 'border-gray-200 hover:border-[#34c5f1] hover:bg-gray-50'}
                              `}
                            >
                              <input
                                type="radio"
                                name="clinic"
                                value={clinic._id}
                                checked={formData.clinic === clinic._id}
                                onChange={handleInputChange}
                                className="sr-only"
                              />
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium text-gray-800">{clinic.name}</p>
                                  <p className="text-sm text-gray-500 mt-1">{clinic.address}</p>
                                  <p className="text-sm text-gray-500 mt-1">
                                    <Clock className="inline w-3 h-3 mr-1" />
                                    {clinic.timing}
                                  </p>
                                </div>
                                <MapPin className="w-5 h-5 text-[#34c5f1] flex-shrink-0" />
                              </div>
                            </label>
                          ))}
                        </div>
                      )}

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
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#34c5f1] focus:outline-none ${errors.date ? 'border-red-500' : 'border-gray-300'
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
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#34c5f1] focus:outline-none appearance-none bg-white ${errors.timeSlot ? 'border-red-500' : 'border-gray-300'
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#34c5f1] focus:outline-none resize-none"
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
                        <div className='max-w-full'>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium break-words">{formData.email}</p>
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
                        {formData.clinic && shopAddresses.find(c => c._id === formData.clinic) && (
                          <div className="col-span-2">
                            <p className="text-sm text-gray-500">Clinic</p>
                            <p className="font-medium">
                              {shopAddresses.find(c => c._id === formData.clinic)?.name}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              {shopAddresses.find(c => c._id === formData.clinic)?.address}
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

                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
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
                            <span className="font-bold text-[#34c5f1]">${deviceInfo?.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between gap-2 mt-8">
                {currentStep > 1 && (
                  <button
                    onClick={handlePreviousStep}
                    className="px-4 md:px-8 py-2 md:py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Previous
                  </button>
                )}
                {currentStep < 3 ? (
                  <button
                    onClick={handleNextStep}
                    className="ml-auto px-4 md:px-8 py-2 md:py-3 bg-gradient-to-r from-[#34c5f1] to-[#a855f7] text-white rounded-lg hover:from-[#2ba8d0] hover:to-[#9333ea] transition-all duration-300"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="ml-auto px-4 md:px-8 py-2 md:py-3 bg-gradient-to-r from-[#34c5f1] to-[#a855f7] text-white rounded-lg hover:from-[#2ba8d0] hover:to-[#9333ea] transition-all duration-300 flex items-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5 hidden md:block" />
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
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                  <Smartphone className="w-12 h-12 text-[#34c5f1]" />
                </div>
                <h3 className="font-bold text-xl text-gray-800">{deviceInfo?.name}</h3>
                <p className="text-gray-600">{deviceInfo?.repairType}</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                    <Wrench className="w-4 h-4 text-[#34c5f1]" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Certified Technicians</p>
                    <p className="text-gray-500">Expert repair service</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4 text-[#a855f7]" />
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
                  <span className="bg-gradient-to-r from-[#34c5f1] to-[#a855f7] bg-clip-text text-transparent">${deviceInfo?.price}</span>
                </div>
              </div>

              <div className="mt-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4">
                <p className="text-xs text-gray-500 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#34c5f1]" />
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
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto"
            onClick={() => {
              setShowConfirmation(false);
              router.push('/');
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[98vh] sm:max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div id="booking-receipt" className="relative p-4 sm:p-6 md:p-8">
                {/* Header with Logo and Download Button */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#34c5f1] to-[#a855f7] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-lg sm:text-xl font-bold text-gray-800">TechFix Pro</h1>
                      <p className="text-xs text-gray-500">Premium Device Repairs</p>
                    </div>
                  </div>

                  <button
                    onClick={downloadReceipt}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-[#34c5f1] to-[#a855f7] text-white rounded-lg hover:from-[#2ba8d0] hover:to-[#9333ea] transition-colors text-sm sm:text-base"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span className="sm:inline">Download Receipt</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    setShowConfirmation(false)
                    router.push('/')
                  }}
                  className="absolute top-2 right-2 sm:top-4 sm:right-4 md:top-8 md:right-8 p-1 text-gray-400 hover:text-gray-600 bg-white rounded-full shadow-sm sm:shadow-none"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                {/* Success Message */}
                <div className="text-center mb-6 sm:mb-8">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">Booking Confirmed!</h2>
                  <p className="text-sm sm:text-base text-gray-600 px-2">Your repair appointment has been successfully booked.</p>
                </div>

                {/* Receipt Content */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 sm:p-6 md:p-8 mb-6 border-2 border-[#34c5f1]/20 relative overflow-hidden">
                  <div className="hidden sm:block absolute opacity-5 pointer-events-none">
                    <Smartphone className="w-48 sm:w-64 h-48 sm:h-64 text-[#34c5f1]" />
                  </div>

                  {/* Booking Number */}
                  <div className="text-center mb-4 sm:mb-6">
                    <p className="text-xs sm:text-sm text-gray-600">Booking Number</p>
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#34c5f1] to-[#a855f7] bg-clip-text text-transparent font-mono break-all">
                      {bookingDetails.bookingNumber}
                    </p>
                  </div>

                  {/* Device & Customer Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6">
                    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm">
                      <h3 className="font-semibold text-gray-700 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                        <Smartphone className="w-3 h-3 sm:w-4 sm:h-4 text-[#34c5f1]" />
                        Device Details
                      </h3>
                      <div className="space-y-1.5 sm:space-y-2">
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                          <span className="text-xs sm:text-sm text-gray-500">Device:</span>
                          <span className="text-sm sm:text-base font-medium break-words">{bookingDetails.deviceName}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                          <span className="text-xs sm:text-sm text-gray-500">Repair Type:</span>
                          <span className="text-sm sm:text-base font-medium break-words">{bookingDetails.repairType}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm">
                      <h3 className="font-semibold text-gray-700 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                        <User className="w-3 h-3 sm:w-4 sm:h-4 text-[#34c5f1]" />
                        Customer Details
                      </h3>
                      <div className="space-y-1.5 sm:space-y-2">
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                          <span className="text-xs sm:text-sm text-gray-500">Name:</span>
                          <span className="text-sm sm:text-base font-medium break-words">{bookingDetails.firstName} {bookingDetails.lastName}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                          <span className="text-xs sm:text-sm text-gray-500">Email:</span>
                          <span className="text-sm sm:text-base font-medium break-words">{bookingDetails.email}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                          <span className="text-xs sm:text-sm text-gray-500">Phone:</span>
                          <span className="text-sm sm:text-base font-medium break-words">{bookingDetails.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Appointment Details */}
                  <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm mb-4 sm:mb-6">
                    <h3 className="font-semibold text-gray-700 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-[#34c5f1]" />
                      Appointment Details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                      <div>
                        <p className="text-gray-500 text-xs sm:text-sm">Date</p>
                        <p className="text-sm sm:text-base font-medium break-words">{bookingDetails.date}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs sm:text-sm">Time</p>
                        <p className="text-sm sm:text-base font-medium break-words">{bookingDetails.timeSlot}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs sm:text-sm">Location</p>
                        <p className="text-sm sm:text-base font-medium break-words">
                          {bookingDetails.repairOption === 'clinic' && bookingDetails.clinicDetails
                            ? bookingDetails.clinicDetails.name
                            : repairOptions.find(opt => opt.id === bookingDetails.repairOption)?.label}
                        </p>
                        {bookingDetails.repairOption === 'clinic' && bookingDetails.clinicDetails && (
                          <p className="text-xs text-gray-500 mt-1">
                            {bookingDetails.clinicDetails.address}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Price Summary */}
                  <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-gray-700 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                      <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-[#34c5f1]" />
                      Payment Summary
                    </h3>
                    <div className="space-y-1.5 sm:space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm text-gray-500">{bookingDetails.repairType}:</span>
                        <span className="text-sm sm:text-base font-medium">${bookingDetails.price}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm text-gray-500">Service Fee:</span>
                        <span className="text-sm sm:text-base font-medium">$0</span>
                      </div>
                      <div className="border-t border-gray-200 pt-2 mt-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm sm:text-base font-bold text-gray-800">Total Paid:</span>
                          <span className="text-base sm:text-lg font-bold text-[#34c5f1]">${bookingDetails.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer Note */}
                  <div className="mt-4 sm:mt-6 text-center text-xs text-gray-500">
                    <p>This is a computer generated receipt. No signature required.</p>
                    <p className="mt-1">Booking Date: {new Date().toLocaleString()}</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start sm:items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#34c5f1] flex-shrink-0 mt-0.5 sm:mt-0" />
                    <p className="text-xs sm:text-sm text-gray-600 break-words">
                      Confirmation email sent to <span className="font-medium break-words">{bookingDetails.email}</span>
                    </p>
                  </div>

                  <div className="flex items-start sm:items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#34c5f1] flex-shrink-0 mt-0.5 sm:mt-0" />
                    <p className="text-xs sm:text-sm text-gray-600 break-words">
                      We'll send you a reminder at <span className="font-medium break-words">{bookingDetails.phone}</span>
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      setShowConfirmation(false)
                      router.push('/')
                    }}
                    className="w-full sm:flex-1 px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base"
                  >
                    Back to Home
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="w-full sm:flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base"
                  >
                    Print
                  </button>
                  <button
                    onClick={downloadReceipt}
                    className="w-full sm:flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-[#34c5f1] to-[#a855f7] text-white rounded-lg hover:from-[#2ba8d0] hover:to-[#9333ea] transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>Download Receipt</span>
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