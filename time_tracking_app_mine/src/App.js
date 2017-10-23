import React, {Component} from 'react';
import shortid from "shortid";
import "./app.css";
import {Card, CardText, CardBody, ButtonGroup, Button} from 'reactstrap';

export class TimersDashboard extends Component {
  
  state = {
    timers: [
      {
        id: shortid.generate(),
        name: "Timer 1",
        elapsed: 0
      },
      {
        id: shortid.generate(),
        name: "Timer 2",
        elapsed: 0
      }
    ]
  };

  onTimerNameChanged = (id, name) => {
    this.setState({
      timers: this.state.timers.map(timer => {
        if (timer.id === id) {
          return Object.assign({}, timer, {name: name});
        } else {
          return timer;
        }
      })
    });
  }

  onTimerDeleted = (id) => {
    this.setState({
      timers: this.state.timers.filter((timer) => timer.id !== id)
    });
  }

  onTimerStarted = (id) => {
    this.setState({
      timers: this.state.timers.map((timer) => {
        if (timer.id === id) {
          return Object.assign({}, timer, {runningSince: Date.now()});
        } else {
          return timer;
        }
      })
    });
  }

  onTimerStopped = (id) => {
    const now = Date.now();

    this.setState({
      timers: this.state.timers.map((timer) => {
        if (timer.id === id) {
          const lastElapsed = now - timer.runningSince;
          return Object.assign({}, timer, {
            runningSince: null,
            elapsed: lastElapsed + timer.elapsed
          });
        } else {
          return timer;
        }
      })
    });
  }
  
  render() {
    return (
      <TimersList timers={this.state.timers} 
        onTimerNameChanged={this.onTimerNameChanged} 
        onTimerDeleted={this.onTimerDeleted} 
        onTimerStarted={this.onTimerStarted}
        onTimerStopped={this.onTimerStopped}/>
    )
  }
}

class TimersList extends Component {

  render() {
    const timers = this.props.timers.map(timer =>
      <EditableTimer key={timer.id} timer={timer} 
        onTimerNameChanged={this.props.onTimerNameChanged}
        onTimerDeleted={this.props.onTimerDeleted} 
        onTimerStarted={this.props.onTimerStarted}
        onTimerStopped={this.props.onTimerStopped}/>
    );
    
    return (
      <div className="container" style={{marginTop: '30px'}}>
        <div className="row">
          <div className="col-lg-4 offset-lg-4">
            <h1 className="display-4" style={{textAlign: "center"}}>Timers</h1>
            <hr/>            
            {timers.length === 0 ? <div style={{textAlign: "center"}}>No timers found</div> : timers}
          </div>
        </div>
      </div>
    );
  }
}

class EditableTimer extends Component {
  
  state = {
    isEditing: false
  };

  onEditClicked = () => {
    this.setState({
      isEditing: true
    });
  };

  onEdited = () => {
    this.setState({
      isEditing: false
    });
  }
  
  render() {
    if (this.state.isEditing) {
      return (
        <TimerUpdateForm id={this.props.timer.id} name={this.props.timer.name} 
          onTimerNameChanged={this.props.onTimerNameChanged}
          onEdited={this.onEdited}/>
      );
    } else {
      return (
        <Timer timer={this.props.timer} 
        onEditClicked={this.onEditClicked} 
        onTimerDeleted={this.props.onTimerDeleted}
        onTimerStarted={this.props.onTimerStarted}
        onTimerStopped={this.props.onTimerStopped}/>
      );
    }
  }
}

class Timer extends Component {

  state = {
    isRunning: false
  };

  componentDidMount() {
    this.setState({
      isRunning: this.props.timer.runningSince != null
    });
    this.forceUpdateInterval = setInterval(() => this.forceUpdate(), 100);
  }

  componentWillUnmount() {
    clearInterval(this.forceUpdateInterval);
  }

  onDeleteClicked = (event) => {
    this.props.onTimerDeleted(this.props.timer.id);
  }

  onStartClicked = (event) => {
    this.props.onTimerStarted(this.props.timer.id);
    this.setState({
      isRunning: true
    });
  }

  onStopClicked = (event) => {
    this.props.onTimerStopped(this.props.timer.id);
    this.setState({
      isRunning: false
    });
  }

  getElapsedTimeString = () => {
    let totalElapsed = this.props.timer.elapsed;
    if (this.props.timer.runningSince) {
      totalElapsed += Date.now() - this.props.timer.runningSince;
    }

    return Helpers.millisecondsToHuman(totalElapsed);
  }

  render() {
    return (
      <Card>
        <CardBody>
          <h5>{this.props.timer.name}</h5>
          <CardText>{this.getElapsedTimeString()}</CardText>
        </CardBody>
        <ButtonGroup>
          <Button color="warning" size="sm" onClick={this.props.onEditClicked}>Edit</Button>          
          <Button color="danger" size="sm" onClick={this.onDeleteClicked}>Delete</Button>          
        </ButtonGroup>
        {this.state.isRunning ? 
          <Button color="danger" size="sm" onClick={this.onStopClicked}>Stop</Button> : 
          <Button color="success" size="sm" onClick={this.onStartClicked}>Start</Button>}
      </Card>
    );
  }
}

class TimerUpdateForm extends Component {

  componentWillMount() {
    this.setState({
      name: this.props.name
    });
  }

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value
    });
  }

  onSubmit = (event) => {
    this.props.onTimerNameChanged(this.props.id, this.state.name);
    this.props.onEdited();
  }

  render() {
    return (
      <Card>
        <CardBody>
          <h5>Update Timer</h5>
          <div className="form-group">
            <input className="form-control form-control-sm" value={this.state.name} 
              onChange={this.handleNameChange}></input>
          </div>
        </CardBody>
        <Button color="success" size="sm" onClick={this.onSubmit}>Submit</Button>
      </Card>
    )
  }
}

class Helpers {
  
  static pad(numberString, size) {
    let padded = numberString;
    while (padded.length < size) padded = `0${padded}`;
    return padded;
  }

  static millisecondsToHuman(ms) {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / 1000 / 60) % 60);
    const hours = Math.floor(ms / 1000 / 60 / 60);

    const humanized = [
      Helpers.pad(hours.toString(), 2),
      Helpers.pad(minutes.toString(), 2),
      Helpers.pad(seconds.toString(), 2),
    ].join(':');

    return humanized;
  }
}
