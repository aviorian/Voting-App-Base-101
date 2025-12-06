"use client";
import { useMiniKit } from "@coinbase/onchainkit/minikit";
import { 
  ConnectWallet, Wallet, WalletDropdown, 
  WalletDropdownLink, WalletDropdownDisconnect 
} from '@coinbase/onchainkit/wallet';
import { 
  Address, Avatar, Name, Identity, EthBalance 
} from '@coinbase/onchainkit/identity';

export default function Navbar() {
  const { context } = useMiniKit();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-md mx-auto px-4 h-16 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold tracking-tight">
            <span className="text-blue-600">VOTE</span>
            <span className="text-gray-900">APP</span>
          </h1>
          <p className="text-xs text-red-500">
            Debug FID: {context?.user?.fid ?? "undefined"}
          </p>
        </div>
        <div className="flex gap-2">
          <Wallet>
            <ConnectWallet className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
              <Avatar className="h-6 w-6" />
              <Name />
            </ConnectWallet>
            <WalletDropdown>
              <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                <Avatar />
                <Name />
                <Address />
                <EthBalance />
              </Identity>
              <WalletDropdownLink icon="wallet" href="https://keys.coinbase.com">Wallet</WalletDropdownLink>
              <WalletDropdownDisconnect />
            </WalletDropdown>
          </Wallet>
        </div>
      </div>
    </nav>
  );
}
