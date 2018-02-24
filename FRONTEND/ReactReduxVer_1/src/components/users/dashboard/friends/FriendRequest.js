import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { rejectFriendRequest, acceptFriendRequest, 
  cancelFriendRequest, fetchFriends } from 'actions/users/FriendActions';

import Moment from 'react-moment';
import { Button } from 'reactstrap';

class FriendRequest extends Component {
  constructor(){
    super();

    this.onRejectFriendRequest = this.onRejectFriendRequest.bind(this);
    this.onAcceptFriendRequest = this.onAcceptFriendRequest.bind(this);
    this.onCancelFriendRequest = this.onCancelFriendRequest.bind(this);
    
    this.state = {
      update: false
    }
  }

  onRejectFriendRequest() {
    if (confirm('친구 요청을 거절하시겠습니까?')) {
      this.props.rejectFriendRequest(this.props.idx)
        .then(() => {
          this.props.fetchFriends();
        });
    }
  }

  onAcceptFriendRequest() {
    if (confirm('친구 요청을 수락하시겠습니까?')) {
      this.props.acceptFriendRequest(this.props.idx)
        .then(() => {
          this.props.fetchFriends();
        });
    }
  }

  onCancelFriendRequest() {
    if (confirm('친구 요청을 취소하시겠습니까?')) {
      this.props.cancelFriendRequest(this.props.idx)
        .then(() => {
          this.props.fetchFriends();
        });
    }
  }

  renderButton() {
    if (this.props.type === 'send') {
      return (
        <Button className="friend-request-button cancel" onClick={this.onCancelFriendRequest} >
          친구 요청 취소
        </Button>
      )
    } else if (this.props.type === 'receive') {
      return (
        <div className="friend-request-button-wrapper">
          <Button className="friend-request-button accept" onClick={this.onAcceptFriendRequest}>
            수락
          </Button>
          <Button className="friend-request-button reject" onClick={this.onRejectFriendRequest}>
            거절
          </Button>
        </div>
      )
    }
  }
  render() {
    return (
      <div className="friend-request-card-wrapper">
        <div className="friend-request-card-avatar-wrapper">
          <img className="avatar-image" src={(this.props.profile.avatar) !== null 
            ? this.props.profile.avatar : "/../public/img/avatar.png"}/>
        </div>
        <p className="friend-request-card-id">{this.props.profile.id}</p>
        <p className="friend-request-card-date">
          <Moment format="YYYY/MM/DD" style={{"marginRight": "10px"}}>
            {this.props.profile.created_at}
          </Moment>
          (<Moment fromNow locale="ko" style={{"color": "#666666"}}>
            {this.props.profile.created_at}
          </Moment>)
        </p>

        {this.renderButton()}
      </div>
    )
  }
}

export default connect(null, 
  { rejectFriendRequest, acceptFriendRequest,
    cancelFriendRequest, fetchFriends })(FriendRequest);