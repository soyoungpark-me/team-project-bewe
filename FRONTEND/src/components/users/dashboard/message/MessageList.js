import React, { Component } from 'react';
import { default as Fade } from 'react-fade';
import { HashLoader } from 'react-spinners';
import { connect } from 'react-redux';

import { getNewMessageCount } from 'actions/AppActions';
import { getMessages } from 'actions/users/MessageActions';
import Message from './Message';
import MessageForm from './MessageForm';

class MessageList extends Component {
  constructor(props){
    super(props);

    this.state = {
      page: 1,
      // fadeOut: false,
      userIdx: JSON.parse(localStorage.getItem('profile')).idx,
      formRender: false
    };

    this.renderMessages = this.renderMessages.bind(this);
    this.hasToUpdate = this.hasToUpdate.bind(this);
  }

  componentWillMount(){
    this.props.getMessages(this.props.conversationIdx);
    this.props.getNewMessageCount();
  }

  componentWillUpdate(nextProps, nextState){
    if (this.props.newMessage !== nextProps.newMessage || 
      this.props.conversationIdx !== nextProps.conversationIdx) {
      this.props.getMessages(nextProps.conversationIdx); 
      this.props.getNewMessageCount();

      this.setState({
        formRender: true
      });
    }    
  }

  componentDidUpdate(){
    this.scrollToBottom();  

    if (this.state.formRender) {
      this.setState({
        formRender: false
      });
    }
  }

  hasToUpdate(){
    this.props.getMessages(this.props.conversationIdx);  
  }

  scrollToBottom(){
    var objDiv = document.getElementsByClassName("message-list-chat-wrapper")[0];
    if (objDiv) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }

  renderMessages(){
    return this.props.messages
      // .slice(0, 15 * this.state.page - 1)
      .map((message) => {
        if(this.state.userIdx === message.sender_idx) {
          return (      
            <Message message={message} key={message.idx} sender={"me"} />
          )
        } else if(this.state.userIdx === message.receiver_idx) {
          return (      
            <Message message={message} key={message.idx} sender={"you"} />
          )
        }        
      });
  }

  render() {
    if(this.props.messages === undefined) {
      return (
        <div className="dashboard-loader">
          <HashLoader
            color={'#00B0FF'} 
            loading={true} 
          />
          <p>메시지를 로딩하고 있습니다.</p>
        </div>
      );
    }

    else {
      return (
        <div className="message-list-right-wrapper">
          <div className="message-list-top">
            <span>To: 
              <span className="name">{this.props.conversationNickname}</span>
            </span>
          </div>
          <div className="message-list-chat-wrapper">
              {this.renderMessages()}
          </div>
          <MessageForm 
            reRender={this.state.formRender}
            conversationIdx={this.props.conversationIdx} 
            hasToUpdate={this.hasToUpdate}/>
        </div>
      )
      // if(this.props.friends.length > this.state.page * 15) {
      //   return(
      //     <div>
      //       {this.renderFriends()}
      //       <button className="noti-more-button" onClick={this.onClickButton}>더 보기</button>
      //     </div>
      //   )
      // } else {
      //   return(
      //     <div>
      //       {this.renderFriends()}
      //     </div>
      //   )
      // }
    }    
  }
}

function mapStateToProps(state){
  return { 
    messages: state.messages.messages, 
    newMessage: state.app.newMessage,
    newMessageCount: state.app.newMessageCount 
  }
}

export default connect(mapStateToProps, { getMessages, getNewMessageCount })(MessageList);