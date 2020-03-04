import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactSVG } from 'react-svg';

const HeaderContainer = styled.div`
    height: 10vh;
    width: 100%;
    background-color:#3CB371;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    display: flex;
    justify-content: center;
    align-items: center;

    .header-container {
        width: 90%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        a {
            text-decoration: none;
            margin: 0 16px;
            // border-bottom: 2px solid white;
            font-size: 1rem;
            font-weight: 500;
            color:white;
            fill:white;
            :hover {
                color:#DCDCDC;
                fill:#DCDCDC;
            }
        }

        nav {
            display: flex;
            align-items: center;
        }

        .sign-out {
            text-decoration: none;
            font-size: 1rem;
            font-weight: 500;
            transition: 0.25s;
        }
    }
`;

const Header = props => {
    const signout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user_id")
        // props.history.push("/")
    }

    return (
        <HeaderContainer>
            <div className='header-container'>
                <Link to='/dashboard'>
                    <ReactSVG src="flask.svg" />
                </Link>
                <nav>
                    <Link to='/recommender'>Recommender</Link>
                    <Link to='/strains'>Strain Search</Link>
                    <Link to='/cabinet'>My Cabinet</Link>
                </nav>
                <Link to='/' className='sign-out' onClick={signout}>Sign Out</Link>
            </div>
        </HeaderContainer>
    );
};

export default Header;
