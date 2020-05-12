import React from 'react'
global.Buffer = global.Buffer || require("buffer").Buffer;
import { withTracker } from 'meteor/react-meteor-data'
import {Rooms} from "../api/collections/rooms"
import '../api/subscribers/room'
import {Container} from "../components/styled/container"
import CardOpen from "../components/CardOpen"
import CardClosed from "../components/CardClosed"
import styled from '@emotion/styled'
import { CSSTransitionGroup } from 'react-transition-group'
import {padding, color, shadow} from "../components/styled/variables"
import Participant from "../components/Participant"
import {Button} from "../components/styled/button"

const CardWrapper = styled.div`
  width: 150px;
  display: inline-block;
  vertical-align: top;
  margin-right: -142px;
  transition: .5s;
  
  &.card-slide-enter {
    opacity: 0;
    margin-top: 50px;
    margin-bottom: -50px;
    transform: scale(1.25);
    
    &.card-slide-enter-active {
      opacity: 1;
      margin-bottom: 0;
      transform: scale(1);
    }
  }
  
  &.card-slide-leave {
    opacity: 1;
    margin-bottom: 0;
    transform: scale(1);
    
    &.card-slide-leave-active {
      opacity: 0;
      margin-top: 50px;
      margin-bottom: -50px;
      transform: scale(1.25);
    }
  }
`

const AntiMargin = styled.div`
  width: calc(100% + 30px);
  height: calc(100% + 30px);
  margin: -${padding.base};
  display: table
`

const SideBarLeft = styled.div`
  display: table-cell;
  width: 250px;
  overflow: hidden;
  height: 100%;
  background-color: ${color.light};
  box-shadow: ${shadow.base};
  color: white;
  vertical-align: top;
  padding: ${padding.big} ${padding.base};
  box-sizing: border-box;
`

const MainContent = styled.div`
  display: table-cell;
  width: calc(100% - 250px);
  height: 100%;
  vertical-align: top;
  padding: ${padding.big};
  box-sizing: border-box;
`

const MyHand = styled.div`
  position: relative;
  z-index: 10;
`

const Room = ({loading, joined, myName, room}) => {
  if(!room) return <></>

  const drawCard = () => {
    Meteor.call('rooms.drawCard', {id: room._id, name: myName})
  }

  const playCard = (value, type) => {
    if(myTurn) {
      Meteor.call('rooms.playCard', {id: room._id, name: myName, card: {value, type}})
      drawCard();
    }
  }

  if(!joined) {
    Meteor.call('rooms.join', {id: room._id, name: myName})

    drawCard()
    drawCard()
    drawCard()
    drawCard()
  }

  const myIndex = room.people.findIndex(({name}) => name === myName)
  const myHand = room.people[myIndex]?.cards || []
  const myTurn = myIndex === room.turn

  return (
    <Container>
      <AntiMargin>
        <SideBarLeft>
          <h2>Participants</h2>
          {room.people.map((participant, index) => (
            <Participant key={participant.name} turn={index === room.turn} participant={participant}/>
          ))}
        </SideBarLeft>
        <MainContent>
          <h1>{room.title}</h1>
          <MyHand>
            <h3>My hand</h3>
            {myHand.map((card) => (
              <CardOpen key={card.value + card.type} {...card} clickAction={playCard} turn={myTurn}/>
            ))}
          </MyHand>
          <div>
            <h3>Last card</h3>
            <CardOpen {...room.lastCard} clickAble={false} />
            <CSSTransitionGroup
              transitionName="card-slide"
              transitionEnterTimeout={600}
              transitionLeaveTimeout={600}>
                {room.deck.map((item, index) =>
                <CardWrapper key={index}><CardClosed/></CardWrapper>
                )}
            </CSSTransitionGroup>
          </div>
        </MainContent>
      </AntiMargin>
    </Container>
  )
}

export default withTracker((props) => {
  const roomId = props.match.params.id
  const handle = Meteor.subscribe('rooms')
  const room = Rooms.findOne({_id: roomId})
  const myName = localStorage.getItem('myName');

  return {
    loading: !handle.ready(),
    joined: room?.people.some(({name}) => name === myName),
    myName,
    room
  }

})(Room)
