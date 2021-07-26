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

export function ModalSignup({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div className={styles.signup_modal__container}>
      <div className={styles.signup_modal__background} onClick={onClose} />
      <div className={styles.signup_modal_inner__container}>
        {children}
      </div>
    </div>,
    modalNode
  );
}

export function ModalProfile({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div className={styles.profile_modal__container}>
      <div className={styles.profile_modal__background} onClick={onClose} />
      <div className={styles.profile_modal_inner__container}>
        {children}
      </div>
    </div>,
    modalNode
  );
}