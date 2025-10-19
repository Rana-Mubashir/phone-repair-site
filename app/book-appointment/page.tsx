import React from 'react'


function page() {
  return (
    <>
      <div>
        <div className="bg-blue-50 py-20 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-extrabold text-blue-700">Book an Appointment</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mt-4">
              Screen Repair for Your iPhone 15 Pro Max
            </h2>
            <p className="text-gray-700 mt-4 text-lg leading-relaxed">
              Get your iPhone screen fixed by professional technicians using high-quality parts.
              We guarantee a fast and hassle-free repair experience, so your device looks and works like new.
            </p>
            <p className="text-gray-700 mt-2 text-lg">
              Don't wait—book your appointment today and restore your iPhone's perfect display!
            </p>
          </div>
        </div>
        <div className="p-16 flex justify-center gap-16">
          <div className="flex flex-col gap-4 w-1/2">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-blue-700 mb-2">Customer Details</h1>
              <p className="text-gray-600">Give Your Information</p>
            </div>
            <div className="flex flex-col gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-1">First Name*</label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  className="p-3 rounded w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Last Name*</label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  className="p-3 rounded w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Email*</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="p-3 rounded w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Confirm Email*</label>
                <input
                  type="email"
                  placeholder="Re-enter your email"
                  className="p-3 rounded w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Phone Number*</label>
                <input
                  type="number"
                  placeholder="Enter your phone number"
                  className="p-3 rounded w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h1 className='font-bold text-3xl'>What Are You Paying...?</h1>
              <p>Iphone 15 Pro Max Screen Repair :<span className='font-bold'>$230</span></p>
              <p>Total Cost :<span className='font-bold'>$230</span></p>
              <button className='p-3 bg-blue-700 rounded-lg text-lg text-white w-fit'>Submit </button>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-1/2">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-blue-700 mb-2">Surgery Options</h1>
              <p className="text-gray-600">How you'll repair your device</p>
            </div>

            {/* Repair Options */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Choose Your Repair Option</h3>
              <div className="space-y-3 mt-3">
                {["Clinic", "Postal Repair", "Collect My Device", "Fix At My Address"].map((option, index) => (
                  <label key={index} className="flex items-center bg-gray-50 p-3 rounded-lg shadow-sm cursor-pointer hover:bg-gray-100 transition">
                    <input type="checkbox" className="w-5 h-5 text-blue-600 rounded-md focus:ring-2 focus:ring-blue-500" />
                    <span className="ml-3 text-gray-700 font-medium">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Select Clinic */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Select Clinic</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white">
                <option>Select a clinic...</option>
                <option>Downtown Clinic</option>
                <option>City Center Repair</option>
                <option>TechFix Hub</option>
              </select>
            </div>

            {/* Date & Time Selection */}
            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Appointment Date</label>
                <input type="date" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Select Time Slot</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white">
                  <option>10:00 AM - 11:00 AM</option>
                  <option>12:00 PM - 1:00 PM</option>
                  <option>2:00 PM - 3:00 PM</option>
                  <option>4:00 PM - 5:00 PM</option>
                </select>
              </div>
            </div>

            {/* Repair Notes */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Repair Notes (Optional)</label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white resize-none"
                rows={3}
                placeholder="Any additional notes about your repair..."
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default page
