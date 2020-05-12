import React, {useState} from 'react';
import {Button} from '../components/styled/button'
import {Input} from '../components/styled/input'
import {ContainerCentered} from '../components/styled/container'
import styled from '@emotion/styled'
import {padding} from "../components/styled/variables"

const StyledInput = styled(Input)`
  margin-right: ${padding.base}
`

const Home = () => {
  const [roomName, setRoomName] = useState('')

  const createRoom = (event) => {
    const userName = localStorage.getItem('myName');

    event.preventDefault()
    Meteor.call('rooms.insert', {title: roomName, author: userName}, (error, id) => {
      if(!error) {
        window.location.href = `/room/${id}`
      } else {
        console.error(error)
      }
    })
  }

  return (
    <ContainerCentered>
      <h1>Create a room</h1>
      <form>
        <StyledInput
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Room name"
        />
        <Button onClick={createRoom}>create</Button>
      </form>
    </ContainerCentered>
  )
}

export default Home
