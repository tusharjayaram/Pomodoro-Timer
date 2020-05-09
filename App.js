import React, {Component, useState} from 'react';
import { TextInput, ScrollView, Button, StyleSheet, Text, View } from 'react-native';
import {vibrate} from './utils'


class Counter extends React.Component {
  state = {
    baseMinutes: '25',
    baseSeconds: '00',
    breakBaseMin: '05',
    breakBaseSec: '00',
    minutes: '25',
    seconds: '00',
    breakMin: '05',
    breakSec: '00',
    isPaused: false,
    buttonToggle: 'Pause',
    mode: "Work"
  }
  componentDidMount() {
    this.interval = setInterval(this.dec, 1000)
    this.interval = setInterval(this.updateButton, 0)
    this.interval = setInterval(this.breaker, 0)
  }
  dec = () => {
    if (!this.state.isPaused) {
        if (this.state.seconds === "00") {
      this.setState({
        minutes: (this.state.minutes - '1') < '10' ? '0' + (this.state.minutes - '1') : (this.state.minutes - '1'),
        seconds: "59",
      })
    }
    else {
      this.setState({
        minutes: this.state.minutes,
        seconds: (this.state.seconds - '1') < '10' ? '0' + (this.state.seconds - '1') : (this.state.seconds - '1')
      })
    }
    }
  }
  reset = () => {
    if (this.mode === "Work") {
      this.setState({
        minutes: this.state.baseMinutes,
        seconds: this.state.baseSeconds
      })
    }
    else {
      this.setState({
        minutes: this.state.breakBaseMin,
        seconds: this.state.breakBaseSec
      })
    }
  }
  pause = () => this.setState(prevState => ({
    isPaused: !prevState.isPaused,
  }))
  updateButton = () => {
    if (this.state.isPaused) {
      this.setState({
        buttonToggle: 'Play'
      })
    }
    else {
      this.setState({
        buttonToggle: 'Pause'
      })
    }
  }
  breaker = () => {
    if (this.state.minutes === '00' && this.state.seconds === '00') {
      if (this.state.mode === 'Work') {
        this.setState({
          minutes: this.state.breakBaseMin,
          seconds: this.state.breakBaseSec,
          mode: "Break"
        })
      }
      else {
        this.setState({
          minutes: this.state.baseMinutes,
          seconds: this.state.baseSeconds,
          mode: "Work"
        })
      }
    }

  }
  minuteChanger = (props) => {
    this.setState({
      minutes: props,
      seconds: '00',
      baseMinutes: props,
      baseSeconds: '00',
      isPaused: true
    })
  }
  secondChanger = (props) => {
    this.setState({
      seconds: props,
      baseSeconds: props,
      isPaused: true
    })
  }
  breakMC = (props) => {
    this.setState({
      breakMin: props,
      breakSec: '00',
      breakBaseMin: props,
      breakBaseSec: '00',
      isPaused: true
    })
  }
  breakSC = (props) => {
    this.setState({
      breakSec: props,
      breakBaseSec: props,
      isPaused: true
    })
  }
  render() {
    return ( 
      <ScrollView>
        <Text style = {styles.container}> {this.state.minutes}:{this.state.seconds} </Text>
        <Button title= "Reset" onPress = {this.reset} style = {styles.buttons}/>
        <Button title = {`${this.state.buttonToggle}`} onPress = {this.pause} />
        <Text style = {{fontSize: 40}}> WORK INPUTS </Text>
        <Text style = {styles.labeler}> Mins: </Text>
        <TextInput style = {styles.inputter}
        placeholder = '25'
        onChangeText = {this.minuteChanger}
        />
        <Text style = {styles.labeler}> Secs: </Text>
        <TextInput style = {styles.inputter}
        placeholder = '00'
        onChangeText = {this.secondChanger}
        />
        <Text style = {{fontSize: 40}}> BREAK INPUTS </Text>
        <Text style = {styles.labeler}> Mins: </Text>
        <TextInput style = {styles.inputter}
        placeholder = '05'
        onChangeText = {this.breakMC}
        />
        <Text style = {styles.labeler}> Secs: </Text>
        <TextInput style = {styles.inputter}
        placeholder = '00'
        onChangeText = {this.breakSC}
        />
      </ScrollView>
    )
  }
}

export default class App extends React.Component {
  state = {
    minutes: '34',
    seconds: '15'
  }
  minuteChanger = (text) => {
    this.setState({
      minutes: text
    })
  }
  secondChanger = (text) => {
    this.setState({
      seconds: text
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style = {{fontSize: 30, color: 'black', paddingTop: 20}}>
          Pomodoro Timer
        </Text>
        <Counter />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    fontSize: 100,
  },
  buttons: {
    paddingBottom: 20,
    alignItems: 'center',
    fontSize: 15,
  },
  inputter: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 10,
    width: 200,
    marginLeft: 50
  },
  labeler: {
    textAlign: 'center',
    justifyContent: 'center'
  },
});
