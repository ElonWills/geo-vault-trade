import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';
import { config as envConfig } from './env';

export const config = getDefaultConfig({
  appName: 'Geo Vault Trade',
  projectId: envConfig.walletConnectProjectId,
  chains: [sepolia],
  ssr: false,
});
