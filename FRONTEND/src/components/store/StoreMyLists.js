// import React, { Component } from 'react';
// import { connect} from 'react-redux';
// import {fetchPurchasedLists} from '../../actions/store/StoreAction';


// class StoreLists extends Component{
//   constructor(props){
//     super(props);
//     this.state = {};
//   }

//   componentWillMount(){
//     this.props.fetchPurchasedLists();
//   }

//   renderLists(){
//     return this.props.contents.map((data) => {
//       return (
//         <div >
//           <ContentsDetail
//             key={data.key}
//             flag={data.flag}
//             title={data.title}
//             description={data.description}
//             image={data.image}
//           />
//         </div>
//       )
//     })
//   }

//   render(){
//     return(
//       <div>
//         <div>
//           구매 목록
//         </div>
//         <div>
//           <p>{this.renderLists()}</p>
//         </div>
//       </div>
//     )
//   }
// }

// function mapStateToProps(state) {
//   return { contents: state.store.all }
// }

// export default connect(mapStateToProps, {fetchPurchasedLists})(StoreLists);