import React from 'react';

import { Card, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';

const FriendAllCard = (props) => {
  return (
    <Card className="friend-card-wrapper">
      <div className="friend-left-wrapper">
        <CardTitle>{props.profile.nickname}</CardTitle>
        <CardSubtitle style={{"margin":"7px 0"}}>{props.profile.id}</CardSubtitle>          
        <CardText style={{"color":"#999999", "fontSize":"13px"}}>{props.profile.email}</CardText>
      </div>
      <div className="friend-right-wrapper">
        <div className="friend-avatar-wrapper">
          <img className="avatar-image" src={(props.profile.avatar) !== null ? props.profile.avatar : "/../public/img/avatar.png"}/>
        </div>
      </div>
      <NavLink 
        to={`/users/friends/${props.profile.idx}`}
        onClick={()=> props.history.pushState(null, null, `/users/friends/${props.profile.idx}`)}>
        <Button style={{"display" : "block"}}>프로필 보기</Button>
      </NavLink>  
    </Card>
  )
}

export default FriendAllCard;