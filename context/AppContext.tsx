import React, { createContext, useContext, useState, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

interface WalletInfo {
  account: any;
  address: string;
  mnemonic?: string;
}

interface AppContextType {
  wallet: WalletInfo | null;
  setWallet: (wallet: WalletInfo) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  storeMnemonic: (mnemonic: string) => Promise<void>;
  storePassword: (password: string) => Promise<void>;
  verifyPassword: (inputPassword: string) => Promise<boolean>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [wallet, setWallet] = useState<WalletInfo | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const storeMnemonic = async (mnemonic: string) => {
    try {
      if (Platform.OS === 'web') {
        localStorage.setItem('wallet_mnemonic', mnemonic);
      } else {
        await SecureStore.setItemAsync('wallet_mnemonic', mnemonic);
      }
    } catch (error) {
      console.error('Error storing mnemonic:', error);
    }
  };

  const storePassword = async (password: string) => {
    try {
      if (Platform.OS === 'web') {
        localStorage.setItem('wallet_password', password);
      } else {
        await SecureStore.setItemAsync('wallet_password', password);
      }
    } catch (error) {
      console.error('Error storing password:', error);
    }
  };

  const verifyPassword = async (inputPassword: string) => {
    try {
      let storedPassword;
      if (Platform.OS === 'web') {
        storedPassword = localStorage.getItem('wallet_password');
      } else {
        storedPassword = await SecureStore.getItemAsync('wallet_password');
      }
      return storedPassword === inputPassword;
    } catch (error) {
      console.error('Error verifying password:', error);
      return false;
    }
  };

  return (
    <AppContext.Provider
      value={{
        wallet,
        setWallet,
        isAuthenticated,
        setIsAuthenticated,
        storeMnemonic,
        storePassword,
        verifyPassword,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}