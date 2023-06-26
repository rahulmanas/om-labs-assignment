import React, { createContext, useContext, useEffect, useState } from "react";

export const GlobalContext = createContext({});

export function useGlobal() {
  return useContext(GlobalContext);
}

export const GlobalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <GlobalContext.Provider value={{ showModal, setShowModal }}>
      {children}
    </GlobalContext.Provider>
  );
};
