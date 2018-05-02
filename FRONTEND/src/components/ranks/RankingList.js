import React, { Component } from 'react';

import { HashLoader } from 'react-spinners';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import { fetchGameHasUserRank, fetchGamePlayTimeRank } 
  from 'actions/ranks/GameRankAction';
import { fetchUserHasGameRank, fetchUserPlayTimeRank } 
  from 'actions/ranks/UserRankAction';

import RankingItem from './RankingItem';
import RankingMyInfo from './RankingMyInfo';

class RankingList extends Component{
  constructor(props){
    super(props);
  }

  fetchUser() {
    this.props.fetchUserHasGameRank();
    this.props.fetchUserPlayTimeRank();
  }

  fetchGame() {
    this.props.fetchGameHasUserRank();
    this.props.fetchGamePlayTimeRank();
  }

  componentWillMount() {
    this.fetchUser();
  }

  componentWillUpdate(nextProps) {
    if (this.props.type !== nextProps.type) {
      if (nextProps.type === 'game') {
        this.fetchGame();
      } else if (nextProps.type === 'user') {
        this.fetchUser();
      }
    }
  }

  renderTable(type){
    let title = '';

    if (type === 'time') {
      if (this.props.type === 'game') {
        title = (
          <div className="ranking-title-wrapper">
            <span className="ion-android-time"></span>
            <p>플레이 된 시간</p>
          </div>
        );
      } else if (this.props.type === 'user') {
        title = (
          <div className="ranking-title-wrapper">
            <span className="ion-android-time"></span>
            <p>플레이 한 시간</p>
          </div>
        );
      }
    } else if (type === 'buy') {
      if (this.props.type === 'game') {
        title = (
          <div className="ranking-title-wrapper">
            <span className="ion-card"></span>
            <p>구매한 게임 수</p>
          </div>
        );
      } else if (this.props.type === 'user') {
        title = (
          <div className="ranking-title-wrapper">
            <span className="ion-person-stalker"></span>
            <p>보유한 유저 수</p>
          </div>
        );
      }
    }

    return (
      <div className="ranking-table-wrapper">
        <hr/>
        <h5 className="ranking-table-title">{title}</h5>
        <Table striped className="ranking-table">
          <thead className="ranking-table-thead">
            <tr>
              <th width="10%">RANK</th>
              <th width="70%">{(this.props.type === 'game' ? "GAME" : "USER")}</th>
              <th width="20%">POINT</th>
            </tr>
          </thead>     
          <tbody>
            {this.renderItems(type)}
          </tbody>   
        </Table>
      </div>
    )
  }

  renderItems(type){    
    let returnPropsType = '';

    if (type === 'buy') {
      returnPropsType = this.props.buy;
    } else if (type === 'time') {
      returnPropsType = this.props.time;
    }

    if (returnPropsType.all) {
      return returnPropsType.all
      .slice(0, 15)
      .map((item, index) => {
        return (
          <RankingItem item={item} type={this.props.type} key={index} />
        )
      });
    }    
  }

  render() {   
    if (!this.props.buy.all && !this.props.time.all) {
      return (
        <div className="dashboard-loader">
          <HashLoader
            color={'#00B0FF'} 
            loading={true} 
          />
          <p>랭킹 정보를 로딩하고 있습니다.</p>
        </div>
      )
    } else {
      return (
        <div>
          {(this.props.type === 'user' && localStorage.getItem('token') ? 
            <RankingMyInfo 
              buyFirst={this.props.buy.all && this.props.buy.all[0] ? this.props.buy.all[0].count : ''}
              timeFirst={this.props.time.all && this.props.time.all[0] ? this.props.time.all[0].count : ''}
              buy={this.props.buy.currentUser} 
              time={this.props.time.currentUser} /> : '')}
          {this.renderTable('buy')}   
          {this.renderTable('time')}       
        </div>
      )
    }
  }
}


function mapStateToProps(state){
  return { 
    time: state.ranks.time,
    buy: state.ranks.buy
  }
}

export default connect(mapStateToProps, 
  { fetchGameHasUserRank, 
    fetchGamePlayTimeRank,
    fetchUserHasGameRank,
    fetchUserPlayTimeRank })(RankingList);