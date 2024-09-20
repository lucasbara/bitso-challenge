import { useAccount } from 'wagmi';
import Spinner from '@/components/spinner';

export default function Landing() {
  const {
    isConnecting: isWalletConnecting,
    isReconnecting: isWalletReconnecting,
  } = useAccount();

  const isLoading = isWalletConnecting || isWalletReconnecting;
  return (
    <main className="flex flex-col justify-center items-center h-[90%] w-full px-4 text-center">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
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
        </>
      )}
    </main>
  );
}
