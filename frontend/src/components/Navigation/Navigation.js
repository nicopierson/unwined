import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import EnterFormModal from '../EnterFormModal';
import './Navigation.css';
import styled from 'styled-components';
import { ReactComponent as NavLogo } from '../../assets/unwined_logo_nav.svg';

const StyledNavLogo = styled(NavLogo)`
  :hover #logo_nav #text path {
      fill: white;
    }
  }

  :hover #logo_nav #bottle path {
      stroke: white;
    }
  }

  :hover #logo_nav path#wine {
      fill: #EE4C7C;
    }
  }

  #logo_nav #text path {
    fill: #E3E2DF;
  }
  
  #logo_nav #bottle path {
    stroke: #E3E2DF;
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
      <>
        <EnterFormModal />
      </>
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