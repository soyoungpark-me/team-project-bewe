import '/../style/users.css';

import React, { Component } from 'react';
import { default as Fade } from 'react-fade'

import DashboardLeft from './DashboardLeft';
import DashboardRight from './DashboardRight';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
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
  render() {
    let height = this.state.height - 60;

    return(
      <div className="container" 
           style={{"backgroundColor": "white", "padding": "0", 
                   "minHeight": height, "height": "100%"}}>
        <DashboardLeft />       
        
        <div id="dashboard-right-wrapper">
          <DashboardRight height={height}/>
        </div> 
      </div>
    )
  }
}

export default Dashboard;