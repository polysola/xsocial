import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider as ReactUIWalletModalProvider } from "@solana/wallet-adapter-react-ui";

import { FC, ReactNode, useMemo } from "react";
import { AutoConnectProvider, useAutoConnect } from "./AutoConnectProvider";

import { NetworkConfigurationProvider } from "./NetworkConfigurationProvider";

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { autoConnect } = useAutoConnect();

  const network = "mainnet-beta" as WalletAdapterNetwork;
  // const endpoint = process.env.REACT_APP_SOLANA_RPC_HOST;

  console.log(network);

  const wallets = useMemo(() => [], [network]);

  return (
    // TODO: updates needed for updating and referencing endpoint: wallet adapter rework
    <ConnectionProvider endpoint="https://rough-few-sailboat.solana-mainnet.quiknode.pro/98398dfaeff5fe0f52b20ed690431503f845040c/">
      <WalletProvider wallets={wallets} autoConnect={autoConnect}>
        <ReactUIWalletModalProvider>{children}</ReactUIWalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export const ContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <NetworkConfigurationProvider>
        <AutoConnectProvider>
          <WalletContextProvider>{children}</WalletContextProvider>
        </AutoConnectProvider>
      </NetworkConfigurationProvider>
    </>
  );
};
