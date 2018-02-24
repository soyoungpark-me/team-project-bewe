import React, { Component } from 'react';
import { default as Fade } from 'react-fade'
import { HashLoader } from 'react-spinners';

import ConversationList from './ConversationList';
import MessageList from './MessageList';

const fadeDuration = 0.3;

class MessageBoard extends Component {
  constructor(props){
    super(props);
    this.state = {
      index: 0,
      conversationIdx: 0,
      conversationNickname: ''
    }
  }

  renderMessageList(){
    if(this.state.conversationIdx === 0) {
      return (
        <div className="dashboard-loader">
          <HashLoader
            color={'#00B0FF'} 
            loading={true} 
          />
          <p>확인할 메시지를 선택해주세요.</p>
        </div>
      );
    } else {
      return(
        <MessageList 
          conversationIdx={this.state.conversationIdx} 
          conversationNickname={this.state.conversationNickname}/>
      )
    }
  }

  render() {
    return (      
      <div className="dashboard-right-contents" 
           style={{"padding":"30px 0"}}>
        <Fade
          duration={fadeDuration}
        >
          <div className="message-left-contents" 
               style={{"height": this.props.height-65}}>
            <ConversationList
              conversationIdx={this.state.conversationIdx}
              onConversationSelect={
                (selectedConversationIdx, selectedConversationNickname) => {
                  this.setState({
                    conversationIdx: selectedConversationIdx,
                    conversationNickname: selectedConversationNickname
                  });
                }
              }
            />
          </div>
          <div className="message-right-contents"
               style={{"height": this.props.height-65}}>
            {this.renderMessageList()}
          </div>
        </Fade>
      </div>
    )
  }
}

export default MessageBoard;