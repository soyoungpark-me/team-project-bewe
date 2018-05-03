import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Container, Row, Col, Badge } from 'reactstrap';
import classnames from 'classnames';
import {HashLoader} from 'react-spinners';
import {default as Fade} from 'react-fade'
import axios from 'axios';

import JumbotronB from './JumbotronB';
import $ from 'jquery';


const fadeDuration = 0.3;

class BodyComponent extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);

        this.state = {
          activeTab: '1',
          rows : [],
          pageNo : 0
          ,loadingState: false
        };
      }

      componentWillUnmount(){
          $(window).unbind();
          this.setState({
              rows: []
          })
      }
    
      toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
        if(tab == 2){
            $(window).scroll(() => {
                if ($(document).height() - $(window).height() - $(window).scrollTop() < 250) {
                    if(!this.state.loadingState && this.state.rows.length < 40){

                        axios.post(`http://localhost:9002/api/home/hash`, {
                            'pageNo' : this.state.pageNo
                        })
                        .then((rows)=>{
                            console.log(rows);
                            return rows
                        })
                        .then((rows)=>{
                            this.setState({
                                pageNo: this.state.pageNo + 1
                                ,rows : rows.data
                            })
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                        this.setState({
                            loadingState: true
                        });
                    }
                }else {
                    if(this.state.loadingState){
                        this.setState({
                            loadingState: false
                        });
                    }
                }
            });
        }
    }
                

    render() {
        const mapToComponents = (data) => {
            return data.map((contact, i )=>{
                return (
                    <Col sm="3" key={i} style={{marginBottom:"3%"}}>
                        <Card body>
                        <CardTitle>{this.state.rows[i].title}</CardTitle>
                        <hr />
                        <CardText>{this.state.rows[i].contents}</CardText>
                        <font style={{color:"blue", fontSize:"18"}}>#베스트UGC</font>
                        <font style={{fontSize:"15"}}>{this.state.rows[i].created_at}</font>
                        </Card>
                    </Col>
                )
            })
        }
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
                    {
                        this.state.rows.length !== 0
                        ?
                        <Fade duration={fadeDuration} >
                        <Row style={{marginTop:"5%"}}>
                        {mapToComponents(this.state.rows)}
                        </Row>
                        </Fade>
                        :
                        <center
                            style={{marginTop:"10%"}}
                        >
                            <HashLoader
                            color={'#7F7F7F'} 
                            loading={true} 
                            />
                        </center>
                    }
                    {
                        this.state.rows.length < 37
                        ?
                        <center
                            style={{marginTop:"10%"}}
                        >
                            <HashLoader
                            color={'#7F7F7F'} 
                            loading={true} 
                            />
                        </center>
                        :
                        ''
                    }
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