import React from 'react'
import Pulse from './Pulse'

const Pulsed = ({ children, ...rest }) => {
  return (
    <div>
      <Pulse {...rest} />
      {children}
    </div>
  )
}

export default Pulsed
