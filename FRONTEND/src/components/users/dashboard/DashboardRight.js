import React, { Component } from 'react';
import NotiBoard from './noti/NotiBoard';
import FriendBoard from './friends/FriendBoard';
import FriendProfile from './friends/FriendProfile';
import ProfileBoard from './profile/ProfileBoard';
import MessageBoard from './message/MessageBoard';

import { BrowserRouter, Route } from 'react-router-dom';

const DashboardRight = (props) => {
  if((window.location.pathname) === '/users/profile' ||
     (window.location.pathname) === '/users') {
    return <ProfileBoard />
  } else if((window.location.pathname).includes('/users/friends')) {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/users/friends" component={FriendBoard} />
          <Route path="/users/friends/:idx" render={(props) => <FriendProfile {...props} />}/> 
        </div>
      </BrowserRouter>
    )
  } else if((window.location.pathname) === '/users/noties') {
    return <NotiBoard />
  } else if((window.location.pathname) === '/users/messages') {
    return <MessageBoard height={props.height}/>
  }
}

export default DashboardRight;