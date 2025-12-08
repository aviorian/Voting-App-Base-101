"use client";
import { useState } from 'react';
import { 
  NFTMintCard, 
} from '@coinbase/onchainkit/nft';
import { NFTMedia } from '@coinbase/onchainkit/nft/view';
import { NFTCollectionTitle, NFTMintButton } from '@coinbase/onchainkit/nft/mint';
import { encodeFunctionData, parseAbi } from 'viem';
import { useAccount, useReadContract } from 'wagmi';
import { CheckCircle, ExternalLink, ChevronDown, ChevronUp, Gift } from 'lucide-react';

interface PollRewardCardProps {
  pollTitle: string;
  pollId: number;
}

// Replace with your deployed contract address
const REWARD_CONTRACT_ADDRESS = "0x31E6E60786540C3FD1b6337e5832F4f3A60bfbA2"; 

export default function PollRewardCard({ pollTitle, pollId }: PollRewardCardProps) {
  const { address } = useAccount();
  const [isOpen, setIsOpen] = useState(false);

  const { data: balance, isLoading } = useReadContract({
    address: REWARD_CONTRACT_ADDRESS,
    abi: parseAbi(["function balanceOf(address account, uint256 id) view returns (uint256)"]),
    functionName: 'balanceOf',
    args: address ? [address, BigInt(pollId)] : undefined,
    query: {
      enabled: !!address,
    }
  });

  const isCollected = balance && balance > BigInt(0);

  return (
    <div className={`mt-4 border rounded-2xl overflow-hidden transition-all ${isCollected ? 'border-green-100 bg-green-50/30' : 'border-purple-100 bg-purple-50/30'}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-white/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${isCollected ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'}`}>
            {isCollected ? <CheckCircle className="w-5 h-5" /> : <Gift className="w-5 h-5" />}
          </div>
          <div>
            <span className={`block text-sm font-bold ${isCollected ? 'text-green-900' : 'text-purple-900'}`}>
              {isCollected ? 'Reward Collected' : 'Claim Reward'}
            </span>
            <span className="text-xs text-gray-500">
              {isCollected ? 'You own this badge' : 'Mint your proof of participation'}
            </span>
          </div>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>

      {isOpen && (
        <div className="p-4 pt-0 border-t border-gray-100/50">
          {isLoading ? (
             <div className="animate-pulse space-y-4 mt-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                <div className="h-48 bg-gray-200 rounded-xl"></div>
             </div>
          ) : isCollected ? (
            <div className="text-center mt-4">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-xl overflow-hidden border-2 border-green-200 shadow-sm">
                  <img 
                    src="/icon.png" 
                    alt="Badge" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <a 
                  href={`https://testnets.opensea.io/assets/base-sepolia/${REWARD_CONTRACT_ADDRESS}/${pollId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-green-700 hover:text-green-800 hover:underline"
                >
                  View on OpenSea
                  <ExternalLink className="w-3 h-3" />
                </a>
            </div>
          ) : (
            <div className="mt-4 rounded-xl overflow-hidden border border-purple-200 shadow-sm bg-white">
                <NFTMintCard 
                  contractAddress={REWARD_CONTRACT_ADDRESS}
                  tokenId={pollId.toString()}
                  buildMintTransaction={async () => {
                    if (!address) {
                        throw new Error("Wallet not connected");
                    }
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
          )}
        </div>
      )}
    </div>
  );
}
