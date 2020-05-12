import React, {useState} from 'react'
import styled from '@emotion/styled'
import {borderRadius, padding, shadow, transitionTime, color, fontSize} from "./styled/variables"

const Card = styled.div`
  background-color: white;
  width: 150px;
  height: 250px;
  box-shadow: ${shadow.base};
  border-radius: ${borderRadius};
  display: inline-block;
  margin-right: ${padding.base};
  transition: ${transitionTime};
  margin-top: 0;
  position: relative;
  
  ${props => props.clickAble && `
    cursor: pointer;
  
    &:hover {
      margin-bottom: -30px;
      transform: scale(1.1);
      box-shadow: -15px -15px 15px 15px rgba(0, 0, 0, .1);
    }
  `}
  
  &.remove {
    opacity: 0;
    margin-top: 50px;
    margin-bottom: -60px;
    transform: scale(1.1);
    margin-right: -150px;
  }
`

const Number = styled.div`
  position: absolute;
  font-weight: bold;
  font-size: ${fontSize.big};
  color: ${props => props.black ? color.black : color.red};
`

const Centered = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: ${fontSize.big};
  font-weight: bold;
  text-transform: uppercase;
  color: ${props => props.black ? color.black : color.red};
`

const TL = styled(Number)`
  top: ${padding.base};
  left: ${padding.base};
`
const TR = styled(Number)`
  top: ${padding.base};
  right: ${padding.base};
`
const BL = styled(Number)`
  bottom: ${padding.base};
  left: ${padding.base};
`
const BR = styled(Number)`
  bottom: ${padding.base};
  right: ${padding.base};
`

const CardOpen = ({value, type, clickAction, turn, clickAble = true}) => {
  const [className, setClassName] = useState('');
  const black = type === 'spades' || type === 'clubs'

  const click = () => {
    if(clickAble && turn) {
      setClassName('remove');
      setTimeout(() => clickAction(value, type), 150)
    }
  }

  return (
    <Card className={className} clickAble={clickAble} onClick={click}>
      <TL black={black}>{value}</TL>
      <TR black={black}>{value}</TR>
      <BL black={black}>{value}</BL>
      <BR black={black}>{value}</BR>

      <Centered black={black}>{type}</Centered>
    </Card>
  )
}

export default CardOpen
