'use client';

import { useAccount } from 'wagmi';

import Home from './home/page';
import Landing from './layouts/landing';

export default function Main() {
  const {
    isConnecting: isWalletConnecting,
    isConnected: isWalletConnected,
    isReconnecting: isWalletReconnecting,
  } = useAccount();

  return (
    <main className="flex flex-col justify-center items-center h-[90%] w-full px-4 text-center">
      {isWalletConnected ? <Home /> : <Landing />}
    </main>
  );
}
