function TopBanner({ categoryName }) {
    return (
      <div className="bg-gradient-to-r from-blue-200 to-blue-100 px-4 py-8 md:py-12">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex flex-col gap-4 text-center md:text-left max-w-lg mb-8 md:mb-0">
              <div className="relative inline-block">
                <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl">Express</h1>
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-[#34c5f1] rounded-full md:block hidden"></div>
              </div>
              <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-[#34c5f1] animate-fade-in">
                {categoryName || "Device"} Repairs
              </h1>
              <p className="text-xl text-gray-700 mt-2">
                Select Your Device Brand
                <span className="inline-block ml-2 animate-bounce">👇</span>
              </p>
              <div className="hidden md:block">
                <div className="mt-6 inline-block bg-white px-6 py-3 rounded-full shadow-md">
                  <span className="text-sm font-medium text-gray-600">Fast Repairs</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm font-medium text-gray-600">Quality Service</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm font-medium text-gray-600">Expert Technicians</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#34c5f1] to-blue-300 rounded-full blur opacity-30 animate-pulse"></div>
              <div className="relative bg-white rounded-full p-4 shadow-lg">
                <img
                  src="https://cdn.accentuate.io/228383431/4070909739097/phones-v1572602955633.png?480x480"
                  alt="Phones"
                  className="h-56 w-56 md:h-64 md:w-64 lg:h-80 lg:w-80 object-contain transform transition-transform hover:scale-105 duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default TopBanner
  
  