import styled from 'styled-components'
import Constants from '../Constants'
import { SFC, ButtonHTMLAttributes } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface ButtonProps {
  primary?: boolean
  icon?: IconProp
}

export const Button: SFC<
  ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps
> = ({ icon, children, ...props }) => (
  <StyledButton {...props}>
    {icon && <ButtonIcon icon={icon} />}
    {children}
  </StyledButton>
)

const StyledButton = styled.button`
  border: 1px solid rgba(0, 0, 0, 0.12);
  background: transparent;
  box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.08),
    0px 2px 3px 0px rgba(0, 0, 0, 0.08);
  padding: 4px 12px;
  font-size: 1.1em;
  font-weight: 600;
  height: 36px;
  border-radius: 3px;
  box-sizing: border-box;

  ${({ primary }: { primary?: boolean }) =>
    primary &&
    `
    color: ${Constants.colors.light};
    background-color: ${Constants.colors.primary};
  `}

  &:disabled {
    opacity: 0.6;
  }
`

const ButtonIcon = styled(FontAwesomeIcon)`
  margin-right: 7px;
  height: 75%;
  width: 75%;
`