import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { HashLoader } from 'react-spinners';

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
      .slice(0, 5)
      .map((noti) => {
        if(noti.flag == 0) {
          return (
            <Noti noti={noti} key={noti.idx}/>
          )
        }
    });
  }

  render() {
    if(this.props.noties === undefined) {
      return (
        <div className="dashboard-loader">
          <HashLoader
            color={'#00B0FF'} 
            loading={true} 
          />
          <p>로딩 중입니다..</p>
        </div> 
      )
    } else {
      if (this.props.noties && this.props.noties.length > 5) {
        return (
          <div>
            {this.renderNoties()}
            <NavLink to='/users/noties'>
              <button className="header-more-button" onClick={this.onClickButton}>더 보기</button>
            </NavLink>
          </div>
        )
      } else if (this.props.noties && this.props.noties.length === 0) {
        return (
          <div className="dashboard-loader">
            <img src="/../public/img/empty.png" style={{"width" : 100}}/>
            <p>알림 리스트가 없습니다!</p>
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