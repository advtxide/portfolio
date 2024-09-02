import { MusicIcon } from "lucide-react";

export default function SpotifyNowListening() {
  return (
    <div className="text-sm flex items-center text-muted-foreground font-medium lg:text-base">
      <span>
        <MusicIcon className="w-3.5 h-3.5 mr-1" />
      </span>
      The Zone - The Weeknd
    </div>
  );
}
