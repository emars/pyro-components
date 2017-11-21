import React from 'react'
import Pulse from './Pulse'
import hoistStatics from 'hoist-non-react-statics'

const withPulse = config => Component => {
  class C extends React.Component {
    render() {
      const { props, ...rest } = config
      return (
        <div>
          <Pulse {...rest} />
          <Component {...this.props} {...props} />
        </div>
      )
    }
  }

  C.displayName = `withPulse(${Component.displayName || Component.name})`
  C.WrappedComponent = Component

  return hoistStatics(C, Component)
}

export default withPulse
