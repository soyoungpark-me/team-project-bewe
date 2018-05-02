require('./ChatApp.css');

import React from 'react';
import io from 'socket.io-client';
import {Button, ButtonGroup } from 'reactstrap';

import Messages from './Messages';
import ChatInput from './ChatInput';
import RoomReadyBar from './RoomReadyBar';
import PropTypes from 'prop-types';
import axios from 'axios';

class ChatApp extends React.Component {
  static contextTypes={
    router: PropTypes.object
  }
  constructor(props, context) {
    super(props, context);
    this.state = { 
        messages: [],
        socket: {},
        userList: [],
        query : this.props.query,
        readyUsers : [],
        readyCnt : 0,
        roomName: this.props.roomName,
        paramsGameNumber: this.props.paramsGameNumber,
        roomSeq : this.props.roomSeq
    };
    this.sendHandler = this.sendHandler.bind(this);
    this.readyHandler = this.readyHandler.bind(this);
    this.exitHandler = this.exitHandler.bind(this);
    this.onReadyBadge = this.onReadyBadge.bind(this);
    this.startgameHandler = this.startgameHandler.bind(this);
    // Connect to the server
    this.socket = io(`http://192.168.0.60:70`, {
      query: `username=${props.username}&gameSeq=${props.paramsGameNumber}&roomSeq=${props.roomSeq}` 
    }).connect();
    
    this.socket.emit('joinRoom');

    this.socket.on('server:message', data => {
      if(data.socketId == this.socket.id) return;
      this.addMessage(data.messageData);
    });

    this.socket.on('server:joinRoom', data =>{
      this.addUsers(data);
      this.onReadyBadge(data);
      this.addMessage(data.messageData);
    });

    this.socket.on('server:gameStart', data =>{
      this.setState({
        startGameBoolean: data.redirect
      });
      this.context.router.history.push('/startgame');
    });
    
    this.socket.on('server:chattReady', data =>{
      this.onReadyBadge(data);
      if(data.readyUsers.length == data.roomSize){
        this.execgameHandler();
      }
    });

    this.socket.on('server:disconnect', data =>{
      this.setState({
        execgameState: data.execgameState
      });
      this.addUsers(data);
      this.onReadyBadge(data);
      this.addMessage(data.messageData);
    })
  }
  startgameHandler(){
    this.setState({
      execgameState:0
    });

    axios.post(`http://localhost:4001/api/deleteroom`,{
      'name': this.state.createRoomName,
      'adminUser' : JSON.parse(localStorage.getItem("profile")).nickname,
      'cnt' : this.state.createRoomSize,
      'gameNumber' : this.state.paramsGameNumber,
      'roomSeq': this.props.roomSeq
    });
    //
    // //JSON 태웅이한테 JSON전달
    // axios.post(`http://localhost:4001/api/execgame`,{
    //   'name': this.state.createRoomName,
    //   'adminUser' : JSON.parse(localStorage.getItem("profile")).nickname,
    //   'cnt' : this.state.createRoomSize,
    //   'gameNumber' : this.state.paramsGameNumber,
    //   'roomSeq': this.props.roomSeq
    // });
    this.socket.emit('gameStart');
    
    this.context.router.history.push('/startgame');
  }
  execgameHandler(){
    if(this.props.username === this.props.roomSize[this.props.roomSeq-1].adminUser){
    this.setState({
      execgameState : 1
    });
  }
  }
  onReadyBadge(data){
    this.setState({
      readyUsers : data.readyUsers
    });
  }

  componentWillUnmount(){
    this.socket.disconnect();
    this.setState({
      readyCnt : this.state.readyCnt - 1
    })
  }
    
  sendHandler(message) {
    const messageObject = {
      username: this.props.username,
      message
    };
    this.socket.emit('client:message', messageObject);
    messageObject.fromMe = true;
    this.addMessage(messageObject);
  }

  readyHandler(){
    this.socket.emit('chattReady', {
      username: this.props.username,
      roomSize: this.props.roomSize[this.props.roomSeq-1].cnt
    });
  }
  exitHandler(){
    this.props.exitHandler();
    //방장이라면
    if(this.props.username === this.props.roomSize[this.props.roomSeq-1].adminUser){
      axios.post(`http://localhost:4001/api/deleteroom`,{
                'name': this.state.createRoomName,
                'adminUser' : JSON.parse(localStorage.getItem("profile")).nickname,
                'cnt' : this.state.createRoomSize,
                'gameNumber' : this.state.paramsGameNumber,
                'roomSeq': this.props.roomSeq
        });
      const messageObject = {
            username: this.props.username,
            message : `방장이신 ${this.props.username}님이 접속을 종료하여 게임을 진행할 수 없습니다. 다른 방에 입장해 주세요.`
          };
      this.socket.emit('client:message', messageObject);
      this.addMessage(messageObject);
      this.socket.disconnect();
    }
  }

  addUsers(data) {
    this.setState({ 
      userList : data.rooms
    });
    this.scrollToBottom();
  }

  addMessage(message) {
    const messages = this.state.messages;
    messages.push(message);
    this.setState({ messages });
  }

  scrollToBottom() {
    window.scrollTo(0,document.body.scrollHeight);
  }

  render() {
    return (
      <div className="containerm">
        <div className="mygame-chat-title">
        <h3>{this.state.roomName}</h3>        
        <Button color="info" className="exitButton"
          onClick={this.exitHandler}>
          <span className="ion-close-round"></span>
        </Button>
        
        </div>
        
        <div className="mygame-chat-content-wrapper">
          <div className="mygame-chat-left-wrapper">
            <div className="mygame-chat-left-title">
              <span className="ion-person-stalker"> User List</span>              
            </div>            
            <RoomReadyBar userList={this.state.userList} 
              readyUsers={this.state.readyUsers}
            />
            {(this.state.execgameState) ? 
              <a href="BeWe://"><Button className="mygame-chat-start-button"
              onClick={this.startgameHandler}>START</Button></a>
              :
              <Button className="mygame-chat-ready-button" 
              onClick={this.readyHandler}>READY</Button>
            }
            
          </div>
          <div className="mygame-chat-right-wrapper">
            <Messages messages={this.state.messages} />
            <ChatInput onSend={this.sendHandler} />
          </div>          
        </div>
        
      </div>
    );
  }
}
ChatApp.defaultProps = {
  username: 'Anonymous'
};

export default ChatApp;