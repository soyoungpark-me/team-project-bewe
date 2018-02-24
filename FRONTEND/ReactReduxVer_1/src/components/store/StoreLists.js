import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPurchasedLists } from '../../actions/store/StoreAction';
import StoreItem from './StoreItem';

class StoreLists extends Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  componentWillMount(){
    this.props.fetchPurchasedLists();
  }

  renderLists(){
    return this.props.contents.map((data) => {
      return (
        <StoreItem key={data.idx} item={data} />
      )
    })
  }

  render(){
    return(
      <div className="container" 
           style={{"height": "100%"}}> 
        <div className="store-board-wrapper">      
          {this.renderLists()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { contents: state.store.all }
}

export default connect(mapStateToProps, {fetchPurchasedLists})(StoreLists);