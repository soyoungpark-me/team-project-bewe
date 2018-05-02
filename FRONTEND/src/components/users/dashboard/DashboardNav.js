import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class DashboardNav extends Component {
  render() {    
    return(
      <div className="dashboard-left-navigation-wrapper">
        <NavLink to = "/users/profile"
          className={`dashboard-left-navigation-item 
            ${(window.location.pathname) === '/users/profile' ? 'dashboard-nav-active' : ''}`}>
          <p className="ion-ios-gear"></p>
          <p>내 프로필</p>
        </NavLink>
        <NavLink to = "/users/friends" onClick={()=> this.props.history.pushState(null, null, '/users/friends')}
          className={`dashboard-left-navigation-item 
            ${(window.location.pathname).includes('/users/friends') ? 'dashboard-nav-active' : ''}`}>
          <p className="ion-person-stalker"></p>
          <p>친구 관리</p>
        </NavLink>
        <NavLink to = "/users/noties"
          className={`dashboard-left-navigation-item 
            ${(window.location.pathname) === '/users/noties' ? 'dashboard-nav-active' : ''}`}>
          <p className="ion-android-notifications"></p>
          <p>알림 보기</p>
        </NavLink>
        <NavLink to = "/users/messages"
          className={`dashboard-left-navigation-item 
            ${(window.location.pathname) === '/users/messages' ? 'dashboard-nav-active' : ''}`}>
          <p className="ion-chatbubble-working"></p>
          <p>메시지 보기</p>
        </NavLink>
        {/* <NavLink to = "/users/achievements" 
          className={`dashboard-left-navigation-item 
            ${(window.location.pathname) === '/users/achievements' ? 'dashboard-nav-active' : ''}`}>
          <p className="ion-trophy"></p>
          <p>업적 보기</p>
        </NavLink> */}
      </div>
    )
  }
}

export default DashboardNav;