import { Home, PlusCircle } from "lucide-react";

interface BottomNavProps {
  currentTab: 'polls' | 'create';
  onTabChange: (tab: 'polls' | 'create') => void;
}

export default function BottomNav({ currentTab, onTabChange }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe pt-2 px-6 z-50">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        <button
          onClick={() => onTabChange('polls')}
          className={`flex flex-col items-center justify-center w-16 space-y-1 transition-colors duration-200 ${
            currentTab === 'polls' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs font-medium">Polls</span>
        </button>

        <button
          onClick={() => onTabChange('create')}
          className={`flex flex-col items-center justify-center w-16 space-y-1 transition-colors duration-200 ${
            currentTab === 'create' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <PlusCircle className="w-6 h-6" />
          <span className="text-xs font-medium">Create</span>
        </button>
      </div>
    </div>
  );
}
