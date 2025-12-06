"use client";
import { useState, useCallback } from 'react';
import { 
  Transaction, TransactionButton, TransactionStatus, 
  TransactionStatusLabel, TransactionStatusAction 
} from '@coinbase/onchainkit/transaction';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../lib/contract';
import { useMiniKit } from "@coinbase/onchainkit/minikit";

export default function CreatePoll() {
  const { context } = useMiniKit();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleStatus = (status: any) => {
    console.log(status);
    if (status.statusName === 'success') {
      setTitle("");
      setDescription("");
    }
  };

  const calls = useCallback(async () => {
    return [{
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName: 'createPoll',
      args: [title, description, BigInt(context?.user?.fid ?? 0)],
    }];
  }, [title, description, context?.user?.fid]);

  return (
    <div className="p-6 border border-gray-200 rounded-2xl shadow-sm bg-white">
      <h2 className="text-xl font-bold mb-6 text-gray-900">Create Poll</h2>
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Title</label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={50}
            className="flex h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
            placeholder="What's on your mind?"
          />
          <div className={`text-right text-xs mt-1 ${title.length >= 50 ? 'text-red-500' : 'text-gray-400'}`}>
            {title.length}/50
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Description</label>
          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={140}
            className="flex min-h-[100px] w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all resize-none"
            placeholder="Add some details..."
          />
          <div className={`text-right text-xs mt-1 ${description.length >= 140 ? 'text-red-500' : 'text-gray-400'}`}>
            {description.length}/140
          </div>
        </div>
        
        <Transaction 
          chainId={84532} 
          calls={calls} 
          onStatus={handleStatus}
        >
          <TransactionButton 
            text="Create Poll" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all active:scale-95"
          />
          <TransactionStatus>
            <TransactionStatusLabel />
            <TransactionStatusAction />
          </TransactionStatus>
        </Transaction>
      </div>
    </div>
  );
}
