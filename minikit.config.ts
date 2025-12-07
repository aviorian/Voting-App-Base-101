const ROOT_URL =
  process.env.NEXT_PUBLIC_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000');

/**
 * MiniApp configuration object. Must follow the Farcaster MiniApp specification.
 *
 * @see {@link https://miniapps.farcaster.xyz/docs/guides/publishing}
 */
export const minikitConfig = {
 
accountAssociation: {
    header: "eyJmaWQiOjExNDU5NTEsInR5cGUiOiJhdXRoIiwia2V5IjoiMHg2OTJENDI0RkM2NDI2NUU2QjVDMjBjQkFiMjk1Mzk5ZDQ0MzMxNTg2In0",
    payload: "eyJkb21haW4iOiJ2b3RpbmctYXBwLWJhc2UtMTAxLnZlcmNlbC5hcHAifQ",
    signature: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABH3C9ucA09EQtjXfysDXl6-nCIPhwMBY8goLtO36POtwVIXtNvoKtZcgHprQOqld2a5r43B3S6ecoTyY8QxoJvgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAl8ZgIay2xclZzG8RWZzuWvO8j9R0fus3XxDee9lRlVy8dAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACKeyJ0eXBlIjoid2ViYXV0aG4uZ2V0IiwiY2hhbGxlbmdlIjoiaVU3dVgtbkVJTDgzdXdRMklwUG9fSTV5T3F5RGE1V3B4TURZU0RsWFJFZyIsIm9yaWdpbiI6Imh0dHBzOi8va2V5cy5jb2luYmFzZS5jb20iLCJjcm9zc09yaWdpbiI6ZmFsc2V9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
  },

  baseBuilder: {
    "ownerAddress": "0x692D424FC64265E6B5C20cBAb295399d44331586"
  },

  miniapp: {
    version: "1",
    name: "Vote for Fun", 
    subtitle: "Voting Mini App", 
    description: "A simple mini app that allows users to create and vote in polls on-chain. By Trio Blockchain Labs.",
    screenshotUrls: [],
    iconUrl: `${ROOT_URL}/blue-icon.png`,
    splashImageUrl: `${ROOT_URL}/blue-hero.png`,
    splashBackgroundColor: "#FFFFFF",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "entertainment",
    tags: ["social","entertainment"],
    heroImageUrl: `${ROOT_URL}/blue-hero.png`, 
    tagline: "On-Chain Polls Made Easy",
    ogTitle: "Vote for Fun",
    ogDescription: "A simple mini app that allows users to create and vote in polls on-chain. By Trio Blockchain Labs",
    ogImageUrl: `${ROOT_URL}/blue-hero.png`,
  },
} as const;

