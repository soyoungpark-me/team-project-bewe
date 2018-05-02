import React, { Component } from 'react';
import { default as Fade } from 'react-fade'

import FriendList from './FriendList';

const fadeDuration = 0.3;

export default class FriendBoard extends Component {
  constructor(props){
    super(props);

    this.state = {
      type: 'all',
      fadeOut: false
    }

    this.onClickButtonAll = this.handleButtonChange.bind(this, 'all');
    this.onClickButtonSend = this.handleButtonChange.bind(this, 'send');
    this.onClickButtonReceive = this.handleButtonChange.bind(this, 'receive');
    this.onClickButtonFind = this.handleButtonChange.bind(this, 'find');
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

  handleButtonChange(value) {
    this.setState({
      type: value,
      fadeOut: true
    });
  }
 
  render() {
    return (      
      <div className="dashboard-right-contents">
        <div className="tab-slider-nav">
          <ul className="tab-slider-tabs">
            <li className={`tab-slider-item ${(this.state.type === 'all') ? 'tab-active' : ''}`} 
              onClick={this.onClickButtonAll}>내 친구</li>
            <li className={`tab-slider-item ${(this.state.type === 'send') ? 'tab-active' : ''}`}
              onClick={this.onClickButtonSend}>보낸 요청</li>
            <li className={`tab-slider-item ${(this.state.type === 'receive') ? 'tab-active' : ''}`}
              onClick={this.onClickButtonReceive}>받은 요청</li>
            <li className={`tab-slider-item ${(this.state.type === 'find') ? 'tab-active' : ''}`}
              onClick={this.onClickButtonFind}>친구 찾기</li>
          </ul>
        </div>  
        <Fade
          out={this.state.fadeOut}
          duration={fadeDuration}
        >
          <FriendList type={this.state.type} />
        </Fade>
      </div>
    )
  }
}