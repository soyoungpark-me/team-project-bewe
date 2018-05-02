import React, { Component } from 'react';
import { default as Fade } from 'react-fade'

import NotiList from './NotiList';

const fadeDuration = 0.3;

export default class Noti extends Component {
  constructor(props){
    super(props);

    this.state = {
      type: true,
      fadeOut: false,
      page: 1
    }

    this.onClickButtonAll = this.handleButtonChange.bind(this, true);
    this.onClickButtonUnchecked = this.handleButtonChange.bind(this, false);
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
    this.setState({
      page: 1
    });
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
            <li className={`tab-slider-item ${(this.state.type) ? 'tab-active' : ''}`} onClick={this.onClickButtonAll}>모든 알림</li>
            <li className={`tab-slider-item ${(this.state.type) ? '' : 'tab-active'}`} onClick={this.onClickButtonUnchecked}>읽지 않은 알림</li>
          </ul>
        </div>   
        
        <Fade
          out={this.state.fadeOut}
          duration={fadeDuration}
        >
          <NotiList type={this.state.type} page={this.state.page} />
        </Fade>
      </div>
    )
  }
}