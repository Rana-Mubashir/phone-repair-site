'use client'

import React, { useState, useEffect } from 'react'
import { Clock, AlertCircle } from 'lucide-react'

const TimeSlotPicker = ({ date, value, onChange, errors, disabled = false }) => {
  const [availableSlots, setAvailableSlots] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!date) {
      setAvailableSlots([])
      return
    }

    setLoading(true)
    
    // Simulate fetching available slots based on date
    // In production, this would call an API
    setTimeout(() => {
      const slots = generateTimeSlots()
      setAvailableSlots(slots)
      setLoading(false)
    }, 300)
  }, [date])

  const generateTimeSlots = () => {
    const slots = []
    const startHour = 9 // 9 AM
    const endHour = 17 // 5 PM
    const slotDuration = 60 // 60 minutes per slot

    for (let hour = startHour; hour < endHour; hour++) {
      const startTime = `${hour.toString().padStart(2, '0')}:00`
      const endTime = `${(hour + 1).toString().padStart(2, '0')}:00`
      const displayTime = formatTimeSlot(hour, hour + 1)
      
      slots.push({
        id: `${hour}:00`,
        displayTime,
        startTime,
        endTime,
        available:true,
      })
    }

    return slots
  }

  const formatTimeSlot = (startHour, endHour) => {
    const start = startHour >= 12 ? `${startHour === 12 ? 12 : startHour - 12}:00 PM` : `${startHour}:00 AM`
    const end = endHour >= 12 ? `${endHour === 12 ? 12 : endHour - 12}:00 PM` : `${endHour}:00 AM`
    return `${start} - ${end}`
  }

  return (
    <div>
      <label className="block text-gray-700 font-medium mb-4">
        Time Slot <span className="text-red-500">*</span>
      </label>

      {loading ? (
        <div className="flex items-center justify-center py-6 bg-gray-50 rounded-lg">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#34c5f1]"></div>
          <span className="ml-2 text-sm text-gray-600">Loading available slots...</span>
        </div>
      ) : !date ? (
        <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <Clock className="w-5 h-5 text-blue-600 flex-shrink-0" />
          <p className="text-sm text-blue-700">Select a date first to view available time slots</p>
        </div>
      ) : availableSlots.length === 0 ? (
        <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <p className="text-sm text-amber-700">No slots available for the selected date</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 mb-4">
            {availableSlots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => onChange(slot.displayTime)}
                disabled={!slot.available || disabled}
                className={`
                  relative px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium text-sm transition-all duration-200
                  ${value === slot.displayTime
                    ? 'bg-gradient-to-r from-[#34c5f1] to-[#a855f7] text-white shadow-lg shadow-[#34c5f1]/30 scale-105'
                    : slot.available
                    ? 'bg-white border-2 border-gray-200 text-gray-700 hover:border-[#34c5f1] hover:bg-blue-50 active:scale-95'
                    : 'bg-gray-100 border-2 border-gray-200 text-gray-400 cursor-not-allowed opacity-60'
                  }
                `}
              >
                <div className="text-center">
                  <div className="whitespace-nowrap text-xs sm:text-sm">{slot.displayTime}</div>
                  {!slot.available && (
                    <div className="text-xs mt-1 opacity-75">Booked</div>
                  )}
                </div>
                {value === slot.displayTime && (
                  <div className="absolute inset-0 rounded-lg pointer-events-none">
                    <div className="absolute inset-0 rounded-lg border-2 border-white/40"></div>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Slot availability summary */}
          <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
            <span>
              <span className="font-medium text-gray-800">
                {availableSlots.filter(s => s.available).length}
              </span>
              {' '}of{' '}
              <span className="font-medium text-gray-800">
                {availableSlots.length}
              </span>
              {' '}slots available
            </span>
            <div className="flex gap-3">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                <span>Booked</span>
              </div>
            </div>
          </div>
        </>
      )}

      {errors && (
        <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" /> {errors}
        </p>
      )}
    </div>
  )
}

export default TimeSlotPicker
