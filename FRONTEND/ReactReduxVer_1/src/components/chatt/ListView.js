import React, {Component} from 'react';

class ListView extends Component{
    constructor(props) {
        super(props)
        this.state = {
            roomSeq : this.props.idx,
            roomName : this.props.roomName
        }
        this.roomHandler = this.roomHandler.bind(this);
    }
    roomHandler(e){
        e.preventDefault();
        this.props.roomHandler({
            roomSeq: this.state.roomSeq,
            roomName : this.state.roomName
        });
    }
    render(){

        return(
            <tr>
                <th>{this.props.idx}</th>
                <td>
                    <a href="#" onClick={this.roomHandler}>
                        {this.props.roomName}
                    </a>
                </td>
                <td>{this.props.roomAdmin}</td>
                <td>{this.props.cnt}</td>
            </tr>
        );
    }
}
export default ListView;