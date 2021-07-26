import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';
import { useHistory } from 'react-router-dom';

import { ModalProfile } from '../../context/Modal';

import styles from './ModalProfile.module.css';

function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  // const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  // const openMenu = () => {
  //   if (showMenu) return;
  //   setShowMenu(true);
  // };
  
  // useEffect(() => {
  //   if (!showMenu) return;

  //   const closeMenu = () => {
  //     setShowMenu(false);
  //   };

  //   document.addEventListener('click', closeMenu);
  
  //   return () => document.removeEventListener("click", closeMenu);
  // }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/');
  };

  return (
    <div className='nav_bar___right_links'>
      <NavLink to='/dashboard' className='nav_bar__dashboard_link'>
        Dashboard
      </NavLink>
      <i 
      className='fas fa-user-circle nav_bar__profile_modal'
      onClick={() => setShowModal(true)}
      >
      </i>
      {showModal && (
        <ModalProfile onClose={() => setShowModal(false)}>
          <div className={styles.profile_dropdown}>
            <p>{user.username}</p>
            <p>{user.email}</p>
            <button onClick={logout}>Log Out</button>
          </div>
        </ModalProfile>
      )}
    </div>
  );
}

export default ProfileButton;