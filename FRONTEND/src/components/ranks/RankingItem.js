import React from 'react';

import RankingUser from './RankingUser';
import RankingGame from './RankingGame';

const RankingBuyItem = (props) => {
  let rank;

  if (props.item.rank === 1) {
    rank = (
      <td className="ranking-rank-wrapper">
        <p>1.</p>
        <img className="ranking-rank-img" src={"/../public/img/gold-medal.png"} />
      </td>
    );
  } else if (props.item.rank === 2) {
    rank = (
      <td className="ranking-rank-wrapper">
        <p>2.</p>
        <img className="ranking-rank-img" src={"/../public/img/silver-medal.png"} />
      </td>
    );
  } else if (props.item.rank === 3) {
    rank = (
      <td className="ranking-rank-wrapper">
        <p>3.</p>
        <img className="ranking-rank-img" src={"/../public/img/bronze-medal.png"} />
      </td>
    );
  } else {
    rank = (
      <td className="ranking-rank-wrapper">
        <p>{props.item.rank}.</p>
      </td>
    );
  }

  if (props.type === 'game') {
    return (
      <tr className="ranking-item-wrapper">
        {rank}
        <td><RankingGame game={props.item.data} /></td>
        <td className="ranking-rank-wrapper">
          <p className="ranking-score"> {props.item.count}</p>
        </td>
      </tr>
    )
  } else if (props.type === 'user') {
    return (
      <tr className="ranking-item-wrapper">
        {rank}
        <td><RankingUser user={props.item.data} /></td>
        <td className="ranking-rank-wrapper">
          <p className="ranking-score"> {props.item.count}</p>
        </td>
      </tr>
    )
  }  
}

export default RankingBuyItem;