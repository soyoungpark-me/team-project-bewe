import React from 'react';
import Moment from 'react-moment';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ProfileAvatar from './ProfileAvatar';

const Profile = (props) => {
  return(
    <div style={{"paddingTop":"20px"}}>
      <ProfileAvatar url={props.profile.avatar}/>
      <h2 className="profile-text">{props.profile.nickname}</h2>
      <h5 className="profile-text">{props.profile.email}</h5>
      <h5 className="profile-text">{props.profile.id}</h5>
      <p className="profile-text">가입일 : <Moment format="YYYY/MM/DD">{props.profile.created_at}</Moment></p>
      
      {(JSON.parse(localStorage.getItem('profile')).idx === props.profile.idx 
        ? <Button className="profile-update-button"><NavLink to="/">프로필 수정하기</NavLink></Button> 
        : '')}      
    </div>
  )
}

export default Profile;