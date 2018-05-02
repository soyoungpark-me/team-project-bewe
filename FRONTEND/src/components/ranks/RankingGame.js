import React from 'react';

const RankingGame = (props) => {
  return (
    <div className="ranking-item">
      <div className="ranking-game-image-wrapper">
        <img className="avatar-image"           
          src={(props.game.image) !== null ? 
            props.game.image : "/../public/img/avatar.png"} />
      </div>
      <div className="ranking-user-info">
        <p>{props.game.title}</p>
        <p>{props.game.description}</p>
      </div>      
    </div>
  )
}

export default RankingGame;