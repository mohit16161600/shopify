'use client';
import { useState, useEffect } from "react";
import ShortsPlayer from "./ShortsPlayer";


export default function WatchAndShop() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playingVideoId, setPlayingVideoId] = useState(null);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch('/api/shoppable-videos');
        if (res.ok) {
          const data = await res.json();
          setVideos(data);
        }
      } catch (error) {
        console.error("Failed to fetch videos", error);
      } finally {
        setLoading(false);
      }
    }
    fetchVideos();
  }, []);

  if (loading) return <div className="py-10 text-center">Loading Shoppable Videos...</div>;
  if (videos.length === 0) return null;

  return (

    <div className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Watch & Shop</h2>
      </div>

      <div className="flex overflow-x-auto pb-8 px-4 gap-4 snap-x scrollbar-hide">
        {videos.map((video) => (
          <ShortsPlayer
            key={video.id}
            video={video}
            isPlaying={playingVideoId === video.id}
            onPlay={() => setPlayingVideoId(video.id)}
            onPause={() => setPlayingVideoId(null)}
          />
        ))}
      </div>
    </div>
  );
}
