import { useAccount } from 'wagmi';

import Spinner from '@/app/components/spinner';
import Chip from '@/app/components/chip';

export default function Landing() {
  const {
    isConnecting: isWalletConnecting,
    isReconnecting: isWalletReconnecting,
  } = useAccount();

  const isWalletLoading = isWalletConnecting || isWalletReconnecting;
  return (
    <main className="flex flex-col justify-center items-center h-[90%] w-full px-4 text-center">
      {isWalletLoading ? (
        <Spinner />
      ) : (
        <>
          <Chip label="dApp Challenge" />
          <h1 className="text-5xl font-bold mb-4 text-white">
            The future of crypto
            <br />
            <span className="bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500">
              is here
            </span>
          </h1>
          <p className="text-gray-400 mb-8">The delightfully smart platform.</p>
        </>
      )}
    </main>
  );
}
