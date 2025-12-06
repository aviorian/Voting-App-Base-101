"use client";
import TransactionWrapper from './TransactionWrapper';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../lib/contract';
import { useMiniKit, useViewProfile } from "@coinbase/onchainkit/minikit";
import { User } from 'lucide-react';

interface Poll {
  title: string;
  description: string;
  yesVotes: bigint;
  noVotes: bigint;
  creatorFid: bigint;
  isOpen: boolean;
}

interface PollCardProps {
  poll: Poll;
  pollId: number;
  hasVoted?: boolean;
}

export default function PollCard({ poll, pollId, hasVoted = false }: PollCardProps) {
  const { context } = useMiniKit();
  const viewProfile = useViewProfile();

  const handleViewProfile = () => {
    viewProfile(Number(poll.creatorFid));
  };

  const yesVotes = Number(poll.yesVotes);
  const noVotes = Number(poll.noVotes);
  const totalVotes = yesVotes + noVotes;
  const yesPercentage = totalVotes > 0 ? (yesVotes / totalVotes) * 100 : 0;

  return (
    <div className={`p-6 border rounded-2xl shadow-sm bg-white mb-4 ${hasVoted ? 'border-blue-200 bg-blue-50/30' : 'border-gray-100'}`}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-bold leading-tight text-gray-900">{poll.title}</h3>
        <div className="flex flex-col items-end gap-1">
          <button 
            onClick={handleViewProfile}
            className="flex items-center gap-1 text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-medium whitespace-nowrap ml-2 hover:bg-blue-100 hover:text-blue-700 transition-colors cursor-pointer"
          >
            <User size={12} />
            <span>FID: {poll.creatorFid.toString()}</span>
          </button>
          {hasVoted && (
            <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
              Voted
            </span>
          )}
        </div>
      </div>
      
      <p className="text-gray-500 text-sm mb-6">{poll.description}</p>
      
      <div className="mb-6 space-y-2">
        <div className="flex justify-between text-sm font-medium">
          <span className="text-green-600">{yesVotes} Yes</span>
          <span className="text-red-600">{noVotes} No</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-green-500 rounded-full transition-all duration-500"
            style={{ width: `${yesPercentage}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {hasVoted ? (
          <div className="col-span-2 text-center py-2 text-sm text-gray-500 font-medium bg-gray-50 rounded-xl">
            You have already voted on this poll
          </div>
        ) : (
          <>
            <TransactionWrapper
              mode="global"
              chainId={84532}
              contractAddress={CONTRACT_ADDRESS as `0x${string}`}
              abi={CONTRACT_ABI}
              functionName="vote"
              args={[BigInt(pollId), true, BigInt(context?.user?.fid ?? 0)]}
              label="Vote Yes"
              className="w-full bg-white border border-green-500 text-green-600 hover:bg-green-50 font-bold py-2 rounded-xl transition-colors"
            />

            <TransactionWrapper
              mode="global"
              chainId={84532}
              contractAddress={CONTRACT_ADDRESS as `0x${string}`}
              abi={CONTRACT_ABI}
              functionName="vote"
              args={[BigInt(pollId), false, BigInt(context?.user?.fid ?? 0)]}
              label="Vote No"
              className="w-full bg-white border border-red-500 text-red-600 hover:bg-red-50 font-bold py-2 rounded-xl transition-colors"
            />
          </>
        )}
      </div>
    </div>
  );
}
