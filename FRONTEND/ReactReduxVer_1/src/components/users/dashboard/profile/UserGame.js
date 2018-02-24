import React, { Component } from 'react';

import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchPurchasedLists } from 'actions/store/StoreAction';

import GameCard from './GameCard';

class UserGame extends Component {
  componentWillMount(){
    if (!this.props.gameList) {
      this.props.fetchPurchasedLists();    
    }
  }

  renderGames(){
    let gameList = '';

    if (!this.props.gameList) {
      gameList = this.props.games;
    } else {
      gameList = this.props.gameList;
    }

    if (gameList.length === 0) {
      return (
        <div className="dashboard-loader">
          <img src="/../public/img/empty.png" />
          <p>구입한 게임이 없습니다!</p>
        </div>
      )
    } else {
      return gameList
        .map((game) => {
          return (         
            <GameCard game={game} key={game.idx}/>
          )       
      });
    }    
  }

  render(){
    return(
      <div>
        {this.renderGames()}
      </div>
    )
  }
}

function mapStateToProps(state){
  return { games: state.store.all }
}

export default connect(mapStateToProps, { fetchPurchasedLists })(UserGame);