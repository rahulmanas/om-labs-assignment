import React, { createContext, useContext, useEffect, useState } from "react";

export const GlobalContext = createContext({});

export function useGlobal() {
  return useContext(GlobalContext);
}

export const GlobalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [selectedToToken, setSelectedToToken] = useState({
    id: 3,
    name: "Polygon",
    shortName: "MATIC",
    address: "0x0000000000000000000000000000000000001010",
    image_url:
      "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/polygon/assets/0x0000000000000000000000000000000000001010/logo.png",
  });

  return (
    <GlobalContext.Provider
      value={{
        showModal,
        setShowModal,
        showTokenModal,
        setShowTokenModal,
        selectedToToken,
        setSelectedToToken,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
