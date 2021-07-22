import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import AddCheckIn from './AddCheckIn';

import styles from './CheckIn.module.css';

const CheckIn = () => {
  const [togglePage, setTogglePage] = useState(false);
  const [ref, setRef] = useState(React.createRef());

  useEffect(() => {
    setRef(React.createRef())
  }, [togglePage]);

  return (
    <>
      <div>
        <CSSTransition
          in={togglePage}
          timeout={400}
          classNames='check_in_add'
          nodeRef={ref}
          unmountOnExit
        >
          <AddCheckIn 
            ref={ref}
            setTogglePage={setTogglePage}
          />
        </CSSTransition>
        <CSSTransition
          in={!togglePage}
          timeout={400}
          classNames='open_comment'
          nodeRef={ref}
          unmountOnExit
        >
          
          <button
            onClick={() => setTogglePage(true)}
          >
            Add Comment
          </button>
        </CSSTransition>
      </div>
    </>
  );
};

export default CheckIn;