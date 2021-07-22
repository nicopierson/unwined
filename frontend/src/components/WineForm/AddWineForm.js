import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import WineForm from './WineForm';

// import styles from './AddWineForm.module.css';

const AddWineForm = () => {
  const history = useHistory();
  const [togglePage, setTogglePage] = useState(true);
  const [ref, setRef] = useState(React.createRef());

  const method = 'post';
  console.log(togglePage);
  if (!togglePage) {
    history.push('/dashboard');
  }

  return (
    <div>
      <CSSTransition
        in={togglePage}
        timeout={800}
        classNames='wine_add_form' 
        nodeRef={ref}
      >
        <>
        <WineForm 
          setTogglePage={setTogglePage}
          method={method}
        />
        <button
          onClick={() => history.push('/dashboard')}
        >
          Cancel
        </button>
        </>
      </CSSTransition>
    </div>
  );
};

export default AddWineForm;