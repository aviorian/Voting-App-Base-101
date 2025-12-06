# 🗳️ Base Voting Mini App

A decentralized, mobile-first voting application built for the **Base** network and optimized for **Farcaster Frames**.

This Mini App allows users to create polls, cast votes on-chain, and view real-time results in a seamless, native-like interface. Built with **OnchainKit**, **Next.js**, and **Wagmi**.

## ✨ Features

- **Create Polls:** Users can launch new polls with a title and description directly on-chain.
- **Vote On-Chain:** Secure, immutable voting (Yes/No) recorded on the Base Sepolia network.
- **Real-Time Results:** Live progress bars showing community sentiment.
- **Smart Wallet Integration:** Seamless onboarding and interaction using Coinbase Smart Wallet.
- **Mobile-First UX:** Tabbed navigation and responsive design tailored for Farcaster mobile users.
- **Duplicate Vote Prevention:** Smart contract logic ensures one vote per FID (Farcaster ID).

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Blockchain SDK:** [OnchainKit](https://onchainkit.xyz/) & [Wagmi](https://wagmi.sh/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [Lucide React](https://lucide.dev/)
- **Network:** Base Sepolia Testnet
- **Smart Contract:** Solidity (Custom Voting Contract)

## 🚀 How It Works

1.  **Connect:** Users connect their wallet (automatically handled via OnchainKit/MiniKit in Farcaster).
2.  **Read:** The app fetches the list of active polls and the user's voting status directly from the smart contract using `useReadContract`.
3.  **Interact:**
    *   **Creating:** Submits a `createPoll` transaction to the blockchain.
    *   **Voting:** Submits a `vote` transaction. The UI updates optimistically or upon transaction confirmation.
4.  **Verify:** All data is stored on-chain, ensuring transparency and immutability.

## 🏁 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd mini-app-quickstart-template
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_cdp_api_key
```

*Get your API Key from the [Coinbase Developer Platform](https://portal.cdp.coinbase.com/).*

### 4. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 📜 Smart Contract

The application interacts with a `SimpleVoting` contract deployed on **Base Sepolia**.

*   **Contract Address:** `0x8269db0F48590229a1314906B8725F03F0A91bdC` (Check `lib/contract.ts` for the latest)
*   **Key Functions:**
    *   `createPoll(string title, string description, uint256 creatorFid)`
    *   `vote(uint256 pollId, bool voteYes, uint256 voterFid)`
    *   `getAllPolls()`
    *   `getUserVotedStatus(uint256 voterFid)`

## 📱 Screenshots

| Poll List | Create Poll |
|:---:|:---:|
| *List of active polls with results* | *Form to create a new on-chain poll* |

---

*Built with 💙 on Base*
