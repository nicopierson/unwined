import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import WineForm from './WineForm';

import styles from './WineForm.module.css';

const AddWineForm = () => {
  const history = useHistory();
  const [toggleForm, setToggleForm] = useState(true);
  const [ref, setRef] = useState(React.createRef());

  if (!toggleForm) {
    history.push('/dashboard');
  }

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