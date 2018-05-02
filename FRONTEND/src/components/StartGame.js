import React, {Component} from 'react';

class StartGame extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.createGameRoom = this.createGameRoom.bind(this);
  }

  createGameRoom(e) {
    e.preventDefault();

  }

  render() {
    return (
      <div className="createGameRoomForm">
        <h1>게임이 시작되었다 !</h1><br/>
        GOOOOOOOOOOOD
      </div>
    );
  }
}

export default StartGame;