"use client";

import { useEffect, useState, useRef } from "react";
import { COLLECTION_ADDRESS } from "@/lib/consts";
import { publicClient } from "@/lib/viem";
import { ipfsToGateway } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";

interface SongMetadata {
  name: string;
  image: string;
  animationUrl: string;
}

export function SongMetadata() {
  const [metadata, setMetadata] = useState<SongMetadata | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        // Get token URI from contract
        const uri = await publicClient.readContract({
          address: COLLECTION_ADDRESS,
          abi: [
            {
              inputs: [{ name: "tokenId", type: "uint256" }],
              name: "uri",
              outputs: [{ name: "", type: "string" }],
              stateMutability: "view",
              type: "function",
            },
          ],
          functionName: "uri",
          args: [BigInt(1)], // tokenId 1
        });

        console.log("song metadata uri", uri);

        // Convert IPFS URI to gateway URL
        const gatewayUrl = ipfsToGateway(uri as string);
        console.log("song metadata gateway url", gatewayUrl);

        // Fetch metadata from IPFS gateway
        const response = await fetch(gatewayUrl);
        const data = await response.json();
        console.log("song metadata data", data);

        // Convert IPFS URIs in metadata to gateway URLs
        const processedMetadata = {
          ...data,
          image: ipfsToGateway(data.image),
          animationUrl: ipfsToGateway(data.animation_url),
        };
        console.log("song metadata processedMetadata", processedMetadata);

        setMetadata(processedMetadata);
      } catch (error) {
        console.error("Error fetching song metadata:", error);
      }
    };

    fetchMetadata();
  }, []);

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
        src={metadata.animationUrl}
        onEnded={() => setIsPlaying(false)}
        className="hidden"
      />
    </div>
  );
}
