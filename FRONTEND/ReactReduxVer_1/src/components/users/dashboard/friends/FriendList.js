import React, { Component } from 'react';
import { HashLoader } from 'react-spinners';

import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { fetchFriends } from 'actions/users/FriendActions';
import Friend from './Friend';
import FriendFind from './FriendFind';
import FriendFindList from './FriendFindList';

class FriendList extends Component {
  constructor(){
    super();

    this.state = {
      page: 1
    };

    this.onClickButton = this.handleButton.bind(this);
  }

  handleButton() {
    this.setState({
      page: this.state.page + 1
    });
  }

  componentWillMount() {
    this.props.fetchFriends();    
  }

  renderFriends() {
    const userIdx = JSON.parse(localStorage.getItem('profile')).idx;

    if (this.props.type === 'all') {   
      return this.props.friends
      // .slice(0, 15 * this.state.page - 1)
      .map((friend) => {
        if (friend.flag === 1) {
          return (         
            <Friend friend={friend} key={friend.idx} type={this.props.type} />
          )
        }        
      });
    } else if (this.props.type === 'send') {
      return this.props.friends
      // .slice(0, 15 * this.state.page - 1)
      .map((friend) => {
        if (friend.flag === 0 && friend.sender_idx === userIdx) {
          return (         
            <Friend friend={friend} key={friend.idx} type={this.props.type} />
          )
        }        
      });
    } else if (this.props.type === 'receive') {
      return this.props.friends
      // .slice(0, 15 * this.state.page - 1)
      .map((friend) => {
        if (friend.flag === 0 && friend.receiver_idx === userIdx) {
          return (
            <Friend friend={friend} key={friend.idx} type={this.props.type} />
          )
        }
      })
    } else if (this.props.type === 'find') {
      return (
        <div>
          <FriendFind />
          <FriendFindList />
        </div>
      )
    }
  }

  render() {
    if(this.props.friends === undefined) {
      return (
        <div className="dashboard-loader">
          <HashLoader
            color={'#00B0FF'} 
            loading={true} 
          />
          <p>친구 리스트를 로딩하고 있습니다.</p>
        </div>
      )
    }

    if (this.props.friends && this.props.friends.length === 0 && this.props.type !== 'find') {
      return (
        <div className="dashboard-loader">
          <img src="/../public/img/empty.png" />
          <p>친구 리스트가 없습니다!</p>
        </div>
      )
    }

    else {
      if(this.props.friends && this.props.friends.length > this.state.page * 15) {
        return (
          <div>
            {this.renderFriends()}
            <button className="noti-more-button" onClick={this.onClickButton}>더 보기</button>
          </div>
        )
      } else {
        return (
          <div>
            {this.renderFriends()}
          </div>
        )
      }
    }    
  }
}

function mapStateToProps(state){
  return { friends: state.friends.all }
}

export default connect(mapStateToProps, { fetchFriends })(FriendList);