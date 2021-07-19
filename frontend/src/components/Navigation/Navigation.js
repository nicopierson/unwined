import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import EnterFormModal from '../EnterFormModal';
import './Navigation.css';
import { ReactComponent as Logo } from '../../assets/unwined_logo_nav.svg';

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
    <div className='navbar'>
      
      <NavLink exact to='/' className={`nav_link nav_link__home`}>
        <Logo />
        {/* <img alt='unwined-logo' src={logo} /> */}
      </NavLink>
      {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;