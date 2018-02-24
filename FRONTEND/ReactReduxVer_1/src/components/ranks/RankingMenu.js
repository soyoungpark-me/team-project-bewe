import React from 'react';

const RankingMenu = (props) => {
  let returnTypeText = '';

  if (props.type === 'game') {
    returnTypeText = 'Game Ranking';
  } else if (props.type ==='user') {
    returnTypeText = 'User Ranking';
  }

  return (
    <div className="ranking-top-menu">
      <h2 className="ranking-top-text">BeWe Ranks</h2>
      <div className="ranking-top-item-wrapper">        
        <button onClick={props.onUserClick} className={`ranking-top-item ${props.type === 'user' ? 'active' : ''}`}>USER</button>
        <button onClick={props.onGameClick} className={`ranking-top-item ${props.type === 'game' ? 'active' : ''}`}>GAME</button>
      </div>    

      <hr/>  

      <h3 className="ranking-middle-text">
        {returnTypeText}
      </h3>
    </div>
  )
}

export default RankingMenu;