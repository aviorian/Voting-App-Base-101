"use client";
import { 
  NFTMintCard, 
} from '@coinbase/onchainkit/nft';
import { NFTMedia } from '@coinbase/onchainkit/nft/view';
import { NFTCollectionTitle, NFTMintButton } from '@coinbase/onchainkit/nft/mint';
import { encodeFunctionData, parseAbi } from 'viem';
import { useAccount } from 'wagmi';

interface PollRewardCardProps {
  pollTitle: string;
  pollId: number;
}

// Replace with your deployed contract address
const REWARD_CONTRACT_ADDRESS = "0x31E6E60786540C3FD1b6337e5832F4f3A60bfbA2"; 

export default function PollRewardCard({ pollTitle, pollId }: PollRewardCardProps) {
  const { address } = useAccount();

  return (
    <div className="mt-6 p-4 border border-purple-100 bg-purple-50 rounded-2xl">
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-purple-900">Thanks for voting! 🎉</h3>
        <p className="text-sm text-purple-700">Claim your proof of participation</p>
      </div>
      
      <div className="rounded-xl overflow-hidden border border-purple-200 shadow-sm bg-white">
        <NFTMintCard 
          contractAddress={REWARD_CONTRACT_ADDRESS}
          tokenId={pollId.toString()}
          buildMintTransaction={async () => {
            if (!address) {
                throw new Error("Wallet not connected");
            }
            // Return the custom call data for our specific contract
            return [{
              to: REWARD_CONTRACT_ADDRESS,
              data: encodeFunctionData({
                abi: parseAbi(["function mint(address to, uint256 id, uint256 amount)"]),
                functionName: "mint",
                args: [address, BigInt(pollId), BigInt(1)]
              }),
              value: BigInt(0)
            }];
          }}
          useNFTData={(contractAddress, tokenId) => {
             return {
                name: `${pollTitle} Badge`,
                description: "Commemorative badge for voting",
                imageUrl: "/icon.png",
                animationUrl: "",
                mimeType: "image/png",
                ownerAddress: undefined,
                contractType: "ERC1155",
                lastSoldPrice: undefined,
                price: { amount: "0", currency: "ETH", amountUSD: "0" },
                mintFee: { amount: "0", currency: "ETH", amountUSD: "0" },
                maxMintsPerWallet: 1,
                isEligibleToMint: true,
                creatorAddress: REWARD_CONTRACT_ADDRESS,
             }
          }}
        >
          <NFTMedia />
          <NFTCollectionTitle />
          <NFTMintButton />
        </NFTMintCard>
      </div>
    </div>
  );
}
