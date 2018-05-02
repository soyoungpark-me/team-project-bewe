// import React, { Component } from 'react';
//
// import { BrowserRouter, Route } from 'react-router-dom';
//
// import ContentsList from './ContentsList';
// import ContentsDetail from './ContentsDetail';
//
//
// class Contents extends Component {
//
//   render() {
//     return (
//       <div>
//         <BrowserRouter>
//           <div>
//             <Route exact path="/contents/list" component={ContentsList} />
//             <Route path="/contents/:idx" render={(props) => <ContentsDetail {...props} />}/>
//           </div>
//         </BrowserRouter>
//       </div>
//     )
//   }
// }
//
//
// export default Contents;


// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { fetchContentsDetail } from '../../actions/CMS/CMSAction';
//
// class ContentsDetail extends Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       contentsIdx:0
//     };
//   }
//   componentWillMount(){
//     this.setState({
//       contentsIdx: this.props.match.params.idx
//     });
//     this.props.fetchContentsDetail(this.state.contentsIdx);
//   }
//
//   renderContents(){
//     console.log('in details contents: ',this.props.contents);
//     return this.props.contents.map((data) => {
//       return (
//         <div key={data.idx}>
//           in Detail
//           <p>idx : {data.idx}</p>
//           <p>title : {data.title}</p>
//           <p>genre : {data.genre}</p>
//           <p>description: {data.description}</p>
//           <img src={data.image} alt="img"/>
//         </div>
//       )
//     });
//   }
//
//   render(){
//     return(
//       <div>
//         {this.renderContents()}
//       </div>
//     );
//   }
// }
//
// function mapStateToProps(state){
//   return { contents: state.CMS.all }
// }
//
// export default connect(mapStateToProps, { fetchContentsDetail })(ContentsDetail);