export const IS_PROD = process.env.VERCEL_ENV === "production";
export const CREDITS_PROTOCOL_ADDRESS = IS_PROD
  ? "0xc168b5f0549afbf40052f60b86d1a1a896612646"
  : "0x019d5E4BcF1804265AFD084777a700B1aEdf47c9";

export const CROSSMINT_COLLECTION_ID = IS_PROD
  ? "eb5d5aee-a691-4602-a196-cac6a940d6ec"
  : "54b397c6-0e56-4404-bcda-876a338e29e5";
