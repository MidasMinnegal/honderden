import React, {useState} from 'react'
import {ContainerCentered} from "../components/styled/container"
import {Button} from "../components/styled/button"
import styled from "@emotion/styled"
import {Input} from "../components/styled/input"
import {padding} from "../components/styled/variables"

const StyledInput = styled(Input)`
  margin-right: ${padding.base}
`

const Login = () => {
  const [name, setName] = useState('')

  const login = () => {
    localStorage.setItem('myName', name);
  }

  return (
    <ContainerCentered>
      <h1>Who are you?</h1>
      <form>
        <StyledInput
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
        <Button onClick={login}>create</Button>
      </form>
    </ContainerCentered>
  )
}

export default Login
