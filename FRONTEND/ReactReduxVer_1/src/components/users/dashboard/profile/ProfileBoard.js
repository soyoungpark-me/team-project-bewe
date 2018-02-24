import React, { Component } from 'react';
import { default as Fade } from 'react-fade'

import { connect } from 'react-redux';
import { fetchMyProfile } from 'actions/users/UserActions';

import ProfileAvatar from './ProfileAvatar';
import Profile from './Profile';
import UserGame from './UserGame';

const fadeDuration = 0.3;

class ProfileBoard extends Component{
  constructor(props){
    super(props);

    this.state = {
      type: true,
      fadeOut: false
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

  componentWillMount(){
    this.props.fetchMyProfile();    
  }

  handleButtonChange(value) {
    this.setState({
      type: value,
      fadeOut: true
    });
  }

  renderResult(){
    if(this.state.type) {
      return <Profile profile={this.props.profile} />
    } else {
      return <UserGame />
    }
  }

  render(){
    return(
      <div className="dashboard-right-contents">
        <div className="tab-slider-nav">
          <ul className="tab-slider-tabs">
            <li className={`tab-slider-item ${(this.state.type) ? 'tab-active' : ''}`} onClick={this.onClickButtonAll}>내 정보</li>
            <li className={`tab-slider-item ${(this.state.type) ? '' : 'tab-active'}`} onClick={this.onClickButtonUnchecked}>내 게임</li>
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

function mapStateToProps(state){
  return { profile: state.user.my_profile }
}

export default connect(mapStateToProps, { fetchMyProfile })(ProfileBoard);