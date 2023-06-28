import React, { createContext, useContext, useEffect, useState } from "react";

export const ModalManagerContext = createContext({});

export function useModalManager() {
  return useContext(ModalManagerContext);
}

export const ModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);

  const handleShowModal = (val: boolean) => {
    setShowModal(val);
  };

  const handleTokenModal = (val: boolean) => {
    setShowTokenModal(val);
  };

  const [selectedToToken, setSelectedToToken] = useState({
    id: 3,
    name: "Polygon",
    shortName: "MATIC",
    address: "0x0000000000000000000000000000000000001010",
    image_url:
      "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/polygon/assets/0x0000000000000000000000000000000000001010/logo.png",
  });

  return (
    <ModalManagerContext.Provider
      value={{
        showModal,
        handleShowModal,
        handleTokenModal,
        showTokenModal,
        selectedToToken,
        setSelectedToToken,
      }}
    >
      {children}
    </ModalManagerContext.Provider>
  );
};
