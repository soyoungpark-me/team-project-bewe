require('./Login.css');

import React, {Component} from 'react';
import {NavLink, withRouter, Redirect} from "react-router-dom";
import {
  Button, Form, FormGroup, Label, Input, FormText
  , Badge
} from 'reactstrap';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      pw: '',
      chk: false
    };
    this.useSubmitHandler = this.useSubmitHandler.bind(this);
    this.idTextChangeHandler = this.idTextChangeHandler.bind(this);
    this.pwTextChangeHandler = this.pwTextChangeHandler.bind(this);
  }

  useSubmitHandler(e) {
    e.preventDefault();
    fetch('http://52.78.25.56:3000/api/users/login', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "id": this.state.id,
        "pw": this.state.pw
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Network res was not ok.');
        }
      })
      .catch(err => {
        this.setState({chk: true});
      })
      .then(res => {
        // console.log(res);
        localStorage.setItem("token", JSON.stringify(res.token));
        localStorage.setItem("profile", JSON.stringify(res.profile));
        // console.log(JSON.parse(localStorage.getItem("profile")).nickname);
        // console.log(JSON.parse(localStorage.getItem("token")));
        this.props.history.push('/');
      })
      .catch(err => {
        console.log(err);
      })
  }

  idTextChangeHandler(e) {
    this.setState({
      id: e.target.value
    })
  }

  pwTextChangeHandler(e) {
    this.setState({
      pw: e.target.value
    })
  }

  render() {
    if (localStorage.getItem("token")) {
      return (
        <Redirect to="/"/>
      )
    }
    return (
      <div className="username-container">
        <form onSubmit={this.useSubmitHandler} className="loginform">
          <h1>Welcome to BeWe!</h1><p/>
          <div>
            <input
              type="text"
              placeholder="Enter a username..."
              value={this.state.id}
              onChange={this.idTextChangeHandler}
              required/>
          </div>
          <div>
            <input
              type="password"
              placeholder="Enter a password..."
              value={this.state.pw}
              onChange={this.pwTextChangeHandler}
              required/>
          </div>
          {this.state.chk == true ? <div>
            <h3><Badge color="danger">아이디 혹은 비밀번호를 확인해 주세요.</Badge></h3>
          </div> : ''}

          <input type="submit" value="로그인"/>

        </form>
        <button onClick={() => this.props.history.push('/signup')} className="center">회원가입</button>
      </div>
    );
  }
}

export default Login;