import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { axiosWithAuth } from "../../Utils/axiosWithAuth";
import Header from '../Dashboard/Header';
import styled from 'styled-components';

const Background = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(126,255,126);
    background: radial-gradient(circle, rgba(126,255,126,1) 0%, rgba(64,204,69,1) 78%, rgba(0,124,8,1) 100%);
`;

const Profile = styled.div`
    background-color: white;
    width: 60rem;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

const Welcome = styled.h2`
    font-size: 200%;
    font-weight: normal;
    display: flex;
    justify-content: space-between;
    margin-top: 10px
`;

const Username = styled.h2`
    font-weight: 800;
    margin: -5px 10px 0 10px;
`;

const UserCard = styled.div`
    display: flex;
    width: 75%;
    justify-content: space-between;
    background-color: lightgrey;
    border-radius: 50px 10px 10px 50px;
    padding: 15px
`;

const Image = styled.div`
    background-color: black;
    width: 10rem;
    height: 10rem;
    border-radius: 50px;
`;

const InfoHeader = styled.div`
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    .infoItems {
        margin: 10px 0;
    }
`;

const Info = styled.div`
    width: 55%;

    .infoItems {
        margin: 10px 0 20px;
    }
`;




const ProfilePage = () => {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        axiosWithAuth().get(`https://medcabinet1.herokuapp.com/api/users/${localStorage.getItem("userID")}`)
          .then(response => {
            console.log(response);
            setCurrentUser(response.data);
          })
          .catch(error => {
            console.log('Error:', error);
          });
      }, []);

      console.log(currentUser);
    return (
        <div>
            <Header />

            <Background>
                <Profile>
                    <div>
                        <Welcome>Welcome 
                        <Username> {currentUser.username} </Username>
                        to MedCabinet</Welcome>
                    </div>
                    <UserCard>
                        <Image>
                            <img src='../../img/profile-placeholder.png' alt='placeholder'/>
                        </Image>
                        <InfoHeader>
                            <div className='infoItems'>Username:</div>
                            <div className='infoItems'>Email:</div>
                            <div className='infoItems'>Bio:</div>
                        </InfoHeader>
                        <Info>
                            <div className='infoItems'>{currentUser.username}</div>
                            <div className='infoItems'>{currentUser.email}</div>
                            <div className='infoItems'>
                                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                            </div>
                        </Info>
                    </UserCard>
                    <div>
                        <Link to='/cabinet'>
                            <div className='button'>
                                <h3>My Cabinet</h3>
                            </div>
                        </Link>

                        <Link to='/recommender'>
                            <div className='button'>
                                <h3>Recommender</h3>
                            </div>
                        </Link>

                        <Link to='/strains'>
                            <div className='button'>
                                <h3>Strain Search</h3>
                            </div>
                        </Link>
                    </div>
                </Profile>
            </Background>
        </div>
    );
};

export default ProfilePage;