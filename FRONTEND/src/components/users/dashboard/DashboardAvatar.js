import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMyProfile } from 'actions/users/UserActions';

class DashboardAvatar extends Component{  
  componentWillMount(){
    this.props.fetchMyProfile();
  }
  render() {
    return(
      <div className="dashboard-avatar-wrapper">
        <img className="avatar-image" 
        src={(this.props.profile.avatar) ? this.props.profile.avatar : "/../public/img/avatar.png"}/>
      </div>
    )
  }
}

function mapStateToProps(state){
  return { profile: state.user.my_profile }
}

export default connect(mapStateToProps, { fetchMyProfile })(DashboardAvatar);