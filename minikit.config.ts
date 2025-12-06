const ROOT_URL =
  process.env.NEXT_PUBLIC_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000');

/**
 * MiniApp configuration object. Must follow the Farcaster MiniApp specification.
 *
 * @see {@link https://miniapps.farcaster.xyz/docs/guides/publishing}
 */
export const minikitConfig = {
 

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

