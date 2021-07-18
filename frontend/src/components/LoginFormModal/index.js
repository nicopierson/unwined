import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EnterForm from './EnterForm';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);
  const [toggleSignForm, setToggleSignForm] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} toggle={{toggleSignForm, setToggleSignForm}}>
          <EnterForm toggle={{toggleSignForm, setToggleSignForm}}/>
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;