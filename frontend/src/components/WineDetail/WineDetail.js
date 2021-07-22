import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import WineDetailPage from './WineDetailPage';
import WineForm from '../WineForm';

import { deleteWine } from '../../store/wine';

const WineDetail = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { wineId } = useParams();
  
  const method = 'put';
  const [togglePage, setTogglePage] = useState(false);
  const [ref, setRef] = useState(React.createRef());

  useEffect(() => {
    setRef(React.createRef())
  }, [togglePage]);

  const handleDelete = (event) => {
    event.preventDefault();
    dispatch(deleteWine(wineId));
    history.push('/dashboard');
  };
  
  return (
    <>
      <CSSTransition
        in={!togglePage}
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
        in={togglePage}
        timeout={800}
        classNames='wine_edit_form'
        unmountOnExit  
        nodeRef={ref}
      >
        <WineForm 
          ref={ref} 
          setTogglePage={setTogglePage}
          method={method}
        />
      </CSSTransition>
      <button
        onClick={() => setTogglePage(true)}
      > 
        Edit 
      </button>
      <button
        onClick={() => setTogglePage(false)}
      >
        Cancel
      </button>
      <button
        onClick={handleDelete}
      > 
        Delete
      </button>
    </>
  );
};

export default WineDetail;