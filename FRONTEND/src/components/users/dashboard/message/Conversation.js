import React, { Component } from 'react';
import Moment from 'react-moment';
import axios from 'axios';

import { fetchOtherProfile } from 'helper';

let otherUserIdx = '';

class Conversation extends Component {
  constructor(props){
    super(props);

    const userIdx = JSON.parse(localStorage.getItem('profile')).idx;  

    if(this.props.conversation.users_idx_1 === userIdx) {
      otherUserIdx = this.props.conversation.users_idx_2;
    } else if(this.props.conversation.users_idx_2 === userIdx) {
      otherUserIdx = this.props.conversation.users_idx_1;
    }

    this.state = {
      profile: ''
    }
  }

  async componentWillMount(){
    const profile = await fetchOtherProfile(otherUserIdx);

    this.setState({
      profile: profile.data.result
    });
  }
  
  render(){
    if(this.state.profile === undefined) {
      return <div>Loading...</div>
    } else {
      return (
        <div className={`conversation-list-item ${(this.props.flag) ? 'active' : ''}`}
            onClick={() => this.props.onConversationClick(
            this.props.conversation.idx, this.state.profile.nickname)}>
          <div className="conversation-list-left">
            <div className="noti-avatar-wrapper">
              <img className="avatar-image" 
                src={(this.state.profile.avatar) !== null ? 
                  this.state.profile.avatar : 
                  "/../public/img/avatar.png"} />
            </div>
          </div>

          <div className="conversation-list-right">
            <p className="conversation-list-nickname">
              {this.state.profile.nickname}
            </p>
            <p className="conversation-list-date">
              <Moment fromNow locale="ko">{this.props.conversation.updated_at}</Moment> &nbsp;
              <Moment format="YYYY/MM/DD">{this.props.conversation.updated_at}</Moment>
            </p>            
            <p className="conversation-list-icon"><span className="ion-arrow-right-b"></span></p>
          </div>
          <p className="conversation-list-last-message">
            {this.props.conversation.last_message}
          </p>
        </div>
      )
    }
  }
}

export default Conversation;