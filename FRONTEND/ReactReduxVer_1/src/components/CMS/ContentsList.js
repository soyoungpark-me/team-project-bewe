import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchContents } from "../../actions/CMS/CMSAction";

class ContentsList extends Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  componentWillMount(){
    this.props.fetchContents();
  }


  renderContents(){
    return this.props.contents.map((data) => {
      return (
        <div key={data.idx}>
          <p>idx : {data.idx}</p>
          <p>title : {data.title}</p>
          <p>genre : {data.genre}</p>
          <p>description: {data.description}</p>
          <img src={data.image} alt="img"/>
        </div>
      )
    });
  }

  render(){
    return(
      <div>
        {this.renderContents()}

      </div>
    );
  }
}
function mapStateToProps(state){
  return { contents: state.CMS.all }
}



export default connect(mapStateToProps, { fetchContents })(ContentsList);