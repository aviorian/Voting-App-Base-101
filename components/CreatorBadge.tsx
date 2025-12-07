"use client";

import { useState, useEffect } from 'react';
import { useViewProfile } from '@coinbase/onchainkit/minikit';
import { Loader2, User } from 'lucide-react';

interface CreatorBadgeProps {
  fid: number;
}

interface FarcasterUser {
  username: string;
  pfp_url: string;
  display_name: string;
}

export default function CreatorBadge({ fid }: CreatorBadgeProps) {
  const [user, setUser] = useState<FarcasterUser | null>(null);
  const [loading, setLoading] = useState(true);
  // Using the hook pattern consistent with PollCard.tsx
  const viewProfile = useViewProfile();

  useEffect(() => {
    const fetchUser = async () => {
      if (!fid) {
        setLoading(false);
        return;
      }
      
      try {
        // Call our internal API route instead of Neynar directly
        const response = await fetch(`/api/users?fid=${fid}`);

        if (!response.ok) {
            // Handle 401/404 gracefully
            setLoading(false);
            return;
        }

        const data = await response.json();
        if (data.users && data.users.length > 0) {
          setUser(data.users[0]);
        }
      } catch (error) {
        console.error("Error fetching Farcaster user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [fid]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Using the function returned by the hook
    viewProfile(fid);
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full animate-pulse">
        <div className="w-5 h-5 bg-gray-300 rounded-full" />
        <div className="w-16 h-3 bg-gray-300 rounded" />
      </div>
    );
  }

  if (!user) {
    return (
      <button 
        onClick={handleClick}
        className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors text-xs font-medium text-gray-600"
      >
        <User size={14} />
        <span>FID: {fid}</span>
      </button>
    );
  }

  return (
    <button 
      onClick={handleClick}
      className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-full transition-colors border border-blue-100 group"
    >
      <img 
        src={user.pfp_url} 
        alt={user.username} 
        className="w-5 h-5 rounded-full object-cover"
      />
      <span className="text-xs font-medium text-blue-700 group-hover:text-blue-800">@{user.username}</span>
    </button>
  );
}
