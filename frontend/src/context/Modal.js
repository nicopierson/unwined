import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import styles from './Modal.module.css';

const ModalContext = React.createContext();

export const useModal = () => useContext(ModalContext);

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, [])

  return (
    <>
      <ModalContext.Provider value={value}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div className={styles.modal__container}>
      <div className={styles.modal__background} onClick={onClose} />
      <div className={styles.modal_inner__container}>
        {children}
      </div>
    </div>,
    modalNode
  );
}