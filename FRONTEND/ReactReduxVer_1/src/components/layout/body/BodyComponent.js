import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Container, Row, Col, Badge } from 'reactstrap';
import JumbotronB from './JumbotronB';
import classnames from 'classnames';

class BodyComponent extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          activeTab: '1'
        };
      }
    
      toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
      }

    render() {
        return (
            <div>
            <Container style={{marginBottom:"8%"}}>
                <JumbotronB/>
                <p/>
                <div>
                <hr />
                <Nav tabs>
                <NavItem>
                    <NavLink
                    className={classnames({ active: this.state.activeTab === '1' })}
                    onClick={() => { this.toggle('1'); }}
                    >
                    인기컨텐츠
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                    className={classnames({ active: this.state.activeTab === '2' })}
                    onClick={() => { this.toggle('2'); }}
                    >
                    #베스트UGC
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                    className={classnames({ active: this.state.activeTab === '3' })}
                    onClick={() => { this.toggle('3'); }}
                    >
                    #이벤트
                    </NavLink>
                </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                <h1  style={{marginTop:"5%"}}>Today <Badge color="danger">Hot!</Badge></h1>
                <Row>
                    <Col xs="6" sm="4">Sample text Sample text Sample text Sample text Sample text </Col>
                    <Col xs="6" sm="4">Sample text Sample text Sample text Sample text Sample text </Col>
                    <Col sm="4">.Sample text Sample text Sample text Sample text Sample text </Col>
                </Row>
                <p/><br/>
                <h1>Content <Badge color="info">Sale</Badge></h1>
                <Row>
                    <Col xs="6" sm="4">Sample text Sample text Sample text Sample text Sample text </Col>
                    <Col xs="6" sm="4">Sample text Sample text Sample text Sample text Sample text </Col>
                    <Col sm="4">.Sample text Sample text Sample text Sample text Sample text </Col>
                </Row>
                <p/><hr/>
                </TabPane>
                <TabPane tabId="2">
                    <Row style={{marginTop:"5%"}}>
                    <Col sm="3">
                        <Card body>
                        <CardTitle>Special Title Treatment</CardTitle>
                        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                        <Button>Go somewhere</Button>
                        </Card>
                    </Col>
                    <Col sm="3">
                        <Card body>
                        <CardTitle>Special Title Treatment</CardTitle>
                        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                        <Button>Go somewhere</Button>
                        </Card>
                    </Col>
                    <Col sm="3">
                        <Card body>
                        <CardTitle>Special Title Treatment</CardTitle>
                        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                        <Button>Go somewhere</Button>
                        </Card>
                    </Col>
                    <Col sm="3">
                        <Card body>
                        <CardTitle>Special Title Treatment</CardTitle>
                        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                        <Button>Go somewhere</Button>
                        </Card>
                    </Col>
                    </Row>
                    <Row style={{marginTop:"5%"}}>
                    <Col sm="3">
                        <Card body>
                        <CardTitle>Special Title Treatment</CardTitle>
                        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                        <Button>Go somewhere</Button>
                        </Card>
                    </Col>
                    <Col sm="3">
                        <Card body>
                        <CardTitle>Special Title Treatment</CardTitle>
                        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                        <Button>Go somewhere</Button>
                        </Card>
                    </Col>
                    <Col sm="3">
                        <Card body>
                        <CardTitle>Special Title Treatment</CardTitle>
                        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                        <Button>Go somewhere</Button>
                        </Card>
                    </Col>
                    <Col sm="3">
                        <Card body>
                        <CardTitle>Special Title Treatment</CardTitle>
                        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                        <Button>Go somewhere</Button>
                        </Card>
                    </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="3">
                <h1  style={{marginTop:"5%"}}>Today <Badge color="danger">Hot!</Badge></h1>
                <Row>
                    <Col xs="6" sm="4">Sample text Sample text Sample text Sample text Sample text </Col>
                    <Col xs="6" sm="4">Sample text Sample text Sample text Sample text Sample text </Col>
                    <Col sm="4">.Sample text Sample text Sample text Sample text Sample text </Col>
                </Row>
                <p/><br/>
                <h1>Content <Badge color="info">Sale</Badge></h1>
                <Row>
                    <Col xs="6" sm="4">Sample text Sample text Sample text Sample text Sample text </Col>
                    <Col xs="6" sm="4">Sample text Sample text Sample text Sample text Sample text </Col>
                    <Col sm="4">.Sample text Sample text Sample text Sample text Sample text </Col>
                </Row>
                <p/><hr/>
                </TabPane>
                </TabContent>
            </div>

            
                
            </Container>
            
          </div>
        );
    }
}

export default BodyComponent;