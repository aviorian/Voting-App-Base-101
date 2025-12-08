"use client";
import TransactionWrapper from './TransactionWrapper';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../lib/contract';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import ShareButton from './ShareButton';
import CreatorBadge from './CreatorBadge';
import { pay } from '@base-org/account';
import { Heart } from 'lucide-react';
import VoteButtons from './VoteButtons';
import PollRewardCard from './PollRewardCard';

interface Poll {
  title: string;
  description: string;
  yesVotes: bigint;
  noVotes: bigint;
  creatorFid: bigint;
  creatorAddress: `0x${string}`;
  isOpen: boolean;
}

interface PollCardProps {
  poll: Poll;
  pollId: number;
  hasVoted?: boolean;
  onVoteSuccess?: () => void;
}

export default function PollCard({ poll, pollId, hasVoted = false, onVoteSuccess }: PollCardProps) {
  const { context } = useMiniKit();

  const yesVotes = Number(poll.yesVotes);
  const noVotes = Number(poll.noVotes);
  const totalVotes = yesVotes + noVotes;
  const yesPercentage = totalVotes > 0 ? (yesVotes / totalVotes) * 100 : 0;
  const noPercentage = totalVotes > 0 ? (noVotes / totalVotes) * 100 : 0;

  const handleSupport = async () => {
    try {
      await pay({
        amount: '0.01',
        to: poll.creatorAddress,
        testnet: true,
      });
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  return (
    <div className={`p-6 border rounded-2xl shadow-sm bg-white mb-4 ${hasVoted ? 'border-blue-200 bg-blue-50/30' : 'border-gray-100'}`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <CreatorBadge fid={Number(poll.creatorFid)} />
          </div>
          <h3 className="text-lg font-bold leading-tight text-gray-900">{poll.title}</h3>
        </div>
        <div className="flex flex-col items-end gap-1">
          <button 
            onClick={handleSupport}
            className="flex items-center gap-1 text-[10px] bg-pink-100 text-pink-700 px-2 py-1 rounded-full font-medium hover:bg-pink-200 transition-colors"
          >
            <Heart className="w-3 h-3 fill-current" />
            Support
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
          <span className="text-green-600">{yesVotes} Yes ({Math.round(yesPercentage)}%)</span>
          <span className="text-red-600">{noVotes} No ({Math.round(noPercentage)}%)</span>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden flex">
          <div 
            className="h-full bg-green-500 transition-all duration-500"
            style={{ width: `${yesPercentage}%` }}
          />
          <div 
            className="h-full bg-red-500 transition-all duration-500"
            style={{ width: `${noPercentage}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {hasVoted ? (
          <div className="col-span-2">
            <div className="text-center py-2 text-sm text-gray-500 font-medium bg-gray-50 rounded-xl mb-4">
              You have already voted on this poll
            </div>
            <PollRewardCard pollTitle={poll.title} pollId={pollId} />
          </div>
        ) : (
          <div className="col-span-2">
            <VoteButtons 
              pollId={pollId} 
              userFid={context?.user?.fid ?? 0} 
              onVoteSuccess={onVoteSuccess} 
            />
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-center border-t border-gray-100 pt-3">
        <ShareButton title={poll.title} />
      </div>
    </div>
  );
}
