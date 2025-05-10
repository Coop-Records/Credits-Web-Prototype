export const IS_PROD = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";
export const CREDITS_PROTOCOL_ADDRESS = IS_PROD
  ? "0xc168b5f0549afbf40052f60b86d1a1a896612646"
  : "0x2d8CF3A448b75Bbc25cEC322be1224A9f8584115";

export const CROSSMINT_COLLECTION_ID = IS_PROD
  ? "89800b70-e2b3-41ae-bf2f-5b7638c9fc07"
  : "54b397c6-0e56-4404-bcda-876a338e29e5";

export const COLLECTION_ADDRESS = IS_PROD
  ? "0xEC770b2F20eaF7cb64bf2f6531c83979384711Fb"
  : "0xb41fe7623fcca3bb81df08d221e6d9d5fc496fb5";

export const PAYMASTER_URL = `https://api.developer.coinbase.com/rpc/v1/${
  IS_PROD ? "base" : "base-sepolia"
}/${process.env.CDP_PAYMASTER_KEY}`;
