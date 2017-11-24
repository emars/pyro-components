/**
 * https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API
 */
import React, { Component } from 'react'

class NetworkInformation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      connection:
        navigator.connection ||
        navigator.mozConnection ||
        navigator.webkitConnection
    }
  }
  handleUpdate = () => {}
  componentDidMount() {
    const connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection

    const supported = !!connection

    if (!supported) {
      return this.setState({})
    }

    connection.addEventListener('typechange', this.handleUpdate)
  }
  render() {
    return this.state.connectionType
  }
}

export default NetworkInformation
