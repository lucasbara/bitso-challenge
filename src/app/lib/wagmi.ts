import { sepolia } from 'wagmi/chains';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';

export const config = getDefaultConfig({
  appName: 'Bitso Challenge',
  projectId: 'YOUR_PROJECT_ID',
  chains: [sepolia],
  ssr: true,
});

export default config;
