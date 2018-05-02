import './Header.css';
import '/../style/style.css';

import React from 'react';
import {NavLink} from 'react-router-dom';
import {
  Button,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem, 
  Popover,
  PopoverHeader,
  PopoverBody,
  ButtonGroup} from 'reactstrap';

import ConversationList from './popup/ConversationList';
import NotiList from './popup/NotiList';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      modal: false,
      messageOpen: false,
      notiOpen: false
    };
    this.navToggle = this.navToggle.bind(this);
    this.messageToggle = this.messageToggle.bind(this);
    this.notiToggle = this.notiToggle.bind(this);
  }

  messageToggle() {
    this.setState({
      messageOpen: !this.state.messageOpen
    });

    if (this.state.notiOpen) {
      this.setState({
        notiOpen: !this.state.notiOpen
      });  
    }
  }

  notiToggle() {
    this.setState({
      notiOpen: !this.state.notiOpen
    });

    if (this.state.messageOpen) {
      this.setState({
        messageOpen: !this.state.messageOpen
      });
    }
  }

  navToggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  login(){

  }

  render() {
    return (
      <div className="navv">
        <div className="container">
          <Navbar light expand="md">
            <NavLink to="/" className="top-nav-logo" activeClassName="active">          
              <img className="navlogo" src={"/../public/img/logo_ver3.png"}/>
              <p className="navfont">BeWe</p>
            </NavLink>          

            <NavLink to="/store" className="top-nav-item">Store</NavLink>
            <NavLink to="/mygame" className="top-nav-item">My Game</NavLink>
            <NavLink to="/rank" className="top-nav-item">Ranking</NavLink>
            <NavLink to="/contents" className="top-nav-item">CMS</NavLink>

            {
              localStorage.getItem("token") ? 
                <div>
                  <div className="nav-right-wrapper">
                    <a className={`${(this.state.messageOpen) ? 'nav-right-item-active' : 'nav-right-item'}`} 
                       id="messagePopOver" onClick={this.messageToggle}>
                        {(this.props.newMessageCount > 0) 
                          ? <div className="nav-right-item-new-message">{this.props.newMessageCount}</div> 
                          : ''}
                       <span className="ion-chatbubble-working"></span>
                    </a>
                    <a className={`${(this.state.notiOpen) ? 'nav-right-item-active' : 'nav-right-item'}`}
                       id="notiPopOver" onClick={this.notiToggle}>
                        {(this.props.newNotiCount > 0) 
                          ? <div className="nav-right-item-new-message">{this.props.newNotiCount}</div> 
                          : ''}
                       <span className="ion-android-notifications"></span>
                    </a>
                    
                    <Popover placement="bottom" isOpen={this.state.messageOpen} target="messagePopOver" toggle={this.toggle}>
                      <PopoverHeader>메시지 확인</PopoverHeader>
                      <PopoverBody>
                        <ConversationList />
                      </PopoverBody>
                    </Popover>
                    <Popover placement="bottom" isOpen={this.state.notiOpen} target="notiPopOver" toggle={this.toggle}>
                      <PopoverHeader>알림 확인</PopoverHeader>
                      <PopoverBody>
                        <NotiList />
                      </PopoverBody>
                    </Popover>

                    <NavLink to="/users/profile" className="nav-right-item"><span className="ion-person"></span></NavLink>
                  </div>
                  <NavLink to="/" className="item" activeClassName="active">
                    <Button className="login-logout-button" onClick={()=>
                      {localStorage.removeItem("token")
                      localStorage.removeItem("profile")
                      console.log('logout')}
                    } >LOGOUT</Button>
                  </NavLink>
                  </div>
                : 
                <div>
                  <NavLink to="/login" className="item" activeClassName="active">
                    <Button className="login-logout-button" color="primary">LOGIN</Button>
                  </NavLink>
                </div>
            }
          </Navbar>
        </div>
      </div>
    );
  }
}


//         <ul className="header">
//            <NavLink exact to="/" className="item" activeClassName="active">홈</NavLink>
//             <NavLink to="/allgames" className="item" activeClassName="active">
//                 전체 게임</NavLink>
//             <NavLink to="/mygames" className="item" activeClassName="active">내 게임</NavLink>
//             <NavLink to="/community" className="item" activeClassName="active">커뮤니티</NavLink>
//             <NavLink to="/rank" className="item" activeClassName="active">랭킹</NavLink>
              
//             <NavLink to="/login" className="item" activeClassName="active">로그인</NavLink>
//         </ul>
//     );
//   }
// }