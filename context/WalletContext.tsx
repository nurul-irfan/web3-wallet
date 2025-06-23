// // context/WalletContext.tsx
// import { createContext, useContext, useState } from 'react';
// import { WalletConnectClient } from '@walletconnect/client';

// const WalletContext = createContext(null);

// export const WalletProvider = ({ children }) => {
//   const [connector, setConnector] = useState<WalletConnectClient | null>(null);
//   const [accounts, setAccounts] = useState<string[]>([]);

//   return (
//     <WalletContext.Provider value={{ connector, accounts, setConnector, setAccounts }}>
//       {children}
//     </WalletContext.Provider>
//   );
// };

// export const useWalletContext = () => useContext(WalletContext);
