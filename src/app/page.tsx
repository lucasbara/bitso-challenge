'use client';

import Image from 'next/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Logo from './svgs/logo.svg';

export default function Landing() {
  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans relative overflow-hidden flex items-center justify-center">
      <main className="container mx-auto px-4 text-center">
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
        <p className="text-gray-400 mb-8">The delightfully smart platform.</p>
        <div className="flex justify-center">
          <ConnectButton />
          {/* <button className="bg-lime-600 px-6 py-3 rounded-md hover:bg-lime-800 text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105">
            Connect Wallet
          </button> */}
        </div>
      </main>
    </div>
  );
}
