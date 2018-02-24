import './app.css';
import React, { Component } from 'react';

import { BrowserRouter, Route, Switch, IndexRoute } from "react-router-dom";
import { connect } from 'react-redux';
import reducers from '../reducers';
import axios from 'axios';

import { dataFetch, getNewMessage, setSocketConnected, 
  setWebNotifyEnable, setWebNotifyUnable, 
  getNewMessageCount, getNewNotiCount } from 'actions/AppActions';

import Header from "./layout/header/Header";
import Home from "../routes/Home";
import Login from './users/login/Login';
import SignUp from "./users/login/SignUp";
import Footer from './layout/footer/Footer';
import MyGame from "./layout/header/MyGame";
import RankBoard from './ranks/RankingBoard';
import Dashboard from "./users/dashboard/Dashboard";
import GameRoomList from './GameRoomList';
import StartGame from './StartGame';
import ContentsList from './CMS/ContentsList';
import ContentsRegister from './CMS/register/ContentsRegister';
import StoreLists from './store/StoreLists';
import FriendBoard from './users/dashboard/friends/FriendBoard';

function mapStateToProps(state) {  
  return {
    newNoti: state.app.newNoti,
    newMessageCount: state.app.newMessageCount,
    newNotiCount: state.app.newNotiCount,
    grant: state.app.grant,
    socket: state.app.socket,
    popUp: state.app.popUp
  };
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    }
  }
  
  async componentWillReceiveProps(nextProps, nextState) {
    if (this.props.newNoti !== nextProps.newNoti && nextProps.newNoti) {
      clearTimeout(this.timeout);
      let contents = nextProps.newNoti.contents.replace(/<\/?[^>]+(>|$)/g, "");
      let options = {
        icon: nextProps.newNoti.image || 'http://genknews.genkcdn.vn/zoom/220_160/2017/thumbnail-4x3-34722014736-2d241425f9-k-1495531031736-crop-1495531041612.jpg'
      }
      if(this.props.grant){
        const notification = new Notification(contents, options);
        notification.onclick = function(event) {
          event.preventDefault();
          window.location.replace(nextProps.newNoti.url);
          notification.close.bind(notification);
        }
        setTimeout(notification.close.bind(notification), 15000);       
      }      
      this.startPoll();
    }

    if (this.state.data && (this.state.data !== nextState.data)) {
      const profile = await fetchOtherProfile(this.state.data.senderIdx);
      
      if ((window.location.pathname) !== '/users/messages') {
        let contents = `${profile.data.result.nickname}님으로부터 메시지가 도착했습니다.`;
        let options = {
          body: this.state.data.contents,
          icon: profile.avatar || '/../public/img/avatar.png'
        }
        if(this.props.grant){
          const notification = new Notification(contents, options);
          notification.onclick = function(event) {
            event.preventDefault();
            window.location.replace("/users/messages");
          }
          setTimeout(notification.close.bind(notification), 15000); 
        }
      }
    }
  }

  // 앱이 시작될 때 Fetch 해오기 시작
  componentWillMount() {
    this.props.dataFetch();
    this.props.setSocketConnected();
    this.props.getNewMessageCount();
    this.props.getNewNotiCount();
    
    if (!("Notification" in window)) {
      alert("This browser does not support system notifications");
      this.props.setWebNotifyUnable();
    } else if (!this.props.grant) {
      Notification.requestPermission((permission) => {
        if (permission === "granted") {
          this.props.setWebNotifyEnable();
        } else {
          this.props.setWebNotifyUnable();
        }
      });
    }          
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  componentDidUpdate(){
    this.props.socket.on('new_message', (data) => {
      this.props.getNewMessage(data);
      this.props.getNewMessageCount(); 
      
      this.setState({
        data: data
      })
    });
  }

  // 폴링 시작
  startPoll() {
    this.timeout = setTimeout(() => this.props.dataFetch(), 100);
  }

  render() {
    return (
      <BrowserRouter >
        <div>
          <Header newMessageCount={this.props.newMessageCount} newNotiCount={this.props.newNotiCount}/>        
          <div className="up">
          </div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/mygame" component={MyGame} />
            <Route path="/rank" component={RankBoard} />

            <Route path="/gameRoomList" component={GameRoomList} />
            <Route path="/users" component={Dashboard} />
            <Route path="/contents/new" component={ContentsRegister} />
            <Route path="/contents" component={ContentsList} />
            {/*<Route path="/contents/:contents_idx" component={ContentsDetail} />*/}

            <Route path="/gamegamelist/:gamenumber" component={GameRoomList} />
            <Route path="/startgame" component={StartGame} />
            <Route path="/store" component={StoreLists}/>
            <Route render={()=> <h1>Not found</h1>} />
          </Switch>
        {/* <Footer/> */}
        </div>
      </BrowserRouter>
    );
  }  
}

export default connect(mapStateToProps, 
  { dataFetch, getNewMessage, setSocketConnected, 
    setWebNotifyEnable, setWebNotifyUnable, 
    getNewMessageCount, getNewNotiCount })(App);