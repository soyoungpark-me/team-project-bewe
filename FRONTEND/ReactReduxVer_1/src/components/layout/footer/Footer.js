import './Footer.css';
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';


class Footer extends Component {
    render() {
        return (
            <div className="footer">
            
            <Container>
                <Row>
                    <Col xs="6" sm="6"><p/><h1>Steave</h1></Col>
                    <Col xs="6" sm="3"></Col>
                    <Col sm="3"><img 
        style={{
          position:"absolute",
          height:"200px"
        }}
        src={"/../public/img/smilegateLogo.png"} /></Col>
                </Row>
                <Row>
                    <Col xs="6" sm="6">Mega Value Innovator in Entertainment.<br/>Always do what you are afraid to do.</Col>
                    <Col xs="6" sm="3">Server Develop Camp 4th. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Team BeWe. 킹소영 마뇨긔 이상철     </Col>
                </Row>
                <p/><br/>
                
            </Container>
            </div>
        );
    }
}


export default Footer;