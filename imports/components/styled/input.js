import styled from '@emotion/styled'
import {borderRadius, button, color, fontSize} from "./variables"

export const Input = styled.input`
  border: 0;
  border-bottom: 1px solid ${color.black};
  padding: ${button.buttonPadding.h} ${button.buttonPadding.w};
  border-radius: ${borderRadius};
  font-size: ${fontSize.primary};
  
  &:focus {
    border-bottom: 1px solid ${color.primary};
    outline: 0;
  }
`
