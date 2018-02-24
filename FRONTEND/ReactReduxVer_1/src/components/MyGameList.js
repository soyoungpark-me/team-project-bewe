import './app.css';
import React, {Component} from 'react';
import {default as Fade} from 'react-fade'


import {
  Jumbotron, Button, Badge,
  Card, CardImg, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, CardImgOverlay,
  Container, Row, Col
} from 'reactstrap';
import Coverflow from 'react-coverflow';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';

const fadeDuration = 0.3;


class MyGameList extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      active: 0,
      roomNumber: 0
    }
  }

  render() {

    return (
      <div className="center">
        <Fade
          duration={fadeDuration}
        >
          <Jumbotron>
            <b><h1 className="display-2">Your GameList!</h1></b>
            <p className="lead">
              구매한 게임 목록 입니다.
            </p>
            <hr className="my-2"/>
            <p className="lead">
              <Button color="primary">쇼핑하러가기</Button>
            </p><br/>
            <p>
              게임 시작 전에 아래의 그림을 눌러 다운로드를 꼭 해주세요.
            </p>
            <Container>

              <Row>
                <Coverflow
                  width={960}
                  height={480}
                  displayQuantityOfSide={1}
                  navigation={true}
                  enableHeading={true}
                  active={this.state.active}
                >
                  <img src='https://i.ytimg.com/vi/S4Hnc_iRuBk/maxresdefault.jpg'
                       alt='게임 다운로드'
                    //img와 down링크 디비값으로 설정
                       data-action="https://goo.gl/2cTpRc"/>
                  <img
                    src='http://post.phinf.naver.net/MjAxNzAyMjdfMTM1/MDAxNDg4MTk0OTUxMzgx.DnQeRoSAEVGtGBJgLY2tmmjAtiujT_RYRjd5csfbTT0g.-GhV-au86bWwtaGBgrBOHoWeYs-RhIVCGEt8zDtQlMwg.PNG/IcoN3KjSbusLsg6-Lp1cKINXfHGc.jpg'
                    alt='게임 다운로드'
                    data-action="http://andyyou.github.io/react-coverflow/"/>
                  <img src='http://www.tennisthis.com/wp-content/uploads/2011/06/redux.jpg'
                       alt='게임 다운로드'
                       data-action="http://andyyou.github.io/react-coverflow/"/>
                  <img src='https://cdn.colorlib.com/wp/wp-content/uploads/sites/2/nodejs-frameworks.png'
                       alt='게임 다운로드'
                       data-action="http://andyyou.github.io/react-coverflow/"/>
                </Coverflow>
              </Row>
              <p/>
              <Row>
                <Col xs="6" sm="3">
                  <Card>
                    <CardImg width="100%" src="https://i.ytimg.com/vi/S4Hnc_iRuBk/maxresdefault.jpg"
                             alt="Card image cap"/>
                    <p/><CardTitle>챗봇 게임</CardTitle>
                    <CardText>
                      옆집 Finder팀의 게임입니다. <br/>
                      NPC사이에서 유저를 찾아내는 것이 핵심 목표입니다.
                    </CardText>
                    <CardImgOverlay>
                      <div className="leftCenter"><h5><Badge color="danger">HOT!</Badge></h5></div>
                    </CardImgOverlay>
                    <CardText>
                      <Button color="danger" outline onClick={
                        () => {
                          this.context.router.history.push(
                            //#1 을 고정 idx로 주면 될덧(게임)
                            `/gamegamelist/1`
                          );
                        }}>START!</Button>
                    </CardText>
                    <p/>
                  </Card>
                </Col>
                <Col xs="6" sm="3">
                  <Card>
                    <CardImg width="100%" alt="Card image cap"
                             src="http://post.phinf.naver.net/MjAxNzAyMjdfMTM1/MDAxNDg4MTk0OTUxMzgx.DnQeRoSAEVGtGBJgLY2tmmjAtiujT_RYRjd5csfbTT0g.-GhV-au86bWwtaGBgrBOHoWeYs-RhIVCGEt8zDtQlMwg.PNG/IcoN3KjSbusLsg6-Lp1cKINXfHGc.jpg"/>
                    <p/><CardTitle>Game Title</CardTitle>
                    <CardText>
                      게임 설명이지롱~ <br/>
                      조금 더 긴 부가설명 이지롱~ <br/>삼지롱~
                    </CardText>
                    <CardImgOverlay>
                      <div className="leftCenter"><h5><Badge color="warning">↑40%</Badge></h5></div>
                    </CardImgOverlay>
                    <CardText>
                      <Button outline color="danger" onClick={
                        () => {
                          this.context.router.history.push(
                            `/gamegamelist/2`
                          );
                        }}>START!</Button>
                    </CardText>
                    <p/>
                  </Card>
                </Col>
                <Col xs="6" sm="3">
                  <Card>
                    <CardImg width="100%" alt="Card image cap"
                             src="http://www.tennisthis.com/wp-content/uploads/2011/06/redux.jpg"/>
                    <p/><CardTitle>Game Title</CardTitle>
                    <CardText>
                      게임 설명이지롱~ <br/>
                      조금 더 긴 부가설명 이지롱~ <br/>
                    </CardText>
                    <CardImgOverlay>
                      {/* <div  className="leftCenter"><h5><Badge color="danger">HOT!</Badge></h5></div> */}
                    </CardImgOverlay>
                    <CardText>
                      <Button outline color="danger">START!</Button>
                    </CardText>
                    <p/>
                  </Card>
                </Col>
                <Col xs="6" sm="3">
                  <Card>
                    <CardImg width="100%" alt="Card image cap"
                             src="https://cdn.colorlib.com/wp/wp-content/uploads/sites/2/nodejs-frameworks.png"/>
                    <p/><CardTitle>Game Title</CardTitle>
                    <CardText>
                      게임 설명이지롱~ <br/>
                      조금 더 긴 부가설명 이지롱~ <br/>삼지롱~
                    </CardText>
                    <CardImgOverlay>
                    </CardImgOverlay>
                    <CardText>
                      <Button outline color="danger">START!</Button>
                    </CardText>
                    <p/>
                  </Card>
                </Col>
              </Row>
              <p/>
            </Container>
          </Jumbotron>
        </Fade>
      </div>
    );
  }
}

export default MyGameList;