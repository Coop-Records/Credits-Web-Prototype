import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ipfsToGateway(ipfsUri: string): string {
  if (!ipfsUri.startsWith("ipfs://")) return ipfsUri;
  const hash = ipfsUri.replace("ipfs://", "");
  return `https://ipfs.io/ipfs/${hash}`;
}
