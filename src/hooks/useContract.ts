import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useAccount } from 'wagmi';
import { useToast } from '@/hooks/use-toast';

// Contract ABI - This would be generated from the compiled contract
const CONTRACT_ABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "_location", "type": "string"},
      {"internalType": "string", "name": "_geologicalData", "type": "string"},
      {"internalType": "uint32", "name": "_areaSize", "type": "uint32"},
      {"internalType": "uint32", "name": "_estimatedValue", "type": "uint32"},
      {"internalType": "uint256", "name": "_auctionDuration", "type": "uint256"}
    ],
    "name": "createMiningRights",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "rightsId", "type": "uint256"},
      {"internalType": "uint32", "name": "amount", "type": "uint32"},
      {"internalType": "bool", "name": "isAnonymous", "type": "bool"}
    ],
    "name": "placeBid",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "rightsId", "type": "uint256"}],
    "name": "getMiningRightsInfo",
    "outputs": [
      {"internalType": "string", "name": "location", "type": "string"},
      {"internalType": "string", "name": "geologicalData", "type": "string"},
      {"internalType": "uint32", "name": "areaSize", "type": "uint32"},
      {"internalType": "uint32", "name": "estimatedValue", "type": "uint32"},
      {"internalType": "uint32", "name": "currentBid", "type": "uint32"},
      {"internalType": "uint32", "name": "bidCount", "type": "uint32"},
      {"internalType": "bool", "name": "isActive", "type": "bool"},
      {"internalType": "bool", "name": "isVerified", "type": "bool"},
      {"internalType": "address", "name": "owner", "type": "address"},
      {"internalType": "uint256", "name": "auctionEndTime", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

// Contract address - This would be the deployed contract address
const CONTRACT_ADDRESS = '0x0000000000000000000000000000000000000000'; // Replace with actual deployed address

export const useMiningRights = (rightsId?: number) => {
  const { data: rightsInfo, isLoading, error } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getMiningRightsInfo',
    args: rightsId ? [BigInt(rightsId)] : undefined,
  });

  return {
    rightsInfo,
    isLoading,
    error,
  };
};

export const useCreateMiningRights = () => {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { toast } = useToast();

  const createRights = async (
    location: string,
    geologicalData: string,
    areaSize: number,
    estimatedValue: number,
    auctionDuration: number
  ) => {
    try {
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'createMiningRights',
        args: [location, geologicalData, areaSize, estimatedValue, auctionDuration],
      });
      
      toast({
        title: "Mining Rights Created",
        description: "Your mining rights have been successfully created and listed for auction.",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to create mining rights. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    createRights,
    hash,
    isPending,
    error,
  };
};

export const usePlaceBid = () => {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { toast } = useToast();

  const placeBid = async (
    rightsId: number,
    amount: number,
    isAnonymous: boolean = false
  ) => {
    try {
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'placeBid',
        args: [BigInt(rightsId), amount, isAnonymous],
        value: BigInt(amount),
      });
      
      toast({
        title: "Bid Placed",
        description: `Your bid of ${amount} ETH has been placed successfully.`,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to place bid. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    placeBid,
    hash,
    isPending,
    error,
  };
};

export const useTransactionStatus = (hash: `0x${string}` | undefined) => {
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  return {
    isConfirming,
    isConfirmed,
  };
};
