import React from 'react';
import { CSSTransition } from 'react-transition-group'
import LoginForm from './LoginForm';
import SigninForm from './SigninForm';

import './EnterForm.css';

function EnterForm({ toggle }) {
  const { toggleSignForm } = toggle;

  return (
    <>
      <CSSTransition
        in={!toggleSignForm}
        timeout={800}
        classNames='visible_right'
        unmountOnExit  
      >
        <LoginForm toggle={toggle}/>
      </CSSTransition>
      <CSSTransition
        in={toggleSignForm}
        timeout={800}
        classNames='visible_left'
        unmountOnExit  
      >
        <SigninForm toggle={toggle}/>
      </CSSTransition>
    </>
  );
}

export default EnterForm;