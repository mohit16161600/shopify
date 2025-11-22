import YoutubeEmbed from "./YoutubeEmbed"; // or YoutubeEmbed
import { videos } from "@/app/lib/WatchAndShop";

export default function WatchAndShop() {
  return (
    <div className="scroll-container">
      {videos.map((v, i) => (
        <div key={i} className="video-wrapper">
          <YoutubeEmbed videoId={v.id} />
        </div>
      ))}
    </div>
  );
}
