import { useQuery } from "@tanstack/react-query";
import { COLLECTION_ADDRESS } from "@/lib/consts";
import { publicClient } from "@/lib/viem";
import { ipfsToGateway } from "@/lib/utils";
import { SongMetadata } from "@/components/song-metadata";

async function fetchMetadata(): Promise<SongMetadata> {
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
  return {
    ...data,
    image: ipfsToGateway(data.image),
    animation_url: ipfsToGateway(data.animation_url),
  };
}

export function useMetadata() {
  return useQuery({
    queryKey: ["song-metadata"],
    queryFn: fetchMetadata,
  });
}
