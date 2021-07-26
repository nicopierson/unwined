import React, { useEffect, useState } from 'react';
import { ModalSignup } from '../../context/Modal';
import EnterForm from './EnterForm';

import styles from './index.module.css';
import './index.css';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);
  const [toggleSignForm, setToggleSignForm] = useState(false);
  const [activeSignInLink, setActiveSignInLink] = useState('');
  const [activeSignUpLink, setActiveSignUpLink] = useState('');

  const handleSignIn = () => {
    setActiveSignInLink('active');
    setShowModal(true);
    setToggleSignForm(false);
  };

  const handleSignUp = () => {
    setActiveSignUpLink('active');
    setShowModal(true);
    setToggleSignForm(true);
  };

  useEffect(() => {
    if (!showModal) {
      setActiveSignInLink('');
      setActiveSignUpLink('');
    }
  }, [showModal]);

  useEffect(() => {
    if (toggleSignForm) {
      setActiveSignInLink('');
    } else {
      setActiveSignUpLink('');
    }
  }, [activeSignInLink, activeSignUpLink, toggleSignForm]);

  return (
    <>
      <span className={styles.nav_link__sign}>
        <button 
          onClick={handleSignIn}
          className={`${styles.nav_link__sign_in} ${styles.modal__link} ${activeSignInLink}`}
        >
          Sign In
        </button>
        <button 
          onClick={handleSignUp}
          className={`${styles.nav_link__sign_up} ${styles.modal__link} ${activeSignUpLink}`}
        >
          Sign Up
        </button>
      </span>
      {showModal && (
        <ModalSignup onClose={() => setShowModal(false)} toggle={{toggleSignForm, setToggleSignForm}}>
          <EnterForm toggle={{toggleSignForm, setToggleSignForm}}/>
        </ModalSignup>
      )}
    </>
  );
}

export default LoginFormModal;