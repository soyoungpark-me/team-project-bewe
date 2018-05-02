import React, { Component } from 'react';
import { Collapse, Button, Badge } from 'reactstrap';

class ContentsDetail extends Component{
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }
  
  renderBadge() {
    let color = '';

    if (this.props.genre === 'AOS') {
      color = "danger";
    } else if (this.props.genre === 'FPS') {
      color = "secondary";
    } else if (this.props.genre === 'RPG') {
      color = "primary";
    } else {
      color = "warning";
    }

    return (
      <Badge className="game-list-item-genre" color={color}>{this.props.genre}</Badge>
    )
  }

  handleClick = () => {
    this.props.onAllowClick(this.props.idx);
  }
  
  render() {
    return (
      <div className="game-list-item-wrapper">
        <div className="game-list-item-title">
          <span style={{width: "15%"}}>
            {this.props.index}
            {(this.props.type) === 'cms' && (this.props.flag === 1) 
              ? <img src="/../public/img/check.png" />
              : <img src="/../public/img/none.png" />
            }
          </span>
          <span style={{width: "55%"}}>{this.props.title}</span>
          <span style={{width: "15%"}}>
            {this.renderBadge()}
          </span>
          <span style={{width: "15%"}}>
            <Button className="game-list-item-more-button"
              onClick={this.toggle}>
              {(this.state.collapse) 
                ? <span className="ion-arrow-up-b"></span>
                : <span className="ion-arrow-down-b"></span> }
            </Button>
          </span>
        </div>        
        <Collapse isOpen={this.state.collapse}>
          <div className="game-list-item-collapse">
            <p className="game-list-item-description">{this.props.description}</p>
              <ContentsImage image={this.props.image} alt={this.props.title} />
          </div>
          
          {(this.props.type) === 'cms'
            ? <div className="game-list-item-button-wrapper">
                <button className="game-list-item-button" onClick={() => {this.props.history.push(`/contents/${data.idx}`)}}> 수정</button>
                <button className="game-list-item-button" onClick={() => {this.props.history.push(`/contents/${data.idx}`)}}> 삭제</button>
              </div>      
            : <div className="game-list-admin-button-wrapper">
                <button className="game-list-item-button" onClick={this.handleClick}> 승인</button>
              </div>
          }
        </Collapse>
      </div>
    );  
  }  
}


function ContentsImage({image, alt}){
  return (
    <div className="game-list-image-wrapper">
      <img className="game-list-image" src={image} alt={alt}/>
    </div>
  );
}



export default ContentsDetail;