import styled from 'styled-components'
import { Col, Row } from 'react-flexbox-grid'

export const FormRow = styled(Row)`
  padding: 8px;
`

export const LeftCol = styled(Col)`
  text-align: right;
  @media (max-width: 768px) {
    text-align: left;
  }
`

export const CenterCol = styled(Col)`
  text-align: center;
`
