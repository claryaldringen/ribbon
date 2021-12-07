import styled from 'styled-components'
import Loader from 'react-loader-spinner'

export const Spinner = styled(Loader)`
  padding-left: calc(50% - 40px);
  padding-top: 33vh;
`

export const Error = styled.div`
  position: absolute;
  width: 320px;
  color: #fff;
  background: #ee0000;
  text-align: center;
  padding: 1%;
  left: calc(50% - 160px);
  top: 25vh;
`
