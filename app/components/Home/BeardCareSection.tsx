'use client';

import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

export default function BeardCareSection() {
    const [products, setProducts] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // IDs provided by user: 8142701822260, 9149225337140, 9062256378164
                const ids = '8142701822260,9149225337140,9062256378164';
                const response = await fetch(`/api/products?ids=${encodeURIComponent(ids)}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log('Beard Care Products:', data);
                    setProducts(data);
                }
            } catch (error) {
                console.error('Error fetching beard care products:', error);
            }
        };

        fetchProducts();
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
    };

    if (products.length === 0) {
        return null;
    }

    return (
        <section className="container mx-auto px-4 py-12 bg-black text-white rounded-xl my-8 overflow-hidden">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                {/* Left Side - Static Image */}
                <div className="w-full md:w-1/2">
                    <img
                        src="/image/Bearrd_Photo.webp"
                        alt="Beard Care"
                        className="w-full h-auto object-cover rounded-lg shadow-lg"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://placehold.co/600x600?text=Beard+Care';
                        }}
                    />
                </div>

                {/* Right Side - Product Carousel */}
                <div className="w-full md:w-1/2 flex flex-col items-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">Because a King Deserves a Crown</h2>
                    <p className="text-green-400 mb-8 text-center">Premium Beard Care Collection</p>

                    <div className="relative w-full max-w-sm">
                        {/* Navigation Arrows */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 p-2 text-white hover:text-green-400 transition"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>

                        <button
                            onClick={nextSlide}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 p-2 text-white hover:text-green-400 transition"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>

                        <div className="bg-white rounded-xl p-4 text-gray-900">
                            <ProductCard item={products[currentIndex]} />
                        </div>

                        {/* Dots Indicator */}
                        <div className="flex justify-center gap-2 mt-4">
                            {products.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`w-2 h-2 rounded-full transition-all ${currentIndex === idx ? 'bg-green-500 w-4' : 'bg-gray-600'
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
