import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { getWineries } from '../../store/winery';

import WineForm from './WineForm';

const AddWineForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [toggleForm, setToggleForm] = useState(true);
  const [ref, setRef] = useState(React.createRef());

  if (!toggleForm) {
    history.push('/dashboard');
  }

  useEffect(() => {
    dispatch(getWineries());
  }, [dispatch]);

  return (
      <CSSTransition
        in={toggleForm}
        timeout={800}
        classNames='wine_add_form' 
        nodeRef={ref}
      >
        <WineForm 
          setToggleForm={setToggleForm}
          method={'POST'}
          title='Add Wine'
        />
      </CSSTransition>
  );
};

export default AddWineForm;