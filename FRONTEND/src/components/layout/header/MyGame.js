import React, { Component } from 'react';
import Login from '../../users/login/Login';
import {Redirect} from 'react-router-dom';
import MyGameList from '../../MyGameList';

class MyGame extends Component {
    constructor(props) {
        super(props);
        this.handleNext = this.handleNext.bind(this);
    }
    handleNext = ()=>{
        return(
            localStorage.getItem("token") ?(
            <div>
                    <MyGameList />
            </div>)
            :
            (<Redirect to="/login" />)
        );
        // this.props.history.push('/login');
    }
    render() {
        return(
            <div>
                {this.handleNext()}
            </div>
        )
    }
}

export default MyGame;