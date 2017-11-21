import React from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'

import {
  BlockWrapper,
  FlexRow,
  CenteredFlexColumn,
  BigIcon
} from '../../common'

const FeaturesOne = ({ features }) => (
  <BlockWrapper>
    <FlexRow>
      <CenteredFlexColumn>
        <Typography {...{ type: 'display1' }}>Features</Typography>
      </CenteredFlexColumn>
    </FlexRow>
    <FlexRow>
      {features.map(feature => (
        <CenteredFlexColumn>
          <BigIcon>{feature.icon}</BigIcon>
          <Typography {...{ type: 'title' }}>{feature.name}</Typography>
          <Typography {...{ type: 'body1' }}>{feature.description}</Typography>
        </CenteredFlexColumn>
      ))}
    </FlexRow>
  </BlockWrapper>
)

FeaturesOne.propTypes = {
  features: PropTypes.array.isRequired
}

export default FeaturesOne
