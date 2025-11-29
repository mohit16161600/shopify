'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface Review {
    id: number;
    pro_name: string;
    cust_name: string;
    pro_image: string;
    star: number;
    content: string;
}

export default function CustomerReviews() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await fetch('/api/reviews');
                if (res.ok) {
                    const data = await res.json();
                    setReviews(data);
                }
            } catch (error) {
                console.error('Failed to fetch reviews:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, []);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer || reviews.length === 0) return;

        const scroll = () => {
            if (scrollContainer) {
                const cardWidth = 320; // Approx card width + gap
                const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;

                if (scrollContainer.scrollLeft >= maxScrollLeft - 10) {
                    scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    scrollContainer.scrollBy({ left: cardWidth, behavior: 'smooth' });
                }
            }
        };

        const interval = setInterval(scroll, 3000);
        return () => clearInterval(interval);
    }, [reviews]);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
        }
    };

    if (loading) return <div className="py-10 text-center">Loading reviews...</div>;
    if (reviews.length === 0) return null;

    return (
        <div className="py-16 bg-white relative">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                    Our Satisfied Customers Testimonial
                </h2>

                <div className="relative flex items-center">
                    {/* Left Arrow */}
                    <button
                        onClick={scrollLeft}
                        className="absolute left-0 z-10 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-gray-50 hidden md:block -ml-4"
                    >
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Carousel Container */}
                    <div
                        ref={scrollRef}
                        className="flex overflow-x-auto gap-6 pb-8 hide-scrollbar snap-x snap-mandatory scroll-smooth"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {reviews.map((review) => (
                            <div
                                key={review.id}
                                className="flex-shrink-0 w-[300px] md:w-[350px] bg-green-50 rounded-xl p-6 relative mt-12 snap-center"
                            >
                                {/* Product Image Circle */}
                                <div className="absolute -top-10 right-6 w-25 h-25 rounded-full bg-white p-1 flex items-center justify-center ">
                                    <div className="relative w-full h-full rounded-full overflow-hidden">
                                        {/* Fallback for image if path is placeholder */}
                                        <Image
                                            src={review.pro_image}
                                            alt={review.pro_name}
                                            fill
                                            className="object-contain"
                                            onError={(e) => {
                                                // Fallback logic handled by Next.js Image usually requires specific setup, 
                                                // but for now we assume valid paths or placeholders.
                                                // If image fails, it might show broken icon.
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <h3 className="text-xl font-bold text-gray-900 uppercase mb-2 pr-20">
                                        {review.pro_name}
                                    </h3>

                                    <div className="flex mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className={`w-5 h-5 ${i < review.star ? 'text-yellow-400' : 'text-gray-300'}`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>

                                    <p className="text-gray-600 text-sm leading-relaxed mb-6 min-h-[80px]">
                                        {review.content}
                                    </p>

                                    <div className="font-bold text-gray-900">
                                        {review.cust_name}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Arrow */}
                    <button
                        onClick={scrollRight}
                        className="absolute right-0 z-10 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-gray-50 hidden md:block -mr-4"
                    >
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Pagination Dots (Visual only for now or linked to scroll) */}
                <div className="flex justify-center gap-2 mt-8">
                    {reviews.map((_, i) => (
                        <div key={i} className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-gray-800' : 'bg-gray-300'}`}></div>
                    ))}
                </div>
            </div>
        </div>
    );
}
