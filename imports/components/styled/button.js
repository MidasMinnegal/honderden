import styled from '@emotion/styled'
import {color, button, transitionTime, fontSize, borderRadius} from './variables'

export const Button = styled.button`
  background-color: ${color.primary};
  border: 0;
  outline: 0;
  padding: ${button.buttonPadding.h} ${button.buttonPadding.w};
  color: white;
  cursor: pointer;
  transition: ${transitionTime};
  font-size: ${fontSize.primary};
  text-transform: uppercase;
  font-weight: bold;
  border-radius: ${borderRadius};
  
  &:hover,
  &:focus {
    background-color: ${color.secondary};
  }
`
