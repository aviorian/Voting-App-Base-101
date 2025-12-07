"use client";
import TransactionWrapper from './TransactionWrapper';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../lib/contract';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import ShareButton from './ShareButton';
import CreatorBadge from './CreatorBadge';

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
              onSuccess={onVoteSuccess}
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
              onSuccess={onVoteSuccess}
              className="w-full bg-white border border-red-500 text-red-600 hover:bg-red-50 font-bold py-2 rounded-xl transition-colors"
            />
          </>
        )}
      </div>

      <div className="mt-4 flex justify-center border-t border-gray-100 pt-3">
        <ShareButton title={poll.title} />
      </div>
    </div>
  );
}
