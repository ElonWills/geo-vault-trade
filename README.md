# Geo Vault Trade

A decentralized mining rights exchange platform built with FHE (Fully Homomorphic Encryption) for secure, privacy-preserving trading of geological mining rights.

## Features

- **FHE-Encrypted Trading**: All sensitive data is encrypted using Fully Homomorphic Encryption
- **Real Wallet Integration**: Connect with RainbowKit, MetaMask, and other popular wallets
- **Geological Data Management**: Secure storage and verification of geological reports
- **Auction System**: Transparent bidding system for mining rights
- **Reputation System**: Trust-based reputation scoring for users and geologists
- **Multi-Chain Support**: Built for Ethereum Sepolia testnet

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Tailwind CSS
- **Blockchain**: Wagmi, RainbowKit, Viem
- **Smart Contracts**: Solidity with FHE encryption
- **Networks**: Ethereum Sepolia testnet

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/ElonWills/geo-vault-trade.git

# Navigate to the project directory
cd geo-vault-trade

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Environment Configuration

Create a `.env.local` file with the following variables:

```env
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
VITE_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
VITE_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
VITE_FALLBACK_RPC_URL=https://1rpc.io/sepolia
```

## Smart Contract Features

The platform includes a comprehensive smart contract system:

- **Mining Rights Management**: Create, verify, and trade mining rights
- **Bidding System**: Secure auction mechanism for rights trading
- **Geological Reports**: Encrypted storage of geological data
- **Reputation System**: Trust scoring for users and geologists
- **FHE Integration**: All sensitive data encrypted with FHE

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── components/          # React components
├── hooks/              # Custom React hooks
├── config/             # Configuration files
├── pages/              # Page components
└── lib/                # Utility functions

contracts/
└── GeoVaultTrade.sol   # Smart contract
```

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy to your preferred hosting service
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions, please open an issue on GitHub.
