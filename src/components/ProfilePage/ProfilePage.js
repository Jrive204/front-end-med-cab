import React, { useState, useEffect } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { axiosWithAuth } from "../../Utils/axiosWithAuth";
import Header from '../Dashboard/Header';
import MyFavs from './MyFavs';
import FindMore from './FindMore';
import styled from 'styled-components';

const Background = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:#98FB98;
`;

const Profile = styled.div`
    background-color: #FFFFF0;
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

const Welcome = styled.div`
    font-size: 200%;
    font-weight: normal;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding-bottom: 10px;
    margin: 10px 0 25px;
    border-bottom: 1px solid black;
`;

const Username = styled.h2`
    font-weight: 800;
    margin: -5px 10px 0 10px;
`;

const UserCard = styled.div`
    display: flex;
    width: 75%;
    height: 100%;
    justify-content: space-between;
    background-color: white;
    border: 1px solid #3CB371;
    border-radius: 50px;
    padding: 0px
`;

const Image = styled.div`
    background-color: black;
    width: 10rem;
    height: 10rem;
    border-radius: 50px;
`;

const InfoHeader = styled.div`
    width: 15%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .infoItems {
        margin: 7px 0;
        font-weight: 800;
    }
`;

const Info = styled.div`
    width: 55%;
    .infoItems {
        margin: 10px 0 20px;
    }
`;

const BottomContent = styled.div`
    width: 100%;
`;

const ProfileNav = styled.div`
    width: 30%;
    margin: 30px 0 0 33.5%;
    display: flex;
    justify-content: space-between;
        div {
            font-size: 1.5rem;
            &:first-child {
                border-right: 1px solid black;
                padding-right: 20px;
            }   
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
                    <BottomContent>
                        <ProfileNav>
                            <div>
                                <Link to='/profile'>My Favorites</Link>
                            </div>
                            <div>
                                <Link to='/profile/findmore'>Find More</Link>
                            </div>
                        </ProfileNav>

                        <Switch>
                            <Route exact path="/profile">
                                <MyFavs component={MyFavs} />
                            </Route>
                            <Route path="/profile/findmore">
                                <FindMore component={FindMore} />
                            </Route>
                        </Switch>
                    </BottomContent>
                </Profile>
            </Background>
        </div>
    );
};

export default ProfilePage;