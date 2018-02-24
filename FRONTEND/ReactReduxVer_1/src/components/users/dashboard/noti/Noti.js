import React, { Component, PropTypes } from 'react';
import Moment from 'react-moment';
import Parser from 'html-react-parser';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkNoti } from 'actions/users/NotiActions';

const icon = (type) => {
  if (type === 'friend') {
    return (<span className="ion-person-add noti-list-icon" />)
  }
}

class Noti extends Component {
  constructor(){
    super();

    this.onCheckNoti = this.onCheckNoti.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object
  };

  onCheckNoti() {
    if (this.props.checkNoti(this.props.noti.idx)) {
      this.context.router.history.push(this.props.noti.url);
    }
  }

  render(){
    return(
      <div onClick={this.onCheckNoti} 
        className={`noti-wrapper ${(this.props.noti.flag === 0) ? 'noti-checked' : ''}`}>
        <div className="noti-avatar-wrapper">
          <img className="avatar-image" src={(this.props.noti.image) !== null ? this.props.noti.image : "/../public/img/logo.png"}/>
        </div>
        <div className="noti-contents">
          <p>{Parser(this.props.noti.contents)}</p>
          <p>{icon(this.props.noti.type)}
            <Moment className="noti-list-date" fromNow locale="ko">
              {this.props.noti.created_at}
            </Moment>
          </p>
        </div>
      </div>
    )
  }
}

export default connect(null, { checkNoti })(Noti);