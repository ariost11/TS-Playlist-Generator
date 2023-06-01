import * as React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormCheck from 'react-bootstrap/FormCheck';
import FormSelect from 'react-bootstrap/FormSelect';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import Results from './Results.js';

export default class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [5, 5, 5, 5, 'Both'],
      enabled: [false, false, false, false],
      duration: 30,
      generated: sessionStorage.getItem('generated') ? sessionStorage.getItem('generated') === 'true' : false,
      songList: sessionStorage.getItem('songList') ? sessionStorage.getItem('songList').split(',') : [],
    };

    this.updateAnswers = this.updateAnswers.bind(this);
    this.updateRangesEnabled = this.updateRangesEnabled.bind(this);
    this.generateList = this.generateList.bind(this);
    this.reset = this.reset.bind(this);
    this.setSongList = this.setSongList.bind(this);
  }

  updateAnswers(question, value) {
    let newAnswers = this.state.answers;
    newAnswers[question] = value / 100;
    this.setState({
      answers: newAnswers,
    });
  }

  updateRangesEnabled(question) {
    let newEnabled = this.state.enabled;
    newEnabled[question] = !newEnabled[question];
    this.setState({
      enabled: newEnabled,
    });
  }

  updateDuration(value) {
    this.setState({
      duration: value
    });
  }

  generateList() {
    let newAnswers = this.state.answers;
    this.state.enabled.forEach((a, ai) => {
      if (a) newAnswers[ai] = -1;
    });

    this.setState({
      answers: newAnswers,
      generated: true,
    });

    sessionStorage.setItem('generated', true);
    document.getElementById('title').scrollIntoView();
  }

  reset() {
    sessionStorage.removeItem('generated');
    sessionStorage.removeItem('songList');
    this.setState({
      answers: [5, 5, 5, 5, 'Both'],
      enabled: [false, false, false, false],
      duration: 30,
      generated: false,
      songList: [],
    });
    document.getElementById('title').scrollIntoView();
  }

  setSongList(newList) {
    sessionStorage.setItem('songList', newList);
    this.setState({
      songList: newList,
    });
  }

  render() {
    let leftTitle = ['Sad', 'Passive', 'Calm', 'Superficial'];
    let rightTitle = ['Happy', 'Aggressive', 'Upbeat', 'Deep'];
    const questionList = [0, 1, 2, 3].map((a) => (
      <Row key={a} id='row-question' className="justify-content-md-center">
        <Row id='row-slider'>
          <Col id='slider' xs='10' sm='10' md='10' lg='10' >
              <input
                type="range"
                defaultValue={500}
                min={0}
                max={1000}
                onChange={(e) => this.updateAnswers(a, parseInt(e.target.value))}
                disabled={this.state.enabled[a]}
              />
            </Col>
            <Col xs='2' sm='2' md='2' lg='2' id='excludeButton'>
              <FormCheck
                onChange={() => this.updateRangesEnabled(a)}
              />
          </Col>
        </Row>
        <Row className="justify-content-md-center" id='no-margin'>
          <Col xs='10' sm='10' md='10' lg='10'>
            <Row>
              <Col xs='6' sm='6' md='6' lg='6' id='leftLabel'>{leftTitle[a]}</Col>
              <Col xs='6' sm='6' md='6' lg='6' id='rightLabel'>{rightTitle[a]}</Col>
            </Row>
          </Col>
          <Col xs='2' sm='2' md='2' lg='2'></Col>
        </Row>
      </Row>
    ));

    const generateDisabled = this.state.enabled[0] === true && this.state.enabled[1] === true && this.state.enabled[2] === true && this.state.enabled[3] === true;
    const generatePopup = (
      <Popover id="overlay" title="Generate Popup">
        Enable At Least One Mood!
      </Popover>
    );

    return (
      <div>
        {!this.state.generated && <Container fluid>
          <Row id='row-title'>
            <Col id='subTitle' xs='10' sm='10' md='10' lg='10'>Select Mood</Col>
            <Col xs='2' sm='2' md='2' lg='2' id='excludeLabel'>Exclude</Col>
          </Row>
          {questionList}
          <Row id='row-question'>
            <Col 
              id='regText' 
              xs={{ span: 4, offset: 3 }}
              sm={{ span: 4, offset: 3 }}
              md={{ span: 4, offset: 3 }}
              lg={{ span: 4, offset: 3 }}
            >About Romance?</Col>
            <Col xs='2' sm='2' md='2' lg='2'>
              <FormSelect
                id='select'
                onChange={(e) => this.updateAnswers(4, e.target.value)}
              >
                <option id='menu-text'>Both</option>
                <option id='menu-text'>Yes</option>
                <option id='menu-text'>No</option>
              </FormSelect>
            </Col>
          </Row>
          <Row id='row-question'>
            <Col 
              id='regText'
              xs={{ span: 4, offset: 3 }}
              sm={{ span: 4, offset: 3 }}
              md={{ span: 4, offset: 3 }}
              lg={{ span: 4, offset: 3 }}
            >Duration</Col>
            <Col xs='4' sm='4' md='4' lg='4'>
              <FormSelect
                id='select'
                onChange={(e) => this.updateDuration(e.target.value)}
              >
                <option id='menu-text' value={30}>30 minutes</option>
                <option id='menu-text' value={60}>60 minutes</option>
                <option id='menu-text' value={90}>90 minutes</option>
                <option id='menu-text' value={120}>2 hours</option>
                <option id='menu-text' value={180}>3 hours</option>
              </FormSelect>
            </Col>
          </Row>
          <Row className="justify-content-md-center" id='row-question'>
            <Col xs='4' sm='4' md='4' lg='4'></Col>
            <Col xs='4' sm='4' md='4' lg='4'>
              {!generateDisabled ?
                <Button id='generate-button' onClick={() => this.generateList()}>Generate Playlist!</Button>
                :
                  <OverlayTrigger 
                    trigger='hover'
                    placement='right'
                    overlay={generatePopup}
                  >
                    <div><Button id='generate-button' disabled={true}>Generate Playlist!</Button></div>
                  </OverlayTrigger>
              }
            </Col>
            <Col xs='4' sm='4' md='4' lg='4'></Col>
          </Row>
        </Container>}
        <Row>
          <Col>
            {this.state.generated && <Results reset={this.reset} answers={this.state.answers} duration={this.state.duration} songList={this.state.songList} setSongList={this.setSongList}/>}
          </Col>
        </Row>
      </div>
    );
  }
}
