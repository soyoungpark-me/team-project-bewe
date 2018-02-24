import React from 'react';
import { Player } from 'video-react';
import Slider from './Slider';

export default (props) => {
  return (
    <div style={{height:"880px"}}>
    <div>
    <iframe 
      width="100%" 
      height="100%" 
      src="https://www.youtube.com/embed/Lj6Y6JCu-l4?rel=0&autoplay=1&loop=1&playlist=Lj6Y6JCu-l4&showinfo=0&mute=1&fs=0&controls=0"
      scrolling="no"
      frameBorder="0"
      allowFullScreen
      style={{
        pointerEvents:"none", position:"absolute", zIndex:"1",
        top:"0", overflow:"hidden", maxWidth:"100%"
      }}
    />
    </div>
    <div
    style={{position:"absolute", zIndex:"2", width:"100%", height:"500px"}}
    >
      <Slider
      />
    </div>
    </div>
  );
};