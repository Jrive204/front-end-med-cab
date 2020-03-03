import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { axiosWithAuth } from "../../Utils/axiosWithAuth";
import Header from './Header';
import UserInfoCard from './UserInfoCard';


const ProfilePage = () => {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        axiosWithAuth().get('https://medcabinet1.herokuapp.com/api/users/:id')
          .then(response => {
            setCurrentUser(response.data);
          })
          .catch(error => {
            console.log('Error:', error);
          });
      }, []);

    return (
        <div>
            <Header />
            <div>
                <div>
                    <img src='../img/profile-placeholder.png' alt='placeholder'/>
                </div>
                <div>
                <UserInfoCard
                  key={index}
                  name={currentUser.username}
                  email={currentUser.email}
                />
                </div>
            </div>
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
        </div>
    )
}d

export default ProfilePage;