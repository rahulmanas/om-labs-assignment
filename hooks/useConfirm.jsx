import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Modal from "../components/Modal/Modal";

export const PlumModalManagerContext = createContext({});

export function useConfirm() {
  return useContext(PlumModalManagerContext);
}

export const PlumModalProvider = ({ children }) => {
  const resolveRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [isAction, setIsAction] = useState(null);

  const triggerModal = async (val) => {
    setMessage(val);
    setShowModal(!showModal);

    return new Promise((resolve, reject) => {
      resolveRef.current = resolve;
    });
  };

  const triggerAction = (e) => {
    resolveRef.current(e);
  };

  const ConfirmDialog = () => {
    return (
      <div>
        {showModal && (
          <Modal
            title={"Connect Your Wallet"}
            // onClose={() => triggerModal(false)}
          >
            <div className="flex space-x-4">
              <p>{message}</p>
              <button
                className="py-2 px-4 rounded-lg bg-red-400"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowModal(false);
                  triggerAction(true);
                }}
              >
                Ok
              </button>
              <button
                className="py-2 px-4 rounded-lg bg-red-400"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowModal(false);
                  triggerAction(false);
                }}
              >
                Cancel
              </button>
            </div>
          </Modal>
        )}
      </div>
    );
  };
  return (
    <PlumModalManagerContext.Provider
      value={{
        ConfirmDialog,
        triggerModal,
        showModal,
      }}
    >
      {children}
    </PlumModalManagerContext.Provider>
  );
};
