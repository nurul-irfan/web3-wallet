import * as bip39 from 'bip39';
import { ethers } from 'ethers';
import * as Crypto from 'expo-crypto';
import { Buffer } from 'buffer';

if (typeof window !== 'undefined') {
  window.Buffer = window.Buffer || Buffer;
}

export async function generateMnemonic(): Promise<string> {
  const randomBytes = await Crypto.getRandomBytesAsync(16);
  const entropyHex = Array.from(randomBytes).map((b) => b.toString(16).padStart(2, '0')).join('');
  return bip39.entropyToMnemonic(entropyHex);
}

export function validateMnemonic(mnemonic: string): boolean {
  return bip39.validateMnemonic(mnemonic);
}

export function getAddressFromMnemonic(mnemonic: string): string {
  if (!validateMnemonic(mnemonic)) {
    throw new Error('Invalid mnemonic');
  }
  const wallet = ethers.Wallet.fromPhrase(mnemonic);
  return wallet.address;
}

export async function getWalletBalance(address: string): Promise<string> {
  try {
    const provider = new ethers.JsonRpcProvider('https://polygon-amoy.infura.io/v3/eb4fdaf55eee452ba8dd80f7cb107ef0');
    const balance = await provider.getBalance(address);
    return ethers.formatEther(balance); // returns string for precision
  } catch (error) {
    console.error('Error getting balance:', error);
    return '0';
  }
}
