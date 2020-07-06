import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { ReactSVG } from 'react-svg';

const HeaderContainer = styled.div`
  height: 10vh;
  width: 100%;
  background-color: #3cb371;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  @media (max-width: 800px) {
    width: 100%;
    justify-content: space-between;
  }

  .recform {
    display: none !important;

    @media (max-width: 800px) {
      text-align: center !important;
      width: 50%;
      display: flex !important;
    }
  }

  .header-container {
    width: 75%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    @media (max-width: 800px) {
      width: 100%;
      justify-content: space-around;
    }

    a {
      text-decoration: none;
      margin: 0 16px;
      font-size: 1.22rem;
      font-weight: 500;
      color: white;
      fill: white;
      :hover {
        color: #98fb98;
        fill: #98fb98;
      }
    }

    nav {
      display: flex;
      align-items: center;
      text-align: center !important;
    }

    .a {
      @media (max-width: 800px) {
        width: 50%;
        display: none;
      }
    }

    .sign-out {
      text-decoration: none;
      font-size: 1rem;
      font-weight: 500;
    }
    > a:last-child {
      color: #3cb371;
      font-weight: bold;
      > div {
        background-color: white;
        padding: 7px;
        border: 1px solid #dcdcdc;
        border-radius: 5px;
      }
      &:hover {
        > div {
          background-color: #3cb371;
          color: #98fb98;
          border: 1px solid #98fb98;
        }
      }
    }
  }
`;

const Header = ({ displayHeader }) => {
  const { push } = useHistory();
  const signout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');

    push('/');
  };

  return (
    <HeaderContainer
      style={displayHeader ? { display: 'flex' } : { display: 'none' }}
    >
      <div className='header-container'>
        <Link to='/profile'>
          <ReactSVG src='flask.svg' />
        </Link>
        <nav className='headernav'>
          <Link className='a' to='/recommendation-form'>
            Recommendation Form
          </Link>
          <Link className='recform' to='/recommendation-form'>
            Rec <br /> Form
          </Link>
          <Link className='a' to='/recommendations'>
            Strain Recommendations
          </Link>
          <Link className='a' to='/strains'>
            Strain List
          </Link>
          <Link className='a' to='/cabinet'>
            My Cabinet
          </Link>
        </nav>
        <Link to='/' className='sign-out' onClick={signout}>
          <div>Sign&nbsp;Out</div>
        </Link>
      </div>
    </HeaderContainer>
  );
};

export default Header;
