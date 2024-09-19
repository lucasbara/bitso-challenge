'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Logo from '@/svgs/logo.svg';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useWriteContract, useReadContract } from 'wagmi';
import { contractConfig } from '@/lib/wagmi';
import { toast } from 'react-toastify';

export default function Home() {
  const { address } = useAccount();
  const { data: balance } = useReadContract({
    abi: contractConfig.abi,
    address: contractConfig.address,
    functionName: 'balanceOf',
    args: [address],
  });
  const { writeContract, writeContractAsync } = useWriteContract();

  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');

  return (
    <div className="bg-gray-900 min-h-screen text-white fonts-inter">
      <header className="py-4 px-6 flex justify-between items-center border-b border-gray-700">
        <Link href="/">
          <Image width={125} height={125} alt="Bitso Logo" src={Logo} />
        </Link>
        <ConnectButton />
      </header>
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-150px)] px-4">
        <div className="inline-block bg-gray-800 text-xs px-3 py-1 rounded-full mt-3 mb-6">
          dApp Challenge
        </div>
        <h1 className="text-4xl font-bold mb-4 text-white">
          Token Transfer
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500">
            Send your crypto
          </span>
        </h1>
        <p className="text-gray-400 mb-8">
          {balance ? `You have ${balance} BTS` : 'You have no tokens'}
        </p>
        <form onSubmit={handleTransfer} className="max-w-md w-full mb-8">
          <input
            type="text"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            placeholder="Recipient Address"
            className="w-full mb-4 p-2 rounded bg-gray-800 text-white"
          />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            className="w-full mb-4 p-2 rounded bg-gray-800 text-white"
          />
          <button
            type="submit"
            className="bg-lime-600 px-6 py-3 rounded-md hover:bg-lime-800 text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 w-full mb-4"
          >
            Send Tokens
          </button>
        </form>
        <button
          onClick={handleClaim}
          className="bg-blue-600 px-6 py-3 rounded-md hover:bg-blue-800 text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 w-full max-w-md mb-8"
        >
          Claim 100 BTS Tokens
        </button>
      </main>
    </div>
  );
}
