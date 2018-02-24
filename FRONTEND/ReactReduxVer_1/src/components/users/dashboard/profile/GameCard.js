import React from 'react';
import { Card, CardImg, CardTitle, Badge, CardText, CardImgOverlay, Button } from 'reactstrap';

const GameCard = (game) => {
  return(
    <Card className="dashboard-game-wrapper">    
      <div className="dashboard-game-image-wrapper">
        <CardImg className="avatar-image" src={(game.game.image) ? game.game.image : "http://genknews.genkcdn.vn/zoom/220_160/2017/thumbnail-4x3-34722014736-2d241425f9-k-1495531031736-crop-1495531041612.jpg"} alt="Card image cap" />
      </div>
      <div className="dashboard-game-info-wrapper">
        <CardTitle>{game.game.title}</CardTitle>
        <CardText>
          {game.game.description}
        </CardText>
        <Button color="primary" outline onClick={ 
          ()=>{
              this.context.router.history.push(
                  `/gamegamelist/1`
              );
          }} >자세히 보기
        </Button>
        {/* <CardImgOverlay>
            <div className="leftCenter"><h5><Badge color="danger">HOT!</Badge></h5></div>
        </CardImgOverlay>     */}
      </div>      
    </Card>
  )
}

export default GameCard;