import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashLoader } from 'react-spinners';
import FriendFindCard from './FriendFindCard';

class FriendFindList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      friendList: '',
      sendList: '',
      userIdx: JSON.parse(localStorage.getItem('profile')).idx
    }
  }

  componentDidMount() {
    let friendList = [], sendList = [], rejectList = [];

    this.props.all.map((item) => {
      if (item.flag === 1) {
        if (item.sender_idx === this.state.userIdx) {
          friendList.push(item.receiver_idx);
        } else if (item.receiver_idx === this.state.userIdx) {
          friendList.push(item.sender_idx);
        }  
      } else if (item.flag === 0) {
        if (item.sender_idx === this.state.userIdx) {
          sendList.push(item.receiver_idx);
        } else if (item.receiver_idx === this.state.userIdx) {
          sendList.push(item.sender_idx);
        }        
      } else if (item.flag === 2) {
        if (item.sender_idx === this.state.userIdx) {
          rejectList.push(item.receiver_idx);
        } else if (item.receiver_idx === this.state.userIdx) {
          rejectList.push(item.sender_idx);
        } 
      }
    });

    this.setState({friendList, sendList, rejectList});
  }

  componentDidUpdate() {
  }

  renderFriends() {
    let type = '';
    
    return this.props.friends.result
    // .slice(0, 15 * this.state.page - 1)
    .map((friend) => {
      if (this.state.friendList && this.state.friendList.includes(friend.idx)) {
        return (
          <FriendFindCard friend={friend} key={friend.idx} type="find" />
        )
      } else if (this.state.sendList && this.state.sendList.includes(friend.idx)) {
        return (
          <FriendFindCard friend={friend} key={friend.idx} type="send" />
        )
      } else if (this.state.rejectList && this.state.rejectList.includes(friend.idx)) {
        return ('')
      } else if (this.state.userIdx === friend.idx) {
        return ('')
      } else {
        return (
          <FriendFindCard friend={friend} key={friend.idx} type="list" />
        )
      }     
    });
  }

  render() {
    if (this.props.friends === undefined || this.props.friends.result === undefined) {
      return (
        <div className="dashboard-loader">
          <HashLoader
            color={'#00B0FF'} 
            loading={true} 
          />
          <p>친구 리스트를 로딩하고 있습니다.</p>
        </div>
      )
    } else if (this.props.friends.result && this.props.friends.result.length === 0) {
      return (
        <div className="dashboard-loader">
          <img src="/../public/img/empty.png" />
          <p>해당 ID를 가진 친구가 없습니다!</p>
        </div>
      )
    } else {
      return (
        <div className="friend-find-list-wrapper">
          {this.renderFriends()}
        </div>
      )
    }    
  }
}

function mapStateToProps(state){
  return { 
    all: state.friends.all,
    friends: state.friends.find 
  }
}

export default connect(mapStateToProps, null)(FriendFindList);