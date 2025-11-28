'use client';
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function ShortsPlayer({ video, isPlaying, onPlay, onPause }) {
    const [mounted, setMounted] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.play().catch(e => console.log("Play failed", e));
            } else {
                videoRef.current.pause();
            }
        }
    }, [isPlaying]);

    const togglePlay = () => {
        if (isPlaying) {
            onPause && onPause();
        } else {
            onPlay && onPlay();
        }
    };

    if (!mounted) return <div className="w-[300px] h-[533px] bg-gray-200 rounded-xl animate-pulse" />;

    return (
        <div className="relative w-[300px] h-[533px] bg-black rounded-xl overflow-hidden group shrink-0 snap-center shadow-lg mx-2">
            {/* Video Layer */}
            <div className="absolute inset-0 w-full h-full" onClick={togglePlay}>
                <video
                    ref={videoRef}
                    src={video.video_url}
                    poster={video.thumbnail_image || video.thumbnail_url}
                    className="w-full h-full object-cover"
                    loop
                    playsInline
                />

                {/* Play Button Overlay - Only show when paused */}
                {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-all cursor-pointer">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/50">
                            <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>
                )}
            </div>

            {/* Product Overlay */}
            {video.product_id && (
                <div className="absolute bottom-4 left-4 right-4 z-10">
                    <Link
                        href={`/product/${video.product_id}`}
                        className="block w-full bg-white/90 hover:bg-white backdrop-blur text-black font-semibold py-3 px-4 rounded-lg text-center transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                    >
                        <span>Shop Now</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>
            )}
        </div>
    );
}
