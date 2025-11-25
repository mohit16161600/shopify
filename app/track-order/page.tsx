'use client';

import { useState, useEffect, useRef } from 'react';
import TopBanner from "@/app/components/Home/header/TopBanner";
import MainHeader from "@/app/components/Home/header/MainHeader";
import Footer from "@/app/components/Footer";
import ProductCard from "@/app/components/Home/ProductCard";
// import { products } from "@/app/lib/bestseller";

export default function TrackOrderPage() {
    const [awb, setAwb] = useState('');
    const [isTracking, setIsTracking] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products?category=Best%20Sellers');
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let animationFrameId: number;

        const scroll = () => {
            if (!isPaused && scrollContainer) {
                if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
                    scrollContainer.scrollLeft = 0;
                } else {
                    scrollContainer.scrollLeft += 1;
                }
            }
            animationFrameId = requestAnimationFrame(scroll);
        };

        animationFrameId = requestAnimationFrame(scroll);

        return () => cancelAnimationFrame(animationFrameId);
    }, [isPaused]);

    const handleTrack = (e: React.FormEvent) => {
        e.preventDefault();
        if (!awb.trim()) return;

        setIsTracking(true);
        // Simulate API call
        setTimeout(() => {
            setIsTracking(false);
            alert(`Tracking details for AWB: ${awb}\nStatus: In Transit (Mock Data)`);
        }, 1500);
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <TopBanner />
            <MainHeader />

            {/* Hero / Tracking Section */}
            <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                {/* Abstract Background Shapes */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
                    <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-green-500 blur-3xl"></div>
                    <div className="absolute top-1/2 right-0 w-64 h-64 rounded-full bg-blue-500 blur-3xl"></div>
                </div>

                <div className="relative max-w-3xl mx-auto text-center z-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                        Track Your Order
                    </h1>
                    <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
                        Enter your AWB number below to get real-time updates on your shipment's journey.
                    </p>

                    <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                        <input
                            type="text"
                            placeholder="Enter AWB Number (e.g., 123456789)"
                            value={awb}
                            onChange={(e) => setAwb(e.target.value)}
                            className="flex-1 px-6 py-4 rounded-xl border-2 border-transparent focus:border-green-500 focus:ring-0 bg-white/10 text-white placeholder-gray-400 backdrop-blur-sm transition-all outline-none text-lg"
                            required
                        />
                        <button
                            type="submit"
                            disabled={isTracking}
                            className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl shadow-lg shadow-green-600/30 transition-all transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 text-lg whitespace-nowrap"
                        >
                            {isTracking ? 'Tracking...' : 'Track Order'}
                        </button>
                    </form>
                </div>
            </section>

            {/* Product Showcase Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">You Might Also Like</h2>
                        <p className="text-gray-500 mt-2">Discover our best-selling favorites</p>
                    </div>
                    <div className="h-1 flex-1 bg-gray-200 ml-8 rounded-full hidden md:block"></div>
                </div>

                <div className="relative w-full">
                    <div
                        ref={scrollRef}
                        className="flex gap-6 overflow-x-auto  pb-4"
                        onMouseEnter={() => setIsPaused(false)}
                        onMouseLeave={() => setIsPaused(false)}
                        onTouchStart={() => setIsPaused(true)}
                        onTouchEnd={() => setIsPaused(false)}
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {/* Original List */}
                        {products.map((p) => (
                            <div key={`original-${p.id}`} className="max-w-[250px] md:max-w-[300px] flex-shrink-0 ">
                                <ProductCard item={p} />
                            </div>
                        ))}
                        {/* Duplicated List for Seamless Loop */}
                        {products.map((p) => (
                            <div key={`duplicate-${p.id}`} className="max-w-[250px] md:max-w-[300px] flex-shrink-0">
                                <ProductCard item={p} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
