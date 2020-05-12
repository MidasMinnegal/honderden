import styled from '@emotion/styled'
import {padding, shadow} from "./variables"

export const ContainerCentered = styled.div`
  background-color: white;
  padding: ${padding.big};
  display: inline-block;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  box-shadow: ${shadow.big};
`

export const Container = styled.div`
  width: 100%;
  max-width: 1100px;
  padding: ${padding.base};
  background-color: white;
  box-shadow: ${shadow.big};
  margin: ${padding.big} auto 0;
`
