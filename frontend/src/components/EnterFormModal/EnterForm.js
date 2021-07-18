import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group'
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

import './EnterForm.css';

function EnterForm({ toggle }) {
  const [ref, setRef] = useState(React.createRef());
  const { toggleSignForm } = toggle;

  useEffect(() => {
    setRef(React.createRef())
  }, [toggleSignForm])

  return (
    <>
      <CSSTransition
        in={!toggleSignForm}
        timeout={800}
        classNames='visible_right'
        unmountOnExit 
        nodeRef={ref}
      >
        <LoginForm toggle={toggle} ref={ref}/>
      </CSSTransition>
      <CSSTransition
        in={toggleSignForm}
        timeout={800}
        classNames='visible_left'
        unmountOnExit  
        nodeRef={ref}
      >
        <SignupForm toggle={toggle} ref={ref}/>
      </CSSTransition>
    </>
  );
}

export default EnterForm;