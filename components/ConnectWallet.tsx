import React from "react";
import MetaMaskCard from "./connectorCard/MetamaskCard";
import Modal from "./Modal/Modal";

import { useGlobal } from "../hooks/useGlobal";
import { hooks } from "../connectors/metaMask";
import { useBalances } from "../hooks/useBalances";
import TokenSwap from "./TokenSwap";

const { useAccounts, useIsActive, useProvider } = hooks;

export default function ConnectWallet() {
  const { showModal, setShowModal }: any = useGlobal();

  const isActive = useIsActive();
  const accounts = useAccounts();
  const provider = useProvider();
  const balances = useBalances(provider, accounts);

  return (
    <div className="text-white space-y-8 md:space-y-6">
      <TokenSwap isActive={isActive} balance={balances} />
      {showModal && (
        <Modal
          title={"Connect Your Wallet"}
          onClose={() => setShowModal(false)}
        >
          <MetaMaskCard />
        </Modal>
      )}
    </div>
  );
}
