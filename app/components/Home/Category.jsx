'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Import Swiper's styles
import styles from '@/app/CategorySelector.module.css'; // Import custom styles
import { Autoplay } from 'swiper/modules';

const categories = [
  { name: "Hypertension Care", image: "/images/daily-wellness.jpg" },
  { name: "Beard Growth Care", image: "/images/gym-foods.jpg" },
  { name: "Energy & Vitality Care", image: "/images/heart-care.jpg" },
  { name: "Skin and Hair Care", image: "/images/blood-sugar.jpg" },
  { name: "Diabetes and Blood sugar care", image: "/images/ayurvedic-juices.jpg" },
  { name: "Immunity and Wellness", image: "/images/mens-health.jpg" },
  { name: "Weight Management", image: "/images/weight-management.jpg" },
  { name: "Joint and Muscle Health", image: "/images/skin-care.jpg" },
  { name: "Liver Detox", image: "/images/skin-care.jpg" },
  { name: "Piles Care", image: "/images/skin-care.jpg" }
];

const CategorySelector = () => {
  return (
    <div className={styles.categoryContainer}>
      <h3 className={styles.h3}>Select Concern:</h3>
      
      {/* Swiper Component for Slider */}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={15} // Space between slides
        slidesPerView={6} // Number of slides visible at a time
        loop={true} // Enable loop for infinite scrolling
        autoplay={{
          delay: 3000, // Automatically change slide every 3 seconds
          disableOnInteraction: false, // Keep autoplay active after user interaction
        }}
        breakpoints={{
          320: {
            slidesPerView: 3, // Show 1 slide on small screens
          },
          768: {
            slidesPerView: 6, // Show 2 slides on medium screens
          },
          1024: {
            slidesPerView: 6, // Show 3 slides on larger screens
          },
        }}
      >
        {/* Map over the categories and render each one inside a SwiperSlide */}
        {categories.map((category, index) => (
          <SwiperSlide key={index}>
            <div className={styles.categoryBox}>
              <img
                src={category.image}
                alt={category.name}
                className={styles.categoryImage}
              />
              <p className={styles.categoryName}>{category.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategorySelector;
