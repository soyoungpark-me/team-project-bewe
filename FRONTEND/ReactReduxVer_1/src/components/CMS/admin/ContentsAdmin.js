import React, { Component } from 'react';
import { HashLoader } from 'react-spinners';
import { connect } from 'react-redux';
import { allowContents, fetchRequestAllowList } from 'actions/CMS/CMSAction';
import ContentsDetail from '../ContentsDetail';

class ContentsAdmin extends Component {
  constructor(props){
    super(props);
    this.state={}
  }

  componentWillMount(){
    this.props.fetchRequestAllowList();
  }

  renderLists(){
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
          onAllowClick={(idx) => {this.props.allowContents(idx)}}
          type="admin"
        />
      )
    });
  }

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
      return (
        <div className="container">
          <div className="ranking-board-wrapper">
            <div className="ranking-top-menu">
              <h2 className="ranking-top-text">BeWe Admin</h2>
              <hr/>  
              <h3 className="ranking-middle-text">CMS 게임 관리</h3>
            </div>
            <div>
              <div className="cms-top-wrapper">
                <span style={{width: "15%"}}>NO.</span>
                <span style={{width: "55%"}}>TITLE</span>
                <span style={{width: "15%"}}>GENRE</span>
                <span style={{width: "15%"}}>MORE</span>
              </div>
              {this.renderLists()}
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
export default connect(mapStateToProps, {allowContents, fetchRequestAllowList})(ContentsAdmin);