"use client";

import  { useEffect } from 'react';
import { 
  Transaction, 
  TransactionButton, 
  TransactionStatus, 
  TransactionStatusLabel, 
  TransactionStatusAction 
} from '@coinbase/onchainkit/transaction';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Loader2 } from 'lucide-react';

type TransactionMode = 'base' | 'global';

interface TransactionWrapperProps {
  mode: TransactionMode;
  contractAddress: `0x${string}`;
  abi: any;
  functionName: string;
  args: any[];
  label: string;
  onSuccess?: () => void;
  className?: string;
  chainId?: number;
}

export default function TransactionWrapper({
  mode,
  contractAddress,
  abi,
  functionName,
  args,
  label,
  onSuccess,
  className,
  chainId = 84532 // Default to Base Sepolia
}: TransactionWrapperProps) {

  // --- Mode B: Global (Wagmi) ---
  const { 
    data: hash, 
    isPending: isWritePending, 
    writeContract 
  } = useWriteContract();

  const { 
    isLoading: isConfirming, 
    isSuccess: isConfirmed 
  } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isConfirmed && onSuccess) {
      onSuccess();
    }
  }, [isConfirmed, onSuccess]);

  const handleGlobalClick = () => {
    writeContract({
      address: contractAddress,
      abi,
      functionName,
      args,
      chainId
    });
  };

  if (mode === 'global') {
    const isLoading = isWritePending || isConfirming;
    
    return (
      <button
        onClick={handleGlobalClick}
        disabled={isLoading}
        className={className}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="animate-spin" size={16} />
            Processing...
          </span>
        ) : (
          label
        )}
      </button>
    );
  }

  // --- Mode A: Base (OnchainKit) ---
  return (
    <Transaction
      chainId={chainId}
      calls={[{
        address: contractAddress,
        abi: abi,
        functionName: functionName,
        args: args,
      }]}
      onStatus={(status) => {
        // Optional: Map OnchainKit status to onSuccess if needed
        if (status.statusName === 'success' && onSuccess) {
          onSuccess();
        }
      }}
    >
      <TransactionButton 
        text={label} 
        className={className} 
      />
      <TransactionStatus>
        <TransactionStatusLabel />
        <TransactionStatusAction />
      </TransactionStatus>
    </Transaction>
  );
}
