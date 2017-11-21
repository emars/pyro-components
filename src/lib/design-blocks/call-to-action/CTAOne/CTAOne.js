import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Typography from 'material-ui/Typography'

import { BlockWrapper, FlexRow, FlexColumn } from '../../common'

const CTAImage = styled.img`max-width: 100%;`

const CTAOne = ({ title, imageUrl, description, cta, logo }) => (
  <BlockWrapper>
    <FlexRow>
      <FlexColumn>
        {logo && logo}
        <Typography {...{ type: 'display1' }}>{title}</Typography>
        <Typography {...{ type: 'body1' }}>{description}</Typography>
        {cta && cta}
      </FlexColumn>
      <FlexColumn>
        <CTAImage {...{ src: imageUrl }} />
      </FlexColumn>
    </FlexRow>
  </BlockWrapper>
)

CTAOne.propTypes = {
  logo: PropTypes.node.isRequired,
  imageUrl: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  cta: PropTypes.node.isRequired
}

export default CTAOne
