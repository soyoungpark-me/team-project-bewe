import React, { Component } from 'react';
import { Badge } from 'reactstrap';

class RoomReadyBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        let joinUsers = this.props.userList.map((contact, i) => {
            return (
                <JoinUsers name={contact} key={i} 
                    readyUsers = {this.props.readyUsers}
                 />
            );
        })
        return (
            <div 
            style={{marginLeft:"2%", marginRight:"2%"}}
            >
        <hr />
                <ol>
                {joinUsers}
                </ol>
        <hr />
        </div>
        );
    }
}


class JoinUsers extends Component {
    
    render() {
        return (
            <li>
            {
                this.props.readyUsers.indexOf(`${this.props.name}`) != -1
                ?
                <div>{this.props.name}&nbsp;
                <Badge color="success" >준비</Badge>
                </div> 
                :
                <div>{this.props.name}&nbsp;
                <Badge color="warning" >대기</Badge>
                </div>
            }
            </li>
        );
    }
}

export default RoomReadyBar;