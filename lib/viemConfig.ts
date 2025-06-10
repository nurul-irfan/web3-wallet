import { PRIVATE_KEY, RPC_URL } from 'env';
import { createWalletClient, http } from 'viem';
import { goerli } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';

console.log("Private Key Length:", PRIVATE_KEY.length); // Should be 66

const account = privateKeyToAccount(PRIVATE_KEY);

export function getWalletClient() {
    return createWalletClient({
        account,
        chain: goerli,
        transport: http(RPC_URL),
    });
}
