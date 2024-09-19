'use client';

import React, { FormEvent, useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import {
  useAccount,
  useWriteContract,
  useReadContract,
  useBalance,
} from 'wagmi';
import { toast } from 'react-toastify';

import { contractConfig } from '@/lib/wagmi';
import Logo from '@/svgs/logo.svg';
import Spinner from '@/components/spinner';
import { Address, parseEther } from 'viem';

export default function Home() {
  const [recipientAddress, setRecipientAddress] = useState<Address | ''>('');
  const [amount, setAmount] = useState('');

  const router = useRouter();
  const { address, isConnected: isWalletConnected } = useAccount();
  const { refetch } = useBalance();
  const { data: balance } = useReadContract({
    ...contractConfig,
    functionName: 'balanceOf',
    args: [address],
  });
  const { writeContractAsync } = useWriteContract();

  useEffect(() => {
    if (!isWalletConnected) router.push('/');
  }, [isWalletConnected, router]);

  const handleTransfer = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!recipientAddress) {
      toast.error('Please enter a valid recipient address.');
      return;
    }

    if (!amount || parseInt(amount) <= 0) {
      toast.error('Please enter a valid amount greater than zero.');
      return;
    }

    try {
      toast.info('Initiating transfer...', {
        autoClose: false,
        toastId: 'transferPending',
      });
      const result = await writeContractAsync({
        ...contractConfig,
        functionName: 'transfer',
        args: [recipientAddress, parseEther(amount)],
      });

      if (!result) {
        toast.error('Transaction failed. Check the console for details.');
      } else {
        toast.success(
          'Transaction successful! You can view it on a block explorer.'
        );
        setRecipientAddress('');
        setAmount('');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An unexpected error occurred. Please try again later.');
    } finally {
      toast.dismiss('transferPending');
    }
    refetch();
  };

  const handleClaim = async () => {
    try {
      toast.info('Claiming tokens...', {
        autoClose: false,
        toastId: 'claimPending',
      });
      const result = await writeContractAsync({
        ...contractConfig,
        functionName: 'claimTokens',
      });

      if (!result) {
        toast.error(
          'Failed to claim tokens. Please check the console for details.'
        );
      } else {
        toast.success('Tokens claimed successfully! 🦄');
      }
    } catch {
      toast.error(
        'An unexpected error occurred while claiming tokens. Please try again later.'
      );
    } finally {
      toast.dismiss('claimPending');
    }
    refetch();
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white fonts-inter">
      {!isWalletConnected ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Spinner />
        </div>
      ) : (
        <>
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
              {balance
                ? `You have ${Number(balance) / 1e18} BTS`
                : 'You have no tokens'}
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
                onChange={(e) => setAmount(Number(e.target.value))}
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
        </>
      )}
    </div>
  );
}
