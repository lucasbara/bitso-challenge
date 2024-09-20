'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import Link from 'next/link';

import Logo from '@/svgs/logo.svg';

export default function Header() {
  return (
    <header className="py-4 px-6 flex justify-between items-center border-b border-gray-700 h-[10%]">
      <Link href="/">
        <Image width={125} height={125} alt="Bitso Logo" src={Logo} />
      </Link>
      <ConnectButton />
    </header>
  );
}
