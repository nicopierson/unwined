import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import EnterFormModal from '../EnterFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} className={`nav_link nav_link__profile_btn`}/>
    );
  } else {
    sessionLinks = (
      <>
        <EnterFormModal />
      </>
    );
  }

  return (
    <ul>
      <li>
        <NavLink exact to='/' className={`nav_link nav_link__home`}>Home</NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;