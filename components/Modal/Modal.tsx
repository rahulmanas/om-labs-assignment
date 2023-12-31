import React, { useRef } from "react";
import ReactDOM from "react-dom";

const Modal = ({ onClose, children, title }) => {
  const modalRef = useRef(null);
  const modalWrapperRef = useRef(null);
  const handleCloseClick = (e) => {
    modalWrapperRef.current.classList.add("out");
    e.preventDefault();
    onClose();
  };

  const handleOverlayClick = (event) => {
    if (event.target === modalRef.current) {
      modalWrapperRef.current.classList.add("out");
      onClose();
    }
  };

  const modalContent = (
    <div className="modal-overlay" ref={modalRef} onClick={handleOverlayClick}>
      <div className="modal-wrapper" ref={modalWrapperRef}>
        <div className="modal">
          <div className="modal-header">
            <a href="#" onClick={handleCloseClick}>
              x
            </a>
          </div>
          {title && <h1 className="text-2xl font-bold text-center">{title}</h1>}
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("modal-root")
  );
};

export default Modal;
