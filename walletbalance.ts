import { createPublicClient, http } from 'viem';
import { bsc } from 'viem/chains';
import { erc20Abi } from 'viem';

// Function to get BEP-20 token balance
async function getTokenBalance({
    walletAddress,
    tokenAddress,
    rpcUrl,
}: {
    walletAddress: string;
    tokenAddress: string;
    rpcUrl?: string;
}) {
    const client = createPublicClient({
        chain: bsc,
        transport: http(rpcUrl || 'https://bsc-dataseed.binance.org/'),
    });

    const balance = await client.readContract({
        address: tokenAddress as `0x${string}`,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [walletAddress as `0x${string}`],
    });

    return balance; // BigInt
}

// Example usage
(async () => {
    const wallet = '0x65Eb528Dd6135C072330a6F42ffE28E85bfE8E4a';
    const token = '0xe9e7cea3dedca5984780bafc599bd69add087d56'; // BUSD

    const balance = await getTokenBalance({ walletAddress: wallet, tokenAddress: token });

    console.log(`Token Balance: ${balance.toString()}`);
})();
