import React, { useEffect, useState } from "react";
import { hooks } from "../../connectors/metaMask";
import { useGlobal } from "../../hooks/useGlobal";
import { useBalances } from "../../hooks/useBalances";
import { formatEther } from "@ethersproject/units";
import { Status } from "../Status";

const { useAccounts, useIsActive, useProvider, useIsActivating } = hooks;

const Header = () => {
  const { setShowModal } = useGlobal();
  const [maxVal, setMaxVal] = useState(0);

  const isActive = useIsActive();
  const accounts = useAccounts();
  const provider = useProvider();
  const isActivating = useIsActivating();
  const balances = useBalances(provider, accounts);

  useEffect(() => {
    if (balances) {
      const resp = Number(formatEther(balances[0])).toFixed(2);
      setMaxVal(resp);
    }
  }, [balances]);

  return (
    <header>
      <div className="text-right flex space-x-4 justify-end items-center">
        <Status isActivating={isActivating} isActive={isActive} />
        {balances?.[0] && <p>{`Bal: Ξ ${maxVal}`}</p>}
        {isActive ? (
          <button
            className="bg-red-600 text-red-200 py-1 px-4 rounded-full"
            onClick={() => setShowModal(true)}
          >
            Disconnect
          </button>
        ) : (
          <button
            onClick={() => setShowModal(true)}
            className="bg-red-600 text-red-200 py-1 px-4 rounded-full"
          >
            Connect
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
