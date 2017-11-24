import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
import Popover from 'material-ui/Popover'

/**
 * CONFIG
 */
const getConfig = () => ({
  circleSize: 14
})

const config = getConfig()

const outerRipple = keyframes`
    0% {
      transform: scale(1);
      filter: alpha(opacity=50);
      opacity: 0.5;
    }
    80% {
      transform: scale(3.5);
      filter: alpha(opacity=0);
      opacity: 0;
    }
    100% {
      transform: scale(3.5);
      filter: alpha(opacity=0);
      opacity: 0;
    }
`

const innerRipple = keyframes`
    0% {
      transform: scale(1);
      filter: alpha(opacity=50);
      opacity: 0.5;
    }
    30% {
      transform: scale(1);
      filter: alpha(opacity=50);
      opacity: 0.5;
    }
    100% {
      transform: scale(2.5);
      filter: alpha(opacity=0);
      opacity: 0;
    }
`
const Pulse = styled.div`
  width: ${config.circleSize}px;
  height: ${config.circleSize}px;
  background-color: #2980b9;
  border-radius: 50%;
  position: relative;
  z-index: 100000;
  left: 48%;
  cursor: pointer;

  &:after,
  &:before {
    display: inline-block;
    margin: auto;
    position: absolute;
    content: '';
    width: ${config.circleSize}px;
    height: ${config.circleSize}px;
    border-radius: 50%;
    background-color: #2980b9;
  }

  &:after {
    z-index: 100;
    animation: ${outerRipple} 2000ms linear infinite;
  }

  &:before {
    z-index: 200;
    animation: ${innerRipple} 2000ms linear infinite;
  }
`

class PulseComponent extends Component {
  state = {
    clicked: false,
    open: false,
    anchorEl: null
  }
  handleClick = evt =>
    this.setState({
      open: true,
      anchorEl: evt.target,
      clicked: true
    })
  handleRequestClose = () => this.setState({ open: false, anchorEl: null })

  render() {
    return (
      <div
        {...{
          ref: ref => (this.pulse = ref),
          style: {
            height: 0
          }
        }}
      >
        {!this.state.clicked && (
          <Pulse
            {...{
              onClick: this.handleClick
            }}
          />
        )}
        {this.pulse && (
          <Popover
            {...{
              open: this.state.open,
              anchorEl: this.pulse,
              onRequestClose: this.handleRequestClose,
              anchorOrigin: {},
              transformOrigin: {}
            }}
          >
            <div {...{ style: { padding: 16 } }}>{this.props.content}</div>
          </Popover>
        )}
      </div>
    )
  }
}

export default PulseComponent
