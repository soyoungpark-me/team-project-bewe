import React, { Component } from 'react';
import { Jumbotron, Button } from 'reactstrap';

class JumbotronB extends Component{
  render(){
  return (
    <div>
      <Jumbotron style={{marginTop:"17%"}}>
      
        <h1 className="display-3">게임을 즐겨보아요</h1>
        <p className="lead">쓸말이 업성.</p>
        <hr className="my-2" />
        <p>우아아.</p>
        <p className="lead">
          <Button color="primary">Learn More</Button>
        </p>
      </Jumbotron>
    </div>
  );
}
  
};

export default JumbotronB;