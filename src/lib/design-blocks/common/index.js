import styled from 'styled-components'

export const BlockWrapper = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
`

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  & > * {
    margin-top: 12px;
    margin-bottom: 12px;
  }
`

export const CenteredFlexColumn = styled(FlexColumn)`
  align-items: center;
  justify-content: center;
`

export const BigIcon = styled.div`
  & > * {
    width: 50px !important;
    height: 50px !important;
  }
`
