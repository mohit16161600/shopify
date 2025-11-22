'use client';

import { Swiper, SwiperSlide } from 'swiper/react';

import { Autoplay } from 'swiper/modules';
import 'swiper/css/bundle';  // Correct path for Swiper v12 CSS


export default function HeroSection() {
  return (
    <div className="relative w-full h-auto ">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={10} // space between slides
        slidesPerView={1} // show one slide at a time
        loop={true} // loop the slider
        autoplay={{
          delay: 3000, // change slide every 3 seconds
          disableOnInteraction: false, // allow autoplay even after user interacts
        }}
      >
        {/* Hero Slide 1 */}
        <SwiperSlide>
          <picture>
            <source srcSet="/image/Banner_1_Mobile.jpg" media="(max-width: 768px)" />
            <img src="/image/Banner_1.webp" alt="Hero Section 1" className="w-full h-full object-cover" />
          </picture>
        </SwiperSlide>
        {/* Hero Slide 2 */}
        <SwiperSlide>
          <picture>
            <source srcSet="/image/Mobile_HerCycle_Banner.jpg" media="(max-width: 768px)" />
            <img src="/image/Banner-Hercycle.webp" alt="Hero Section 1" className="w-full h-full object-cover" />
          </picture>
        </SwiperSlide>
        {/* Hero Slide 3 */}
        <SwiperSlide>
          <picture>
            <source srcSet="/image/Banner_2_Mobile.jpg" media="(max-width: 768px)" />
            <img src="/image/Banner_2.webp" alt="Hero Section 1" className="w-full h-full object-cover" />
          </picture>
        </SwiperSlide>
        {/* Hero Slide 4 */}
        <SwiperSlide>
          <picture>
            <source srcSet="/image/Banner_Mobile_copy_2.jpg" media="(max-width: 768px)" />
            <img src="/image/Banner_copy_2.webp" alt="Hero Section 1" className="w-full h-full object-cover" />
          </picture>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
