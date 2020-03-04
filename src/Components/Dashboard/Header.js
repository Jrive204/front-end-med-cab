import React from 'react';
import { Link, useHistory } from 'react-router-dom';
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
                color:#98FB98;
                fill:#98FB98;
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
        > a:last-child {
            color:#3CB371;
            font-weight:bold;
            > div {
                background-color:white;
                padding:7px;
                border:1px solid #DCDCDC;
                border-radius:5px;
            }
            &:hover {
                > div {
                    background-color:#3CB371;
                    color:#98FB98;
                    border:1px solid #98FB98;
                }
            }
        }
    }
`;

const Header = ({displayHeader}) => {
    const { push } = useHistory();
    const signout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user_id")
        push("/")
    }

    return (
        <HeaderContainer style={displayHeader ? {display: "flex"} : {display: "none"}}>
            <div className='header-container'>
                <Link to='/dashboard'>
                    <ReactSVG src="flask.svg" />
                </Link>
                <nav>
                    <Link to='/recommender'>Recommender</Link>
                    <Link to='/strains'>Strain List</Link>
                    <Link to='/cabinet'>My Cabinet</Link>
                </nav>
                <Link to='/' className='sign-out' onClick={signout}><div>Sign&nbsp;Out</div></Link>
            </div>
        </HeaderContainer>
    );
};

export default Header;
