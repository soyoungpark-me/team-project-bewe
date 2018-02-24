import React, { Component } from 'react';
import { default as Fade } from 'react-fade'
import { HashLoader } from 'react-spinners';
import { fetchOtherProfile, fetchFriendsGameLists } from 'helper.js';

import ProfileAvatar from '../profile/ProfileAvatar';
import Profile from '../profile/Profile';
import UserGame from '../profile/UserGame';

const fadeDuration = 0.3;

class FriendProfile extends Component{
  constructor(props){
    super(props);

    this.state = {
      type: true,
      fadeOut: false,
      profile: '',
      checkFriends: false,
      gameList: []
    }

    this.onClickButtonAll = this.handleButtonChange.bind(this, true);
    this.onClickButtonUnchecked = this.handleButtonChange.bind(this, false);
  }

  componentWillUpdate(nextProps, { fadeOut }) {
    if (fadeOut) {
      setTimeout(() => {
        this.setState({
          fadeOut: false
        })
      }, fadeDuration);
    }
  }

  async componentWillMount(){
    const profile = await fetchOtherProfile(this.props.match.params.idx);
    const gameList = await fetchFriendsGameLists(this.props.match.params.idx);

    this.setState({
      profile: profile.data.result
    });

    if (gameList.data.result) {
      this.setState({
        checkFriends: true,
        gameList: gameList.data.result
      })
    }
  }

  handleButtonChange(value) {
    this.setState({
      type: value,
      fadeOut: true
    });
  }

  renderResult(){
    if(this.state.type) {
      return <Profile profile={this.state.profile} />
    } else {
      return <UserGame gameList={this.state.gameList} />
    }
  }

  render(){  
    if (this.state.profile === '') {
      return (
        <div className="dashboard-loader" style={{marginTop: 0, paddingTop: "15%"}}>
          <HashLoader
            color={'#00B0FF'} 
            loading={true} 
          />
          <p>친구의 정보를 로딩하고 있습니다.</p>
        </div>
      )
    } 
    if (!this.state.checkFriends) {
      return (
        <div className="dashboard-loader" style={{marginTop: 0, paddingTop: "15%"}}>
          <HashLoader
            color={'#00B0FF'} 
            loading={true} 
          />
          <p>아직 친구가 아닙니다. 친구 신청을 먼저 해주세요!</p>
        </div>
      )
    } else {    
      return(
        <div className="dashboard-right-contents">
          <div className="tab-slider-nav">
            <ul className="tab-slider-tabs">
              <li className={`tab-slider-item ${(this.state.type) ? 'tab-active' : ''}`} onClick={this.onClickButtonAll}>친구의 프로필</li>
              <li className={`tab-slider-item ${(this.state.type) ? '' : 'tab-active'}`} onClick={this.onClickButtonUnchecked}>친구의 게임</li>
            </ul>
          </div>  
          <Fade
            out={this.state.fadeOut}
            duration={fadeDuration}
          >
            {this.renderResult()} 
          </Fade>
        </div>
      )
    }
  }
}

export default FriendProfile;