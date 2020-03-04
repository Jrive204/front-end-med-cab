import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// import logo from '../../img/logo.png';

const HeaderContainer = styled.div`
    height: 10vh;
    width: 100%;
    background: white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    display: flex;
    justify-content: center;
    align-items: center;

    .header-container {
        width: 1024px;
        background: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        a {
            img {
                height: 64px;
                cursor: pointer;
            }
        }

        nav {
            display: flex;
            align-items: center;

            a {
                text-decoration: none;
                margin: 0 16px;
                // border-bottom: 2px solid white;
                font-size: 1rem;
                font-weight: 500;
                color: #333;
                transition: 0.25s;

                :hover {
                    opacity: 0.5;
                }
            }
        }

        .sign-out {
            text-decoration: none;
            font-size: 1rem;
            font-weight: 500;
            color: #333;
            transition: 0.25s;
            margin-left: 1.5rem;

            :hover {
                opacity: 0.5;
            }
        }
    }
`;

const Header = () => {
    const signout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user_id")
    }

    return(
        <HeaderContainer>
            <div className='header-container'>
                <Link to='/dashboard'>
                    {/* <img src={logo} alt='bestbud logo'/> */}
                </Link>
                <nav>
                    <Link to='/recommender'>Recommender</Link>
                    <Link to='/strains'>Strain Search</Link>
                    <Link to='/cabinet'>My Cabinet</Link>
                </nav>
                <div>
                    <Link to='/profilepage'className='sign-out'>Profile</Link>
                    <Link to='/' className='sign-out' onClick={signout}>Sign Out</Link>
                </div>
            </div>
        </HeaderContainer>
    );
};

export default Header;
