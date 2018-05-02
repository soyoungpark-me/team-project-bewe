import React, { Component } from 'react';
import { Card, CardImg, CardTitle, Badge, CardText, CardImgOverlay, Button } from 'reactstrap';
import Moment from 'react-moment';
import {postGamePurchase} from '../../actions/store/StoreAction';
import {connect} from 'react-redux';



function renderBadge(genre) {
  let color = '';

  if (genre === 'AOS') {
    color = "danger";
  } else if (genre === 'FPS') {
    color = "secondary";
  } else if (genre === 'RPG') {
    color = "primary";
  } else {
    color = "warning";
  }

  return (
    <Badge className="game-list-item-genre" color={color}>{genre}</Badge>
  )
}

class ContentsCard extends Component{
  render() {
    return (
      <Card className="store-game-wrapper">
        <div className="store-game-image-wrapper">
          <CardImg className="avatar-image"
                   src={(this.props.image) ? this.props.image : "http://genknews.genkcdn.vn/zoom/220_160/2017/thumbnail-4x3-34722014736-2d241425f9-k-1495531031736-crop-1495531041612.jpg"}
                   alt="Card image cap"/>
        </div>
        <div className="store-game-info-wrapper">
          <CardTitle>{this.props.title}</CardTitle>
          <Moment className="store-game-created-at" format="YYYY/MM/DD">{this.props.created_at}</Moment>
          <hr/>
          <CardText>
            {this.props.description}
          </CardText>
        </div>
        {/*<Button onClick={() => {this.postGamePurchase(props.idx)}} color="primary" outline>구입하기</Button>*/}
        <CardImgOverlay>
          <div className="store-game-badge">{renderBadge(this.props.genre)}</div>
        </CardImgOverlay>
        <Button onClick={() => {
          this.props.postGamePurchase(this.props.idx)
        }}>구입하기</Button>
      </Card>
    )
  }
}

// export default ContentsCard;

export default connect(null, {postGamePurchase})(ContentsCard);