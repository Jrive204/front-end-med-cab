import React from 'react';

const UserInfoCard = props => {
  return (
    <span>
      <div key={props.id}>
        <h2>{props.username}</h2>
        <p>Email: {props.email}</p>
      </div>
    </span>
  )
}

export default UserInfoCard;