import React from 'react';
import { HashLoader } from 'react-spinners';
import { Progress } from 'reactstrap';

const RankingMyInfo = (props) => {
  if (!props.time || !props.buy) {
    return (
      <div className="ranking-my-zone-wrapper ranking-my-zone-loader">
        <HashLoader
            color={'#00B0FF'} 
            loading={true} 
        />
        <p>유저 랭킹 정보를 로딩하고 있습니다.</p>
      </div>
    )
  } else {
    let buyPercent = 0, timePercent = 0;

    if (props.buyFirst !== 0) {
      buyPercent = parseInt(props.buy.count / props.buyFirst * 100);
    }
    if (props.timeFirst !== 0) {
      timePercent = parseInt(props.time.count / props.timeFirst * 100);
    }

    return (
      <div className="ranking-my-zone-wrapper">
        <div className="ranking-my-zone-user-avatar-wrapper">
          <img className="avatar-image"           
            src={(props.time.data.avatar) !== null ? 
              props.time.data.avatar : "/../public/img/avatar.png"} />
        </div>
        <div className="ranking-my-zone-user-info">
          <h4>{props.time.data.nickname}</h4>
          <h6>{props.time.data.email}</h6>
        </div>
        <div className="ranking-my-zone-rank-wrapper">
          <div className="ranking-my-zone-rank-item">
            <div className="ranking-my-zone-left">
              <span className="ion-card"></span>
              <p>게임 수</p>
            </div>
            <div className="ranking-my-zone-right">
              <div className="ranking-my-zone-progress-bar-wrapper">
                <Progress color="info" value={buyPercent} />
              </div>
              <p className="ranking-my-zone-rank-value">{props.buy.rank}</p>
              <p className="ranking-my-zone-rank-text">위</p>
              <p className="ranking-my-zone-point-value">{props.buy.count}</p>
              <p className="ranking-my-zone-point-text">pt.</p>
              <p className="ranking-my-zone-left-value">
                1위까지 <strong>{props.buyFirst - props.buy.count}</strong> 포인트 남았습니다!
              </p>
            </div>
          </div>
          <div className="ranking-my-zone-rank-item">
            <div className="ranking-my-zone-left">
              <span className="ion-android-time"></span>
              <p>시간</p>
            </div>
            <div className="ranking-my-zone-right">
            <div className="ranking-my-zone-progress-bar-wrapper">
                <Progress color="info" value={timePercent} />
              </div>
              <p className="ranking-my-zone-rank-value">{props.time.rank}</p>
              <p className="ranking-my-zone-rank-text">위</p>
              <p className="ranking-my-zone-point-value">{props.time.count}</p>
              <p className="ranking-my-zone-point-text">pt.</p>
              <p className="ranking-my-zone-left-value">
                1위까지 <strong>{props.timeFirst - props.time.count}</strong> 포인트 남았습니다!
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RankingMyInfo;