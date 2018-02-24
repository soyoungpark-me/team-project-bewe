import React from 'react';

const RankingUser = (props) => {
  return (
    <div className="ranking-item">
      <div className="ranking-user-avatar-wrapper">
        <img className="avatar-image"           
          src={(props.user.avatar) !== null ? 
            props.user.avatar : "/../public/img/avatar.png"} />
      </div>
      <div className="ranking-user-info">
        <p>{props.user.nickname}</p>
        <p>{props.user.email}</p>
      </div>      
    </div>
  )
}

export default RankingUser;