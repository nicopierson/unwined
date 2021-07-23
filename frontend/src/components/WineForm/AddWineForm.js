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
    <div className={styles.wine_form_container}>
      <CSSTransition
        in={toggleForm}
        timeout={800}
        classNames='wine_add_form' 
        nodeRef={ref}
      >
        <WineForm 
          setToggleForm={setToggleForm}
          method={'POST'}
        />
      </CSSTransition>
    </div>
  );
};

export default AddWineForm;