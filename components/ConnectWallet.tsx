import React, { useState } from "react";
import MetaMaskCard from "./connectorCard/MetamaskCard";
import Modal from "./Modal/Modal";
import TokenSwap from "./TokenSwap";
import { useGlobal } from "../hooks/useGlobal";
import { hooks } from "../connectors/metaMask";
import { useBalances } from "../hooks/useBalances";
import { Status } from "./Status";

const { useAccounts, useIsActive, useProvider, useIsActivating } = hooks;

export default function ConnectWallet() {
  const { showModal, setShowModal }: any = useGlobal();

  const isActive = useIsActive();
  const isActivating = useIsActivating();
  const accounts = useAccounts();
  const provider = useProvider();
  const balances = useBalances(provider, accounts);

  return (
    <div className="text-white space-y-8 md:space-y-6">
      {showModal && (
        <Modal title={"Connect "} onClose={() => setShowModal(false)}>
          <MetaMaskCard />
        </Modal>
      )}
      {<TokenSwap isActive={isActive} balance={balances} />}
    </div>
  );
}
