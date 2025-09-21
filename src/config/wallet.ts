import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';
import { config } from './env';

export const rainbowConfig = getDefaultConfig({
  appName: 'Geo Vault Trade',
  projectId: config.walletConnectProjectId,
  chains: [sepolia],
  ssr: false,
});
