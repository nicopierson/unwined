import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EnterForm from './EnterForm';

import './index.css'

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);
  const [toggleSignForm, setToggleSignForm] = useState(false);

  const handleSignIn = () => {
    setShowModal(true);
    setToggleSignForm(false);
  };

  const handleSignUp = () => {
    setShowModal(true);
    setToggleSignForm(true);
  };

  return (
    <>
      <button 
        onClick={handleSignIn}
        className='modal__link'
      >
        Sign In
      </button>
      <button 
        onClick={handleSignUp}
        className='modal__link'
      >
        Sign Up
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} toggle={{toggleSignForm, setToggleSignForm}}>
          <EnterForm toggle={{toggleSignForm, setToggleSignForm}}/>
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;