import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

import SearchBar from '.';
import { ModalSearch } from '../../context/Modal';

import styles from './ModalSearchBar.module.css';

const ModalSearchBar = () => {
  const [showModal, setShowModal] = useState(false);
  const [ref, setRef] = useState(React.createRef());

  useEffect(() => {
    setRef(React.createRef())
  }, [showModal]);

  return (
    <div>
      <CSSTransition
        in={showModal}
        timeout={800}
        classNames='search_bar'
        unmountOnExit  
        nodeRef={ref}
      >
        <ModalSearch 
          onClose={() => setShowModal(false)}
          ref={ref}
          >
          <SearchBar />
        </ModalSearch>
      </CSSTransition>
      <button
        onClick={() => setShowModal(!showModal)}
      >
        Search
      </button>
    </div>
  );
};

export default ModalSearchBar;