"use client";

import { useReadContract } from "wagmi";
import { useMiniKit } from "@coinbase/onchainkit/minikit";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../lib/contract";
import PollCard from "./PollCard";
import { Inbox, Loader2 } from "lucide-react";

export default function PollList() {
  const { context } = useMiniKit();
  const userFid = context?.user?.fid ? BigInt(context.user.fid) : BigInt(0);

  // Fetch all polls
  const { data: pollsData, isLoading: isPollsLoading, refetch: refetchPolls } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: "getAllPolls",
  });

  // Fetch user voted status
  const { data: votedStatus, isLoading: isVotedStatusLoading, refetch: refetchVotedStatus } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: "getUserVotedStatus",
    args: [userFid],
    query: {
      enabled: !!userFid,
    },
  });

  const handleVoteSuccess = () => {
    refetchPolls();
    refetchVotedStatus();
  };

  if (isPollsLoading || isVotedStatusLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <Loader2 className="w-8 h-8 animate-spin mb-2 text-blue-600" />
        <p className="text-sm font-medium">Loading polls...</p>
      </div>
    );
  }

  const polls = pollsData ? [...pollsData].reverse() : []; // Show newest first
  const hasVoted = votedStatus || [];

  if (!polls || polls.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-400">
        <Inbox className="w-12 h-12 mb-4 opacity-50" />
        <p className="text-sm font-medium">No active polls found.</p>
        <p className="text-xs mt-1">Be the first to create one!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold px-1">Active Polls</h2>
      {polls.map((poll, index) => {
        // Calculate the original index because we reversed the array
        const originalIndex = pollsData ? pollsData.length - 1 - index : index;
        
        return (
          <PollCard
            key={originalIndex}
            poll={poll}
            pollId={originalIndex}
            hasVoted={hasVoted[originalIndex] || false}
            onVoteSuccess={handleVoteSuccess}
          />
        );
      })}
    </div>
  );
}
