'use client';
import { useState, useEffect } from "react";

export default function YoutubeEmbed({ videoId }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Extract video ID if a full URL is provided
  const extractVideoId = (urlOrId) => {
    if (!urlOrId) return null;
    
    // If it's already just an ID (no slashes or special chars), return as is
    if (!urlOrId.includes('/') && !urlOrId.includes('?')) {
      return urlOrId;
    }
    
    // Extract from various YouTube URL formats
    const patterns = [
      /(?:youtube\.com\/embed\/|youtu\.be\/|youtube\.com\/watch\?v=)([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/,
    ];
    
    for (const pattern of patterns) {
      const match = urlOrId.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    
    return urlOrId;
  };

  const cleanVideoId = extractVideoId(videoId);

  if (!cleanVideoId) {
    return (
      <div className="flex items-center justify-center h-[350px] bg-gray-100 rounded text-gray-500">
        Invalid video ID
      </div>
    );
  }

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-[350px] bg-gray-100 rounded">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  // Use iframe directly - more reliable than react-youtube
  return (
    <div className="w-full h-[350px] rounded overflow-hidden bg-gray-100">
      <iframe
        width="150"
        height="350"
        src={`https://www.youtube.com/embed/${cleanVideoId}?rel=0&modestbranding=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
}
