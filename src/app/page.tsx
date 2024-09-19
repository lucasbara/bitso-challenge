'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import Spinner from '@/components/spinner';
import Logo from '@/svgs/logo.svg';

export default function Landing() {
  const [isLoading, setIsLoading] = useState(true);

  const {
    isConnecting: isWalletConnecting,
    isConnected: isWalletConnected,
    isReconnecting: isWalletReconnecting,
  } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (!isWalletConnecting || !isWalletReconnecting) setIsLoading(false);
  }, [isWalletConnected, isWalletConnecting, isWalletReconnecting]);

  if (isWalletConnected) return router.push('/home');

  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans relative overflow-hidden flex items-center justify-center">
      <main className="container mx-auto px-4 text-center">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Image
              className="mx-auto"
              width={200}
              height={200}
              alt="Bitso | Logo"
              src={Logo}
            />
            <div className="inline-block bg-gray-800 text-xs px-3 py-1 rounded-full mt-3 mb-6">
              dApp Challenge
            </div>
            <h1 className="text-5xl font-bold mb-4 text-white">
              The future of crypto
              <br />
              <span className="bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500">
                is here
              </span>
            </h1>
            <p className="text-gray-400 mb-8">
              The delightfully smart platform.
            </p>
            <div className="flex justify-center">
              <ConnectButton />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
