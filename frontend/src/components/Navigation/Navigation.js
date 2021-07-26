import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import EnterFormModal from '../EnterFormModal';
import styled from 'styled-components';
import { ReactComponent as NavLogo } from '../../assets/unwined_logo_nav.svg';

import './Navigation.css';

const StyledNavLogo = styled(NavLogo)`
  height: 55px;
  width: 120px;
  margin-left: 20px;

  :hover #logo_nav #text path {
    fill: white;
    transition: 0.5s linear;
  }

  :hover #logo_nav #bottle path {
    stroke: white;
    transition: 0.5s linear;
  }

  :hover #logo_nav path#wine {
    fill: #EE4C7C;
    transition: 0.5s linear;
  }

  #logo_nav #text path {
    fill: #b8b8b8;
  }
  
  #logo_nav #bottle path {
    stroke: #b8b8b8;
  }
`;

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} className={`nav_link nav_link__profile_btn`}/>
    );
  } else {
    sessionLinks = (
        <EnterFormModal />
    );
  }

  return (
    <div className='navbar'>
      
      <NavLink exact to='/' className={`nav_link nav_link__home`}>
        <StyledNavLogo />
      </NavLink>
      {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;