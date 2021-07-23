import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import WineDetailPage from './WineDetailPage';
import WineForm from '../WineForm';

import CheckIn from '../CheckIn';

const WineDetail = () => {
  const [toggleDetails, setToggleDetails] = useState(false);
  const [ref, setRef] = useState(React.createRef());

  useEffect(() => {
    setRef(React.createRef())
  }, [toggleDetails]);
  
  return (
    <div>
      <h2>CHanges</h2>
      <CSSTransition
        in={!toggleDetails}
        timeout={800}
        classNames='wine_detail'
        nodeRef={ref}
        unmountOnExit
      >
        <>
          <WineDetailPage 
            ref={ref}
            setToggleDetails={setToggleDetails}
          />
          <CheckIn />
        </>
      </CSSTransition>
      <CSSTransition
        in={toggleDetails}
        timeout={800}
        classNames='wine_edit_form'
        unmountOnExit  
        nodeRef={ref}
      >
        <WineForm 
          ref={ref} 
          setToggleDetails={setToggleDetails}
          method={'PUT'}
        />
      </CSSTransition>
    </div>
  );
};

export default WineDetail;