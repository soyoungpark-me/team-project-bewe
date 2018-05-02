import '/../style/store.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStoreLists, postGamePurchase } from 'actions/store/StoreAction';
import ContentsCard from '../CMS/ContentsCard';

class StoreLists extends Component{
  constructor(props){
    super(props);
    this.state = {};
  }
  componentWillMount(){
    this.props.fetchStoreLists();
  }

  renderLists(){
    return this.props.contents.map((data, index) => {
      console.log('data',data);
      return (
          <ContentsCard
            idx={data.idx}
            index={index+1}
            title={data.title}
            genre={data.genre}
            description={data.description}
            image={data.image}
          />
          // <button onClick={() => {this.props.postGamePurchase(data.idx)}}>구매하기</button>
      )
    })
  }

  render(){
    return(
      <div className="container">
        <div className="ranking-board-wrapper">
          <div className="ranking-top-menu">
            <h2 className="ranking-top-text">BeWe Games</h2>
            <hr/>  
            <h3 className="ranking-middle-text">승인된 게임 목록</h3>
          </div>
          <div>
            {this.renderLists()}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { contents: state.store.all }
}

export default connect(mapStateToProps, {fetchStoreLists, postGamePurchase})(StoreLists);


// export default StoreLists;