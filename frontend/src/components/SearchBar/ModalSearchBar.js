import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import SearchBar from '.';
import { ModalSearch } from '../../context/Modal';

import styles from './ModalSearchBar.module.css';

const ModalSearchBar = () => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [ref, setRef] = useState(React.createRef());
  const [redirectUrl, setRedirectUrl] = useState();

  useEffect(() => {
    setRef(React.createRef())
    document.body.style.overflow = showModal ? 'hidden' : 'unset';
  }, [showModal]);

  useEffect(() => {
    history.push(redirectUrl);
  }, [redirectUrl]);

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
          <SearchBar setShowModal={setShowModal} />
        </ModalSearch>
      </CSSTransition>
      <i
        className={`fas fa-search nav_bar_right_link ${styles.search_icon}`}
        onClick={() => setShowModal(!showModal)}
      >
      </i>
    </div>
  );
};

export default ModalSearchBar;