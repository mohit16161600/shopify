'use client';

import { useState, useEffect } from 'react';
import { testimonials } from '@/app/lib/testimonials';

export default function ConsultationTestimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 1000); // Change every second

    return () => clearInterval(interval);
  }, []);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-8 px-5">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Card - Free Video Consultation */}
          <div className="bg-gradient-to-b from-teal-600 to-green-500 rounded-lg p-8 text-white flex flex-col justify-between min-h-[250px]">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-3">
                Free Video Consultation
              </h3>
              <p className="text-lg text-white/90">
                Get a free consultation with our experts.
              </p>
            </div>
            <div className="mt-6">
              <button className="bg-white text-green-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition">
                Book Now
              </button>
            </div>
          </div>

          {/* Right Card - Testimonial */}
          <div className="bg-gray-100 rounded-lg p-8 flex flex-col justify-between min-h-[250px]">
            <div className="flex-1 flex flex-col justify-center items-center text-center">
              <p className="text-gray-700 italic text-lg mb-4">
                &quot;{currentTestimonial.text}&quot;
              </p>
              <p className="text-gray-900 font-bold text-base">
                {currentTestimonial.name}
              </p>
            </div>
            
            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-green-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

