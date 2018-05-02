import React from 'react';
import { Card, CardImg, CardTitle, Badge, CardText, CardImgOverlay, Button } from 'reactstrap';

const GameCard = (props) => {
  return (    
    <Card className="dashboard-game-wrapper">   
      <div className="dashboard-game-image-wrapper">
        <CardImg className="avatar-image" src={(props.game.image) ? props.game.image : "http://genknews.genkcdn.vn/zoom/220_160/2017/thumbnail-4x3-34722014736-2d241425f9-k-1495531031736-crop-1495531041612.jpg"} alt="Card image cap" />
      </div>
      <div className="dashboard-game-info-wrapper">
        <CardTitle>{props.game.title}</CardTitle>
        <CardText>
          {props.game.description}
        </CardText>
        <Button color="primary" outline onClick={ 
          ()=>{
              this.context.router.history.push(
                  `/gamegamelist/1`
              );
          }} >자세히 보기
        </Button>
      </div>      
    </Card>
  )
}

export default GameCard;