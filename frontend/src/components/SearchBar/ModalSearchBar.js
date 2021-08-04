import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

import SearchBar from '.';
import { ModalSearch } from '../../context/Modal';

import styles from './ModalSearchBar.module.css';

const ModalSearchBar = ({ setShowNavbar }) => {
  const [showModal, setShowModal] = useState(false);
  const [ref, setRef] = useState(React.createRef());

  useEffect(() => {
    setRef(React.createRef());
    document.body.style.overflow = showModal ? 'hidden' : 'unset';
  }, [showModal]);

  const handleModalOpen = (e) => {
    e.preventDefault();

    setShowNavbar(false);
    setShowModal(true);
  };

  const handleModalClose = (e) => {
    e.preventDefault();

    setShowModal(false);
    setShowNavbar(true);
  };

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
          onClose={handleModalClose}
          ref={ref}
          >
          <SearchBar setShowModal={setShowModal} />
        </ModalSearch>
      </CSSTransition>
      <i
        className={`fas fa-search nav_bar_right_link ${styles.search_icon}`}
        onClick={handleModalOpen}
      >
      </i>
    </div>
  );
};

export default ModalSearchBar;