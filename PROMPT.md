````markdown
# Base Voting Mini App - LLM Generation Prompt

## 1. Role & Objective
You are an expert Web3 developer specializing in **Base**, **Next.js (App Router)**, **OnchainKit**, and **Shadcn UI**. 
Your task is to build a "Voting Mini App" optimized for the Base network and Farcaster Frames.

## 2. Documentation Context
Use the following resources for API reference and best practices:
- **Base Mini Apps:** https://docs.base.org/mini-apps/llms-full.txt
- **OnchainKit:** https://docs.base.org/onchainkit/getting-started
- **Shadcn UI:** https://ui.shadcn.com/llms.txt

## 3. Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS + Shadcn UI
- **Blockchain Interaction:** OnchainKit, Wagmi, Viem
- **Network:** Base Sepolia (Chain ID: 84532)

## 4. Smart Contract Architecture
Assume the smart contract is deployed on Base Sepolia.
**Structure Reference:**
```solidity
struct Poll {
    string title;       // Max 50 chars
    string description; // Max 280 chars
    uint256 yesVotes;
    uint256 noVotes;
    uint256 creatorFid;
    bool isOpen;
}
// Functions:
// createPoll(string title, string description, uint256 creatorFid)
// vote(uint256 pollId, bool voteYes, uint256 voterFid)
````

## 5\. UI Component Requirements

### A. Global Layout (`components/Navbar.tsx`)

Create a responsive Navbar that handles wallet connection automatically using OnchainKit.
**Reference Implementation:**

```tsx
import { 
  ConnectWallet, Wallet, WalletDropdown, 
  WalletDropdownLink, WalletDropdownDisconnect 
} from '@coinbase/onchainkit/wallet';
import { 
  Address, Avatar, Name, Identity, EthBalance 
} from '@coinbase/onchainkit/identity';

export default function Navbar() {
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <h1 className="text-xl font-bold">VOTE APP</h1>
      <div className="flex gap-2">
        <Wallet>
          <ConnectWallet>
            <Avatar className="h-6 w-6" />
            <Name />
          </ConnectWallet>
          <WalletDropdown>
            <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
              <Avatar />
              <Name />
              <Address />
              <EthBalance />
            </Identity>
            <WalletDropdownLink icon="wallet" href="[https://keys.coinbase.com](https://keys.coinbase.com)">Wallet</WalletDropdownLink>
            <WalletDropdownDisconnect />
          </WalletDropdown>
        </Wallet>
      </div>
    </div>
  );
}
```

### B. Create Poll Form (`components/CreatePoll.tsx`)

Use Shadcn `Input` and `Textarea` for fields, and OnchainKit `<Transaction />` for the submit action.
**Constraints:** - Title: Max 50 chars.

  - Description: Max 280 chars.
  - Reset form on "success" status.

**Reference Implementation:**

```tsx
import { 
  Transaction, TransactionButton, TransactionStatus, 
  TransactionStatusLabel, TransactionStatusAction 
} from '@coinbase/onchainkit/transaction';

// Inside component:
<Transaction chainId={84532} calls={[createPollCall]} onStatus={handleStatus}>
  <TransactionButton text="Create Poll" />
  <TransactionStatus>
    <TransactionStatusLabel />
    <TransactionStatusAction />
  </TransactionStatus>
</Transaction>
```

### C. Poll Card (`components/PollCard.tsx`)

Display poll details. Use two separate `<Transaction />` components for voting actions.

  - **Vote Yes Button:** Green color scheme.
  - **Vote No Button:** Red color scheme.
  - Show current vote counts clearly.

## 6\. Implementation Instructions

1.  **Providers:** Create a `providers.tsx` file wrapping the app with `WagmiProvider`, `QueryClientProvider`, and `OnchainKitProvider`. Use `baseSepolia` as the active chain.
2.  **Manifest:** Ensure `public/.well-known/farcaster.json` is created with basic metadata.
3.  **Wagmi Config:** Use `coinbaseWallet` preference to ensure seamless Mini App auto-connection.
4.  **Styling:** Use a clean, mobile-first layout suitable for embedding in Farcaster.
5.  **Simplicity:** Do not use IPFS. Read/Write directly to the contract (assume `calldata` usage for gas efficiency).

## 7\. Output Request

Generate the following files:

1.  `app/layout.tsx` (Providers setup)
2.  `app/page.tsx` (Main feed combining components)
3.  `components/CreatePoll.tsx`
4.  `components/PollCard.tsx`
5.  `lib/contract.ts` (ABI and Address placeholders)

<!-- end list -->

```
```