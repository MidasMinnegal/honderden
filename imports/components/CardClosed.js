import styled from '@emotion/styled'
import {borderRadius, color, shadow} from './styled/variables'

const Card = styled.div`
  width: 100%;
  height: 0px;
  padding-bottom: 166.66667%;
  background-color: white;
  border-radius: ${borderRadius};
  box-shadow: ${shadow.base};
  position: relative;
  
  &:after {
    content: "";
    height: calc(100% - 6px);
    width: calc(100% - 6px);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgb(25,118,210);
    background: linear-gradient(135deg, rgba(25,118,210,1) 0%, rgba(33,150,243,1) 50%, rgba(0,212,255,1) 100%);
    border-radius: ${borderRadius};
    opacity: .75;
  }
`

export default Card
