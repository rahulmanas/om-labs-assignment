import React from "react";
import { useConfirm } from "../hooks/useConfirm";
import { useState } from "react";

export default function Plum() {
  const { ConfirmDialog, triggerModal, showModal } = useConfirm();
  const [message, setMessage] = useState("");
  const onDelete = async () => {
    const shouldDelete = await triggerModal(
      "Are you sure you want to delete the message?"
    ); // Replace this with triggerConfirm
    debugger;
    if (shouldDelete) {
      setMessage("Confirmed!");
    } else {
      setMessage("Declined.");
    }
  };
  return (
    <div className="text-black">
      <ConfirmDialog />
      <div>
        <button onClick={onDelete}>Delete</button>
      </div>
      <p>{message}</p>
    </div>
  );
}
