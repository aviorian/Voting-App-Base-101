"use client";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownLink,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from "@coinbase/onchainkit/identity";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-md mx-auto px-4 h-16 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-black tracking-tighter text-gray-900">
            VOTE<span className="text-blue-600">FOR</span>FUN
          </h1>
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
              <WalletDropdownLink
                icon="wallet"
                href="https://keys.coinbase.com"
              >
                Wallet
              </WalletDropdownLink>
              <WalletDropdownDisconnect />
            </WalletDropdown>
          </Wallet>
        </div>
      </div>
    </nav>
  );
}
