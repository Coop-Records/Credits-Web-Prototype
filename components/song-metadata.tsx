"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";

export interface SongMetadata {
  name: string;
  image: string;
  animation_url: string;
}

export function SongMetadata({ metadata }: { metadata?: SongMetadata }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  if (!metadata) {
    return <div className="w-full h-48 bg-gray-100 rounded-lg animate-pulse" />;
  }

  return (
    <div className="w-full space-y-4 items-center flex flex-col">
      <h3 className="text-lg font-semibold text-center">{metadata.name}</h3>

      <div className="relative aspect-square w-48 overflow-hidden rounded-lg group">
        <img
          src={metadata.image}
          alt={metadata.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <Button
            onClick={togglePlay}
            size="icon"
            className="h-12 w-12 rounded-full bg-white/90 hover:bg-white"
          >
            {isPlaying ? (
              <Pause className="h-6 w-6 text-black" />
            ) : (
              <Play className="h-6 w-6 text-black" />
            )}
          </Button>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={metadata.animation_url}
        onEnded={() => setIsPlaying(false)}
        className="hidden"
      />
    </div>
  );
}
