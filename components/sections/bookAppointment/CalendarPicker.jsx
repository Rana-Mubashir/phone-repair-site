'use client'

import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, AlertCircle, Calendar as CalendarIcon } from 'lucide-react'

const CalendarPicker = ({ value, onChange, errors, minDate = null }) => {
  const [currentMonth, setCurrentMonth] = useState(() => {
    if (value) {
      return new Date(value)
    }
    return new Date()
  })

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const isDateDisabled = (year, month, day) => {
    const date = new Date(year, month, day)
    date.setHours(0, 0, 0, 0)
    
    // Disable past dates
    if (date < today) return true
    
    // Disable dates beyond 60 days
    const maxDate = new Date(today)
    maxDate.setDate(maxDate.getDate() + 60)
    if (date > maxDate) return true
    
    // Disable Sundays
    if (date.getDay() === 0) return true
    
    return false
  }

  const isDateSelected = (year, month, day) => {
    if (!value) return false
    const selectedDate = new Date(value)
    return (
      selectedDate.getFullYear() === year &&
      selectedDate.getMonth() === month &&
      selectedDate.getDate() === day
    )
  }

  const handleDateClick = (year, month, day) => {
    // Format date string without timezone conversion issues
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    onChange(dateString)
  }

  const monthName = currentMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' })
  const daysInMonth = getDaysInMonth(currentMonth)
  const firstDay = getFirstDayOfMonth(currentMonth)
  const days = []

  // Add empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }

  // Add days of month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day)
  }

  return (
    <div>
      <label className="block text-gray-700 font-medium mb-4">
        Appointment Date <span className="text-red-500">*</span>
      </label>

      <div className="bg-white border-2 border-gray-200 rounded-lg p-4 sm:p-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          <h3 className="text-lg font-semibold text-gray-800 min-w-fit px-4">
            {monthName}
          </h3>

          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Day names */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center font-medium text-gray-600 text-sm py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => {
            const isDisabled = day && isDateDisabled(currentMonth.getFullYear(), currentMonth.getMonth(), day)
            const isSelected = day && isDateSelected(currentMonth.getFullYear(), currentMonth.getMonth(), day)
            const isToday = day && new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).getTime() === today.getTime()

            return (
              <button
                key={index}
                onClick={() => {
                  if (day && !isDisabled) {
                    handleDateClick(currentMonth.getFullYear(), currentMonth.getMonth(), day)
                  }
                }}
                disabled={isDisabled}
                className={`
                  aspect-square rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center
                  ${!day
                    ? 'cursor-default'
                    : isSelected
                    ? 'bg-gradient-to-r from-[#34c5f1] to-[#a855f7] text-white shadow-lg shadow-[#34c5f1]/30 scale-105'
                    : isDisabled
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : isToday
                    ? 'bg-blue-100 text-[#34c5f1] border-2 border-[#34c5f1] hover:bg-blue-200'
                    : 'bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-[#34c5f1] hover:bg-blue-50 active:scale-95'
                  }
                `}
              >
                {day && (
                  <span className="relative">
                    {day}
                    {isToday && !isSelected && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#34c5f1] rounded-full"></div>
                    )}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Info message */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs sm:text-sm text-gray-600 flex items-start gap-2">
            <CalendarIcon className="w-4 h-4 text-[#34c5f1] flex-shrink-0 mt-0.5" />
            <span>
              <span className="font-medium">Available:</span> Next 60 days (excluding Sundays)
            </span>
          </p>
        </div>
      </div>

      {errors && (
        <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" /> {errors}
        </p>
      )}
    </div>
  )
}

export default CalendarPicker
