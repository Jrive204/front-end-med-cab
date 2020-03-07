import React, { useState, useEffect } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { axiosWithAuth } from '../../Utils/axiosWithAuth';
import Header from '../Dashboard/Header';
import MyFavs from './MyFavs';
import FindMore from './FindMore';
import styled from 'styled-components';
import { ReactSVG } from 'react-svg';

const Background = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #98fb98;
`;

const Profile = styled.div`
  border-radius: 10px;
  border: 1px solid #f5f5f5;
  margin-top: 30px;
  background-color: white;
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  > div:first-child {
    background-color: #3cb371;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    width: 100%;
    padding: 15px 10% 0 10%;
    color: white;
    @media (max-width: 500px) {
      padding: 0;
    }
  }

  @media (max-width: 500px) {
    width: 100%;
    text-align: center;
    font-size: 1.2rem;
  }
`;

const Welcome = styled.div`
  font-size: 200%;
  font-weight: normal;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-bottom: 10px;
  margin: 10px 0 25px;

  @media (max-width: 500px) {
    width: 100%;
    text-align: center;
    /* height: 20vh; */
  }
`;

const UserCard = styled.div`
  margin-top: 20px;
  display: flex;
  width: 75%;
  height: 100%;
  justify-content: space-between;
  background-color: #f5f5f5;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 0px;
  @media (max-width: 500px) {
    width: 45%;
    margin-left: 8%;
  }
`;

const Image = styled.div`
  background-color: #3cb371;
  width: 10rem;
  height: 10rem;
  border-radius: 10px;
  fill: white;
`;

const InfoHeader = styled.div`
  width: 15%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  @media (max-width: 500px) {
    display: none;
  }

  .infoItems {
    margin: 7px 0;
    font-weight: 800;
  }
`;

const Info = styled.div`
  @media (max-width: 500px) {
    display: none;
  }
  width: 55%;
  .infoItems {
    margin: 10px 0 20px;
  }
`;

const BottomContent = styled.div`
  width: 100%;
`;

const ProfileNav = styled.div`
  width: 100%;
  display: flex;
  margin-top: 10px;
  justify-content: center;
  @media (max-width: 500px) {
    margin-top: 20px;
    width: 100%;
    height: 8vh;
    text-align: center;
  }
  div {
    font-size: 1.5rem;
    &:first-child {
      padding-right: 40px;
    }
    a {
      text-decoration: none;
    }
  }
`;

const ProfilePage = () => {
  const [currentUser, setCurrentUser] = useState({});

  const setid = localStorage.getItem('CUSER');

  const cuser = JSON.parse(setid);

  useEffect(() => {
    axiosWithAuth()
      .get('https://medcabinet1.herokuapp.com/api/users/user')
      .then(response => {
        console.log(response);
        localStorage.setItem('userID', response.data.subject);
      });
    axiosWithAuth()
      .get(
        `https://medcabinet1.herokuapp.com/api/users/${localStorage.getItem(
          'userID'
        )}`
      )
      .then(response => {
        console.log(response);
        setCurrentUser(response.data);
      })
      .catch(error => {
        console.log('Error:', error);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  console.log(currentUser);
  return (
    <div>
      <Header />

      <Background>
        <Profile>
          <div>
            {console.log(cuser.username)}
            <Welcome>
              Welcome,&nbsp;
              <span style={{ fontWeight: 'bold' }}>{cuser.username}</span>
              &nbsp; to Dr. Mary Jane
            </Welcome>
          </div>
          <UserCard>
            <Image>
              <ReactSVG src='profile.svg' />
            </Image>
            <InfoHeader>
              <div className='infoItems'>Username:</div>
              <div className='infoItems'>Email:</div>
              <div className='infoItems'>Bio:</div>
            </InfoHeader>
            <Info>
              <div className='infoItems'> {cuser.username}</div>
              <div className='infoItems'>{currentUser.email}</div>
              <div className='infoItems'>
                “Always code as if the guy who ends up maintaining your code
                will be a violent psychopath who knows where you live” ― John
                Woods
              </div>
            </Info>
          </UserCard>
          <BottomContent>
            <ProfileNav>
              <div>
                <Link to='/cabinet'>My&nbsp;Cabinet</Link>
              </div>
              <div>
                <Link to='/profile/findmore'>Find&nbsp;More</Link>
              </div>
            </ProfileNav>

            <Switch>
              <Route exact path='/profile'>
                <MyFavs component={MyFavs} />
              </Route>
              <Route path='/profile/findmore'>
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
