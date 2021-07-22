import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group'
import WineDetailPage from './WineDetailPage';
import EditWineForm from '../EditWineForm/EditWineForm';


const WineDetail = () => {
  const history = useHistory();
  
  const [toggleEditPage, setToggleEditPage] = useState(false);
  const [ref, setRef] = useState(React.createRef());

  useEffect(() => {
    setRef(React.createRef())
  }, [toggleEditPage])
  
  return (
    <>
      <CSSTransition
        in={!toggleEditPage}
        timeout={800}
        classNames='wine_detail'
        nodeRef={ref}
        unmountOnExit
      >
        <WineDetailPage 
          ref={ref}
        />
      </CSSTransition>
      <CSSTransition
        in={toggleEditPage}
        timeout={800}
        classNames='wine_edit_form'
        unmountOnExit  
        nodeRef={ref}
      >
        <EditWineForm 
          ref={ref} 
          setToggleEditPage={setToggleEditPage}
        />
      </CSSTransition>
      <button
        onClick={() => setToggleEditPage(true)}
      > 
        Edit 
      </button>
      <button
        onClick={() => setToggleEditPage(false)}
      >
        Cancel
      </button>
    </>
  );
};

export default WineDetail;