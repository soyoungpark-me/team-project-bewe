import '/../style/ranks.css';

import React, { Component } from 'react';
import { default as Fade } from 'react-fade'

import RankingMenu from './RankingMenu';
import RankingList from './RankingList';

const fadeDuration = 0.3;

class RankingBoard extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      width: 0, 
      height: 0,
      type: 'user',
      fadeOut: false,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.onClickButtonGame = this.handleButtonChange.bind(this, 'game');
    this.onClickButtonUser = this.handleButtonChange.bind(this, 'user');
  }
  
  componentWillUpdate(nextProps, { fadeOut }) {
    if (fadeOut) {
      setTimeout(() => {
        this.setState({
          fadeOut: false
        })
      }, fadeDuration);
    }
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  handleButtonChange(value) {
    this.setState({
      type: value,
      fadeOut: true
    });
  }
  
  render() {
    let height = this.state.height - 60;

    return(
      <div className="container" 
           style={{"minHeight": height, "height": "100%"}}> 
        <div className="ranking-board-wrapper">
          <RankingMenu type={this.state.type} 
            onGameClick={this.onClickButtonGame} 
            onUserClick={this.onClickButtonUser} />  
            
            <Fade
              out={this.state.fadeOut}
              duration={fadeDuration}
            >
              <RankingList type={this.state.type} />       
            </Fade>
        </div>
      </div>
    )
  }
}

export default RankingBoard;