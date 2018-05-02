import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchContents, fetchContentsDetail } from "../../actions/CMS/CMSAction";

import ContentsDetail from './ContentsDetail';

class ContentsList extends Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  componentWillMount(){
    this.props.fetchContents();
  }


  renderContents() {
    return this.props.contents.map((data, index) => {
      return (
        <ContentsDetail
          idx={data.idx}
          index={index+1}
          flag={data.flag}
          title={data.title}
          genre={data.genre}
          description={data.description}
          image={data.image}
          type="cms"
        />
      )
    });
  };

  render(){
    if (this.props.contents === '') {
      return (
        <div className="dashboard-loader" style={{marginTop: 0, paddingTop: "15%"}}>
          <HashLoader
            color={'#00B0FF'} 
            loading={true} 
          />
          <p>친구의 정보를 로딩하고 있습니다.</p>
        </div>
      )
    } else {
      return(
        <div className="container">
          <div className="ranking-board-wrapper">
            <div className="ranking-top-menu">
              <h2 className="ranking-top-text">BeWe Games</h2>
              <hr/>  
              <h3 className="ranking-middle-text">내가 등록한 컨텐츠</h3>
            </div>
            <div>
              <div className="cms-top-wrapper">
                <span style={{width: "15%"}}>NO.</span>
                <span style={{width: "55%"}}>TITLE</span>
                <span style={{width: "15%"}}>GENRE</span>
                <span style={{width: "15%"}}>MORE</span>
              </div>
              {this.renderContents()}
            </div>
          </div>
        </div>
      );
    }
  }
}
function mapStateToProps(state){
  return { contents: state.CMS.all }
}


export default connect(mapStateToProps, { fetchContents, fetchContentsDetail })(ContentsList);