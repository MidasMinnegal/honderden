import React from 'react'
import styled from "@emotion/styled"
import {padding, color} from "./styled/variables"
import CardClosed from "./CardClosed"

const Wrapper = styled.div`
  margin: 0 -${padding.base};
  width: 100%;
  padding: ${padding.base};
  background-color: ${props => props.turn ? color.secondary : 'rgba(255,255,255,.1)'};
  border-bottom: 1px solid ${color.light};
  position: relative;
    text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 250px;
`

const CardWrapper = styled.div`
  width: 24px;
  margin-left: -19px;
  display: inline-block;
`

const Cards = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: ${padding.base};
`

const Participant = ({turn, participant}) => {
  return (
    <Wrapper turn={turn}>
      {participant.name}
      <Cards>
        {participant.cards.map(card => (
          <CardWrapper><CardClosed/></CardWrapper>
        ))}
      </Cards>
    </Wrapper>
  )
}

export default Participant
