import React from 'react';
import Moment from 'react-moment';


const StoreItem = (props) => {
  return (
    <div className="store-gamelist-item">
      <div className="store-image-wrapper">
        <img className="store-image-image" src={(props.item.image) ? props.item.image : '/../public/image/game.png'} />
      </div>
      {props.item.title}
      {props.item.description}
      <Moment format="YYYY/MM/DD" style={{"marginRight": "10px"}}>
            {props.item.created_at}
          </Moment>
          (<Moment fromNow locale="ko" style={{"color": "#666666"}}>
            {props.item.created_at}
          </Moment>)
    </div>
  )
}

export default StoreItem;