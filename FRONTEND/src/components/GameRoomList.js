import React, {Component} from 'react';
import {HashLoader} from 'react-spinners';
import {default as Fade} from 'react-fade'

import ReactModal from 'react-modal';
import {
  Table, Button,
  InputGroup, Input
} from 'reactstrap';

import ListView from './chatt/ListView';
import ChatApp from './chatt/ChatApp';
import axios from 'axios';

import PropTypes from 'prop-types';

const fadeDuration = 0.3;


class GameRoomList extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      rows: [],
      keyword: '',
      roomSeq: 0,
      roomName: ''
      , showModal: false,
      createRoomName: '',
      createRoomSize: '',
      paramsGameNumber: 0
    }
    this.handleChange = this.handleChange.bind(this);
    this.roomHandler = this.roomHandler.bind(this);
    this.exitHandler = this.exitHandler.bind(this);

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleCreateRoomModal = this.handleCreateRoomModal.bind(this);

    this.handleRoomNameChange = this.handleRoomNameChange.bind(this);
    this.handleRoomSizeChange = this.handleRoomSizeChange.bind(this);

    this.roomListInterval = this.roomListInterval.bind(this);
  }

  handleCreateRoomModal(e) {
    if (this.state.createRoomName == '' || this.state.createRoomSize == 0) {
      return
    }
    axios.post(`http://localhost:4001/api/createroom`, {
      'name': this.state.createRoomName,
      'adminUser': JSON.parse(localStorage.getItem("profile")).nickname,
      'cnt': this.state.createRoomSize,
      'gameNumber': this.state.paramsGameNumber
    })
      .then((responseDate) => {
        console.log(responseDate);
        this.setState({
          rows: responseDate.data
          , roomSeq: responseDate.data.length
          , roomSize: responseDate.data[responseDate.data.length - 1].cnt
          , roomName: responseDate.data[responseDate.data.length - 1].name
          , roomAdmin: responseDate.data[responseDate.data.length - 1].adminUser
        });
      })
      .catch((err) => {
        console.log(err);
      }).then(
      this.handleCloseModal
    )
  }

  handleRoomSizeChange(e) {
    this.setState({
      createRoomSize: e.target.value
    })
  }

  handleRoomNameChange(e) {
    this.setState({
      createRoomName: e.target.value
    });
  }

  handleOpenModal() {
    this.state.roomSeq
      ?
      ''
      :
      this.setState({showModal: true})
  }

  handleCloseModal() {
    this.setState({showModal: false});
  }

  handleChange(e) {
    this.setState({
      keyword: e.target.value
    })
  }

  componentWillMount() {
    this.setState({
      paramsGameNumber: this.props.match.params.gamenumber
    })
  }

  componentDidMount() {
    setInterval(this.roomListInterval, 2000);
  }

  roomListInterval() {
    fetch(`http://localhost:4001/api/roomlist/${this.state.paramsGameNumber}`, {
      method: 'get',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'token': JSON.parse(localStorage.getItem("token"))
      }
    }).then((response) => response.json())
      .then((responseDate) => {
        this.setState({rows: responseDate});
      }).catch((err) => {
      console.log(err);
    });
  }

  roomHandler(e) {
    this.setState({
      roomSeq: e.roomSeq,
      roomName: e.roomName
    });
  }

  exitHandler() {
    this.setState({
      roomSeq: 0
    })
  }


  render() {
    const mapToComponents = (data) => {
      data = data.filter(
        (contact) => {
          return contact.name.indexOf(this.state.keyword) > -1;
        }
      );
      return data.map((contact, i) => {
        let idx = i + 1;
        return (
          <ListView roomHandler={this.roomHandler}
                    seq={this.state.rows[i].seq}
                    roomAdmin={this.state.rows[i].adminUser}
                    roomName={contact.name}
                    cnt={contact.cnt} idx={idx} key={i}/>
        );
      });
    }

    return (
      <div className="container" style={{"padding": "30px !important" }}> 
        <Fade
          duration={fadeDuration}
        >
          <div className="ranking-top-menu">
            <h2 className="ranking-top-text">Room List</h2>
            <hr />
            <h3 className="ranking-middle-text">
              해당 게임의 방 리스트 입니다.
            </h3>
          </div>
          <div className="mygame-roomlist-top-wrapper">
            <InputGroup className="mygame-roomlist-input-wrapper">
              <Input placeholder="검색할 방 이름을 적어주세요" 
                value={this.state.keyword}
                name="keyword"
                onChange={this.handleChange}
                className="mygame-roomlist-top-input"
              />                
            </InputGroup>
            <Button className="mygame-roomlist-make-button"
              onClick={this.handleOpenModal}
              style={{"height": "50px !important"}}>
              방 만들기
            </Button>
          </div>
          <div>
        <ReactModal 
           isOpen={this.state.showModal}
           contentLabel="Inline Styles Modal Example"
           style={{
              overlay: {
                backgroundColor: '#6c757d',
                marginTop:'50px',
                opacity: 0.90
              },
              content: {
                borderRadius: '4px',
                outline: 'none',
                width: '700px',
                height: '380px',
                padding: '20px',
                margin: '0 auto',
                marginTop: '100px',
                borderRadius: '10px',
                opacity: 1
              }
            }}
            onRequestClose={this.handleCloseModal}
            ariaHideApp={false}
        >
        <div>
          <h3 className="mygame-modal-head">방을 만들어 보세요</h3>
          <input type="text" required name="name" className="mygame-modal-input"
            onChange={this.handleRoomNameChange} value={this.state.createRoomName}
            placeholder="제목을 입력해 주세요"  maxLength="20"/>           
          <input type="number" required name="size" className="mygame-modal-input"
            onChange={this.handleRoomSizeChange} value={this.state.createRoomSize}
            placeholder="인원은 몇명으로 설정하실껀가요? (최대 9명)" maxLength="1" />
          <div className="mygame-modal-button-wrapper">
            <button className="mygame-modal-button" onClick={this.handleCreateRoomModal}>만들기</button>
            <button className="mygame-modal-button" onClick={this.handleCloseModal}>돌아가기</button>
          </div>
        </div>
        </ReactModal>
        </div>
        
                &nbsp;
                <p/>
                <Table hover>
                <thead>
                <tr>
                    <th>No.</th>
                    <th>Room Name</th>
                    <th>Admin Name</th>
                    <th>Size</th>
                </tr>
                </thead>
                <tbody>
                    {this.state.rows.length === 0  
                        ? <tr><td colSpan="4">
                            <center>
                                <br/>
                                <HashLoader
                                color={'#7F7F7F'} 
                                loading={true} 
                            />
                            <br />
                            '만들어진 방이 없거나 가져오는 중입니다.'
                        </center></td></tr>
                        : mapToComponents(this.state.rows)}
                </tbody>
            </Table>
            {/* <div style={{"display" : "inline-block", "width":"20%"}}>
                hi
            </div> */}
          <div>
            {
              this.state.roomSeq ?
                <ChatApp paramsGameNumber={this.state.paramsGameNumber}
                         roomSeq={this.state.roomSeq}
                         roomName={this.state.roomName}
                         roomSize={this.state.rows}
                         username={(JSON.parse(localStorage.getItem("profile")).nickname)}
                         exitHandler={this.exitHandler}
                /> : ''
            }
          </div>

        </Fade>
      </div>
    );
  }
}

export default GameRoomList;