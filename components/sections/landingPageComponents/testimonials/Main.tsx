import React from 'react'
import TestimonialsCard from './TestimonialsCard'

function Main() {
    return (
        <div className='flex flex-col md:flex-row items-center justify-center px-10 py-14 gap-5 '>
            <TestimonialsCard
                name="John Doe"
                position="CEO, Tech Corp"
                image="https://tk.commonsupport.com/repairplus/wp-content/uploads/2017/02/3.png.webp"
                review="This company exceeded my expectations! The quality of service was outstanding."
                rating={5}
            />
            <TestimonialsCard
                name="Jane Smith"
                position="Marketing Director, XYZ Ltd."
                image="https://tk.commonsupport.com/repairplus/wp-content/uploads/2017/02/2.png.webp"
                review="Highly professional and responsive. Would definitely recommend!"
                rating={4}
            />
            <TestimonialsCard
                name="Jane Smith"
                position="Marketing Director, XYZ Ltd."
                image="https://tk.commonsupport.com/repairplus/wp-content/uploads/2017/02/1.png.webp"
                review="Highly professional and responsive. Would definitely recommend!"
                rating={4}
            />
        </div>
    )
}
export default Main
