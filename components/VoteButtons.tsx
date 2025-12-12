"use client";
import TransactionWrapper from './TransactionWrapper';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../lib/contract';

interface VoteButtonsProps {
  pollId: number;
  userFid: number;
  onVoteSuccess?: () => void;
}

export default function VoteButtons({ pollId, userFid, onVoteSuccess }: VoteButtonsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <TransactionWrapper
        mode="global"
        chainId={84532}
        contractAddress={CONTRACT_ADDRESS as `0x${string}`}
        abi={CONTRACT_ABI}
        functionName="vote"
        args={[BigInt(pollId), true, BigInt(userFid)]}
        label="Vote Yes"
        onSuccess={onVoteSuccess}
        className="w-full bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-2 rounded-xl transition-colors"
      />

      <TransactionWrapper
        mode="global"
        chainId={84532}
        contractAddress={CONTRACT_ADDRESS as `0x${string}`}
        abi={CONTRACT_ABI}
        functionName="vote"
        args={[BigInt(pollId), false, BigInt(userFid)]}
        label="Vote No"
        onSuccess={onVoteSuccess}
        className="w-full bg-white border border-orange-500 text-orange-600 hover:bg-orange-50 font-bold py-2 rounded-xl transition-colors"
      />
    </div>
  );
}
