"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode, Autoplay } from "swiper/modules";

const brands = [
    { id: 1, img: "https://tk.commonsupport.com/repairplus/wp-content/uploads/2017/02/4.jpg.webp" },
    { id: 2, img: "https://tk.commonsupport.com/repairplus/wp-content/uploads/2017/02/5.jpg.webp" },
    { id: 3, img: "https://tk.commonsupport.com/repairplus/wp-content/uploads/2017/02/2-3.jpg.webp" },
    { id: 4, img: "https://tk.commonsupport.com/repairplus/wp-content/uploads/2017/02/4.jpg.webp" },
    { id: 5, img: "https://tk.commonsupport.com/repairplus/wp-content/uploads/2017/02/1-3.jpg.webp" },
    { id: 6, img: "https://tk.commonsupport.com/repairplus/wp-content/uploads/2017/02/4.jpg.webp" },
    { id: 7, img: "https://tk.commonsupport.com/repairplus/wp-content/uploads/2017/02/5.jpg.webp" },
];

function Main() {
    return (
        <div className="py-10 mt-12 bg-gray-100">
            <Swiper
                slidesPerView={5}
                // spaceBetween={30}
                loop={true}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                freeMode={true}
                modules={[FreeMode, Autoplay]}
                breakpoints={{
                    640: { slidesPerView: 5 },
                    768: { slidesPerView: 5 },
                    1024: { slidesPerView: 5 },
                }}
                className=" "
            >
                {brands.map((brand) => (
                    <SwiperSlide key={brand.id} className="flex justify-between">
                        <img src={brand.img} alt="brand logo" className=" w-auto transition duration-300" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default Main;
