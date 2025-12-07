"use client";

import { useComposeCast } from '@coinbase/onchainkit/minikit';
import { Share } from 'lucide-react';

export default function ShareButton({ title }: { title: string }) {
  const { composeCast } = useComposeCast();

  const handleShare = () => {
    composeCast({
      text: `Vote on my poll: ${title} 📊`,
      embeds: [window.location.href] // Links back to this specific poll
    });
  };

  return (
    <button 
      onClick={handleShare} 
      className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
    >
      <Share size={16} />
      <span>Share</span>
    </button>
  );
}
