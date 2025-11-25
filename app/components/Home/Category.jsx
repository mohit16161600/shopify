'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Import Swiper's styles
import styles from '@/app/CategorySelector.module.css'; // Import custom styles
import { Autoplay } from 'swiper/modules';

const CategorySelector = () => {
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

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
            slidesPerView: 5, // Show 2 slides on medium screens
          },
          1024: {
            slidesPerView: 5, // Show 3 slides on larger screens
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
