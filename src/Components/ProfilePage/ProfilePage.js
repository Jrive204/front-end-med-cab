import React, { useState, useEffect } from "react";
import {
  Route,
  Link,
  Switch,
  useRouteMatch,
  useLocation,
} from "react-router-dom";
import { axiosWithAuth } from "../../Utils/axiosWithAuth";
import Header from "../Dashboard/Header";
import MyFavs from "./MyFavs";
import FindMore from "./FindMore";
import styled from "styled-components";
import { ReactSVG } from "react-svg";
import {
  Background,
  Profile,
  Welcome,
  UserCard,
  Image,
  InfoHeader,
  Info,
  BottomContent,
  ProfileNav,
} from "./ProfilePageStyles";

const ProfilePage = () => {
  const [currentUser, setCurrentUser] = useState({});

  const setid = localStorage.getItem("CUSER");

  const cuser = JSON.parse(setid);

  const { pathname } = useLocation();

  useEffect(() => {
    axiosWithAuth()
      .get("https://medcabinet1.herokuapp.com/api/users/user")
      .then((response) => {
        console.log(response);
        localStorage.setItem("userID", response.data.subject);
      });
    axiosWithAuth()
      .get(
        `https://medcabinet1.herokuapp.com/api/users/${localStorage.getItem(
          "userID"
        )}`
      )
      .then((response) => {
        console.log(response);
        setCurrentUser(response.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const { url } = useRouteMatch();

  console.log(currentUser);
  return (
    <div>
      <Header />
      {console.log(pathname)}

      <Background>
        <Profile>
          <div>
            {console.log(cuser.username)}
            <Welcome>
              Welcome,&nbsp;
              <span style={{ fontWeight: "bold" }}>{cuser.username}</span>
              &nbsp; to Dr. Mary Jane
            </Welcome>
          </div>
          <UserCard>
            <Image>
              <ReactSVG src="profile.svg" />
            </Image>
            <InfoHeader>
              <div className="infoItems">Username:</div>
              <div className="infoItems">Email:</div>
              <div className="infoItems">Bio:</div>
            </InfoHeader>
            <Info>
              <div className="infoItems"> {cuser.username}</div>
              <div className="infoItems">{currentUser.email}</div>
              <div className="infoItems">
                “Always code as if the guy who ends up maintaining your code
                will be a violent psychopath who knows where you live” ― John
                Woods
              </div>
            </Info>
          </UserCard>
          <BottomContent>
            <ProfileNav>
              <div>
                <Link to="/cabinet">My&nbsp;Cabinet</Link>
              </div>
              <div>
                {pathname === "/profile/findmore" ? (
                  <Link to="/profile">Profile</Link>
                ) : (
                  <Link to="/profile/findmore">All&nbsp;Strains</Link>
                )}
              </div>
              <div>
                <Link to="/recommendations">Recommendations</Link>
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
