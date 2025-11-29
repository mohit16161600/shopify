'use client';

import { useState, useEffect } from 'react';

export default function DoctorSection() {
    const [doctors, setDoctors] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch('/api/doctors');
                if (response.ok) {
                    const data = await response.json();
                    setDoctors(data);
                }
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        fetchDoctors();
    }, []);

    useEffect(() => {
        if (doctors.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % doctors.length);
        }, 10000); // Auto-scroll every 5 seconds

        return () => clearInterval(interval);
    }, [doctors]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % doctors.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + doctors.length) % doctors.length);
    };

    if (doctors.length === 0) {
        return null; // Don't render if no data
    }

    const currentDoctor = doctors[currentIndex];

    return (
        <section className="container mx-auto px-4 py-12">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Our Best Doctors</h2>

            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                {/* Left Side - Static Image */}
                <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                    {/* Using a placeholder if the specific image is not found, user can replace path */}
                    <img
                        src="/image/doctor/Doctor_copy.webp"
                        alt="Our Doctors Team"
                        className="w-full max-w-lg object-contain"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Doctors+Team';
                        }}
                    />
                </div>

                {/* Right Side - Carousel */}
                <div className="w-full md:w-1/2 flex justify-center md:justify-start">
                    <div className="relative w-full max-w-sm">
                        {/* Navigation Arrows */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 p-2 text-gray-800 hover:text-green-600 transition"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>

                        <button
                            onClick={nextSlide}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 p-2 text-gray-800 hover:text-green-600 transition"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>

                        {/* Card Content */}
                        <div className="bg-white rounded-lg p-6 text-center">
                            <div className="mb-2 relative inline-block">
                                <img
                                    src={currentDoctor.image}
                                    alt={currentDoctor.name}
                                    className="w-20 h-20 md:w-44 md:h-44 object-cover rounded-lg mx-auto shadow-md"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-green-700 text-white text-xs font-bold py-1 px-2 rounded-b-lg uppercase">
                                    {currentDoctor.name} ({currentDoctor.post})
                                </div>
                            </div>

                            <div className="flex justify-center gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill={i < currentDoctor.star ? "#EAB308" : "#D1D5DB"}
                                        className="w-6 h-6"
                                    >
                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                    </svg>
                                ))}
                            </div>

                            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
                                {currentDoctor.detail}
                            </p>

                            <div className="text-left">
                                <h3 className="font-bold text-gray-900 text-lg">{currentDoctor.name}</h3>
                                <p className="text-gray-500 text-sm">{currentDoctor.post}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
