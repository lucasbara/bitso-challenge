'use client';

import React, { FormEvent, useEffect, useState } from 'react';

import {
  useAccount,
  useWriteContract,
  useReadContract,
  useWaitForTransactionReceipt,
} from 'wagmi';
import { toast } from 'react-toastify';
import { Address, encodeFunctionData, formatEther, parseEther } from 'viem';
import { estimateGas } from '@wagmi/core';

import { config, contractConfig } from '@/app/lib/wagmi';
import Chip from '@/app/components/chip';

export default function Home() {
  const [recipientAddress, setRecipientAddress] = useState<Address | ''>('');
  const [amount, setAmount] = useState('');

  const { address } = useAccount();

  const { data: balance, refetch: refetchBalance } = useReadContract({
    ...contractConfig,
    functionName: 'balanceOf',
    args: [address],
  });
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    if (isPending) {
      toast.info('Transaction is pending...');
    }
    if (error) {
      toast.error(`Transaction failed: ${error.message}`, {
        toastId: 'txFailed',
      });
    }
    if (isConfirming) {
      toast.info('Confirming transaction...', { autoClose: false });
    }
    if (isConfirmed) {
      toast.success('Transaction confirmed!');
      refetchBalance();
    }
  }, [isConfirming, isConfirmed, isPending, error, refetchBalance]);

  const handleTransfer = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    writeContract({
      ...contractConfig,
      functionName: 'transfer',
      args: [recipientAddress, parseEther(amount)],
    });

    const estimatedGas = await estimateGas(config, {
      to: contractConfig.address,
      data: encodeFunctionData({
        abi: contractConfig.abi,
        functionName: 'transfer',
        args: [recipientAddress, parseEther(amount)],
      }),
    });

    toast.info(`Estimated gas for transfer: ${formatEther(estimatedGas)} ETH`);
  };

  const handleClaim = async () => {
    writeContract({
      ...contractConfig,
      functionName: 'claimTokens',
    });
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-150px)] px-4">
      <Chip label="dApp Challenge" />
      <h1 className="text-4xl font-bold mb-4 flex flex-col items-center">
        Token Transfer
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500">
          Send your crypto
        </span>
      </h1>
      <p className="text-gray-400 mb-8">
        {balance
          ? `You have ${formatEther(balance as bigint)} BTS`
          : 'You have no tokens'}
      </p>
      <form onSubmit={handleTransfer} className="max-w-md w-full mb-8">
        <input
          aria-label="Recipient"
          type="text"
          value={recipientAddress}
          onChange={(e) => setRecipientAddress(e.target.value as Address)}
          placeholder="Recipient Address"
          pattern="^0x[a-fA-F0-9]{40}$"
          className="w-full mb-4 p-2 rounded bg-gray-800 text-white"
          required
        />
        <input
          aria-label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="w-full mb-10 p-2 rounded bg-gray-800 text-white"
          required
        />
        <button
          disabled={isPending || !recipientAddress || !amount}
          type="submit"
          className={`px-6 py-3 rounded-md text-lg font-semibold transition duration-300 ease-in-out transform w-full  ${
            isPending || !recipientAddress || !amount
              ? 'bg-lime-900'
              : 'bg-lime-600 hover:bg-lime-800'
          }`}
        >
          Send Tokens
        </button>
      </form>
      <button
        disabled={isPending}
        onClick={handleClaim}
        className={`px-6 py-3 rounded-md text-lg font-semibold transition duration-300 ease-in-out transform w-full max-w-md  ${
          isPending ? 'bg-blue-900' : 'bg-blue-600 hover:bg-blue-800'
        }`}
      >
        Claim 100 BTS Tokens
      </button>
    </main>
  );
}
