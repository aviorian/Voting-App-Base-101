"use client";
import { useMiniKit } from "@coinbase/onchainkit/minikit";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CreatePoll from "../components/CreatePoll";
import PollList from "../components/PollList";
import BottomNav from "../components/BottomNav";

export default function Home() {
  const { isFrameReady, setFrameReady } = useMiniKit();
  const [activeTab, setActiveTab] = useState<'polls' | 'create'>('polls');

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  return (
    <main className="min-h-screen bg-gray-50 pb-24 antialiased text-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-md">
        {activeTab === 'create' ? (
          <CreatePoll />
        ) : (
          <PollList />
        )}
      </div>
      <BottomNav currentTab={activeTab} onTabChange={setActiveTab} />
    </main>
  );
}
