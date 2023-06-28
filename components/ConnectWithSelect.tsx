import type { Web3ReactHooks } from "@web3-react/core";

import type { MetaMask } from "@web3-react/metamask";

import { useCallback, useEffect, useState } from "react";

import { CHAINS, getAddChainParameters } from "../chains";
import { getName } from "../utils";
import { useModalManager } from "../hooks/useModalManager";

export function ConnectWithSelect({
  connector,
  activeChainId,
  chainIds = Object.keys(CHAINS).map(Number),
  isActivating,
  isActive,
  error,
  setError,
}: {
  connector: MetaMask;
  activeChainId: ReturnType<Web3ReactHooks["useChainId"]>;
  chainIds?: ReturnType<Web3ReactHooks["useChainId"]>[];
  isActivating: ReturnType<Web3ReactHooks["useIsActivating"]>;
  isActive: ReturnType<Web3ReactHooks["useIsActive"]>;
  error: Error | undefined;
  setError: (error: Error | undefined) => void;
}) {
  const [desiredChainId, setDesiredChainId] = useState<number>(undefined);
  const { handleShowModal }: any = useModalManager();

  /**
   * When user connects eagerly (`desiredChainId` is undefined) or to the default chain (`desiredChainId` is -1),
   * update the `desiredChainId` value so that <select /> has the right selection.
   */
  useEffect(() => {
    setDesiredChainId(chainIds[0]);
  }, []);

  const switchChain = useCallback(
    async (desiredChainId: number) => {
      setDesiredChainId(desiredChainId);

      try {
        if (
          // If we're already connected to the desired chain, return
          desiredChainId === activeChainId ||
          // If they want to connect to the default chain and we're already connected, return
          (desiredChainId === -1 && activeChainId !== undefined)
        ) {
          setError(undefined);
          return;
        }

        if (desiredChainId === -1) {
          await connector.activate();
        } else {
          await connector.activate(getAddChainParameters(desiredChainId));
        }
        handleShowModal(false);
        setError(undefined);
      } catch (error) {
        setError(error);
      }
    },
    [connector, activeChainId, setError]
  );

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="mb-2" />
      {isActive ? (
        error ? (
          <button onClick={() => switchChain(desiredChainId)}>
            Try again?
          </button>
        ) : (
          <button
            className="cursor-pointer bg-red-500 py-2 rounded-xl text-black font-bold"
            onClick={() => {
              if (connector?.deactivate) {
                void connector.deactivate();
              } else {
                void connector.resetState();
              }
              handleShowModal(false);
              setDesiredChainId(undefined);
            }}
          >
            Disconnect
          </button>
        )
      ) : (
        <button
          onClick={() => switchChain(desiredChainId)}
          disabled={isActivating || !desiredChainId}
          className="bg-green-500 py-2 rounded-xl text-black font-bold"
        >
          {error ? "Try again?" : `Connect to ${getName(connector)}`}
        </button>
      )}
    </div>
  );
}
