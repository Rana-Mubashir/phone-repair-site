"use client"

import { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"

function CounterCard({ data }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })
  const [count, setCount] = useState(0)
  const targetCount = data?.endCount

  useEffect(() => {
    if (inView) {
      let start = data?.startCount
      const duration = 2000 // 2 seconds
      const increment = Math.ceil((targetCount - start) / (duration / 16))

      const timer = setInterval(() => {
        start = Math.min(start + increment, targetCount)
        setCount(start)
        if (start >= targetCount) {
          clearInterval(timer)
        }
      }, 16)

      return () => clearInterval(timer)
    }
  }, [inView, targetCount, data?.startCount])

  return (
    <div
      ref={ref}
      className="flex flex-col justify-center items-center p-4 rounded-md bg-[#152344]/90 border-b-2 border-blue-500 transition-all duration-300 hover:translate-y-[-2px]"
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg text-blue-400">{data?.icon}</span>
        <p className="text-3xl font-bold text-white">
          {count}
          <span className="text-blue-400">+</span>
        </p>
      </div>
      <p className="text-lg font-medium text-white text-center">{data?.text}</p>
    </div>
  )
}

export default CounterCard
