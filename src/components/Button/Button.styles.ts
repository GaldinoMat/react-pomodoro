import styled from 'styled-components'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success'

interface ButtonContainerProps {
  variant: ButtonVariant;
}

// const buttonVariants = {
//   primary: "purple",
//   secondary: "orange",
//   danger: "red",
//   success: "gren",
// };

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;

  border: none;

  margin-right: 12px;

  border-radius: 4px;

  cursor: pointer;

  background-color: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme.white};
`
