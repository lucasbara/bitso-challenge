'use client';

import { useAccount } from 'wagmi';

import Home from './layouts/home';
import Landing from './layouts/landing';

export default function Main() {
  const {
    isConnecting: isWalletConnecting,
    isConnected: isWalletConnected,
    isReconnecting: isWalletReconnecting,
  } = useAccount();

  const isWalletDisconnected =
    isWalletConnecting || !isWalletConnected || isWalletReconnecting;

  return (
    <main className="flex flex-col justify-center items-center h-[90%] w-full px-4 text-center">
      {isWalletDisconnected ? <Landing /> : <Home />}
    </main>
  );
}
