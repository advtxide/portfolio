import { useState, useEffect } from "react";
import { MusicIcon } from "lucide-react";

interface SpotifyData {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
}

function MarqueeText(props: { text: string }) {
  return (
    <div className="text-sm flex items-center text-muted-foreground font-medium lg:text-base overflow-hidden">
      <span>
        <MusicIcon className="w-3.5 h-3.5 mr-1" />
      </span>
      <div className="marquee-container w-40 md:w-56">
        <div className="marquee-content">
          <span>{props.text}</span>
          <span>{props.text}</span>
        </div>
      </div>
    </div>
  );
}

export default function SpotifyNowListening() {
  const [spotifyData, setSpotifyData] = useState<SpotifyData | null>(null);

  useEffect(() => {
    const fetchSpotifyData = async () => {
      try {
        const response = await fetch("/api/spotify-now-playing");
        const data = await response.json();
        setSpotifyData(data);
      } catch (error) {
        console.error("Error fetching Spotify data:", error);
      }
    };

    fetchSpotifyData();
    const interval = setInterval(fetchSpotifyData, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (!spotifyData || !spotifyData?.isPlaying) {
    return <MarqueeText text="Not listening anything..." />;
  }

  const { title, artist } = spotifyData;
  const marqueeText = `${title} - ${artist}`;

  return <MarqueeText text={marqueeText} />;
}
