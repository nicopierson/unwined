import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

import WineDetailPage from './WineDetailPage';
import WineForm from '../WineForm';
import CheckIn from '../CheckIn';

import styles from './WineDetailPage.module.css'

const WineDetail = () => {
  const [toggleForm, setToggleForm] = useState(false);
  const [ref, setRef] = useState(React.createRef());

  useEffect(() => {
    setRef(React.createRef())
  }, [toggleForm]);
  
  return (
    <>
      <CSSTransition
        in={!toggleForm}
        timeout={800}
        classNames='wine_detail'
        nodeRef={ref}
        unmountOnExit
      >
        <>
          <WineDetailPage 
            ref={ref}
            setToggleForm={setToggleForm}
          />
          <CheckIn />
        </>
      </CSSTransition>
      <CSSTransition
        in={toggleForm}
        timeout={800}
        classNames='wine_edit_form'
        unmountOnExit  
        nodeRef={ref}
      >
        <WineForm 
          ref={ref} 
          setToggleForm={setToggleForm}
          method={'PUT'}
          title='Edit Wine'
        />
      </CSSTransition>
    </>
  );
};

export default WineDetail;