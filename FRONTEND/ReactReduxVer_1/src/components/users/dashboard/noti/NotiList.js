import React, { Component } from 'react';
import { HashLoader } from 'react-spinners';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { fetchNoties } from 'actions/users/NotiActions';
import Noti from './Noti';

const fadeDuration = 0.3;

class NotiList extends Component {
  constructor(props){
    super(props);

    this.state = {
      page: this.props.page
    }

    this.onClickButton = this.onClickButton.bind(this);
  }

  onClickButton() {
    this.setState({
      page: this.state.page + 1
    })
  }

  componentWillMount(){
    this.props.fetchNoties();    
  }

  renderNoties(){
    return this.props.noties
      .slice(0, 15 * this.state.page - 1)
      .map((noti) => {
        if(this.props.type) {
          return (         
            <Noti noti={noti} key={noti.idx}/>
          )
        } else {
          if(noti.flag == 0) {
            return (
              <Noti noti={noti} key={noti.idx}/>
            )
          }
        }
    });
  }

  render() {    
    if (this.props.noties === undefined) {
      return (
        <div className="dashboard-loader">
          <HashLoader
            color={'#00B0FF'} 
            loading={true} 
          />
          <p>알림을 로딩하고 있습니다.</p>
        </div>
      )
    }

    if (this.props.noties && this.props.noties.length === 0) {
      return (
        <div className="dashboard-loader">
          <img src="/../public/img/empty.png" />
          <p>도착한 알림이 없습니다!</p>
        </div>
      )
    }

    else {
      if(this.props.noties && this.props.noties.length > this.state.page * 15) {
        return(
          <div>
            {this.renderNoties()}
            <button className="noti-more-button" onClick={this.onClickButton}>더 보기</button>
          </div>
        )
      } else {
        return(
          <div>
            {this.renderNoties()}
          </div>
        )
      }
    }    
  }
}

function mapStateToProps(state){
  return { noties: state.noties.all }
}

export default connect(mapStateToProps, { fetchNoties })(NotiList);