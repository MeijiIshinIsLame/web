import styled from 'styled-components'
import Constants from '../Constants'
import { SFC, ButtonHTMLAttributes } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface ButtonProps {
  primary?: boolean
  large?: boolean
  small?: boolean
  destructive?: boolean
  plain?: boolean
  icon?: IconProp
  alignIconRight?: boolean
}

export const Button: SFC<
  ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps
> = ({ icon, alignIconRight, children, ...props }) => (
  <StyledButton {...props}>
    {icon && !alignIconRight && <ButtonIconLeft icon={icon} />}
    {children}
    {icon && alignIconRight && <ButtonIconRight icon={icon} />}
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
  height: 48px;
  line-height: 36px;
  border-radius: 3px;
  box-sizing: border-box;
  margin: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover:not([disabled]),
  &:active:not([disabled]),
  &:focus:not([disabled]) {
    box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.1),
      0px 2px 3px 0px rgba(0, 0, 0, 0.15);
  }

  &:active:not([disabled]),
  &:focus:not([disabled]) {
    outline: none;
    border-color: ${Constants.colors.primary};
  }

  ${({ plain }: ButtonProps) =>
    plain &&
    `
    background-color: transparent;
    box-shadow: none;
    border: none;
    padding: 0;

    &:hover:not([disabled]),
    &:active:not([disabled]),
    &:focus:not([disabled]) {
      box-shadow: none;
      color: ${Constants.colors.primary};
    }

    &:active:not([disabled]),
    &:focus:not([disabled]) {
      text-decoration: underline;
    }
  `}

  ${({ primary }: ButtonProps) =>
    primary &&
    `
    color: ${Constants.colors.light};
    background-color: ${Constants.colors.primary};
    box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.08),
      0px 2px 3px 0px rgba(0, 0, 0, 0.24);

    &:hover:not([disabled]),
    &:active:not([disabled]),
    &:focus:not([disabled]) {
      box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.1),
        0px 2px 3px 0px rgba(0, 0, 0, 0.3),
        0px 2px 6px 2px ${Constants.colors.primaryWithAlpha(0.4)};
    }
  `}

  ${({ large }: ButtonProps) =>
    large &&
    `
    height: 56px;
    font-size: 1.4em;
    padding: 8px 24px;
    border-radius: 4px;
  `}

  ${({ small }: ButtonProps) =>
    small &&
    `
    font-size: 0.9em;
    border-radius: 2px;
  `}

  ${({ destructive }: ButtonProps) =>
    destructive &&
    `
    color: ${Constants.colors.destructive};
    border-color: ${Constants.colors.destructive};
    background-color: transparent;

    &:hover:not([disabled]),
    &:active:not([disabled]),
    &:focus:not([disabled]) {
      color: ${Constants.colors.light};
      background-color: ${Constants.colors.destructive};
      box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.1),
        0px 2px 3px 0px rgba(0, 0, 0, 0.15),
        0px 2px 6px 2px ${Constants.colors.destructiveWithAlpha(0.4)};
    }
  `}

  &:disabled {
    opacity: 0.6;
  }
`

const ButtonIconLeft = styled(FontAwesomeIcon)`
  margin-right: 7px;
  height: 75%;
  width: 75%;
`

const ButtonIconRight = styled(FontAwesomeIcon)`
  margin-left: 7px;
  height: 75%;
  width: 75%;
`

export const ButtonContainer = styled.div`
  display: flex;
`

export const StackContainer = styled.div`
  display: flex;
  flex-direction: column;

  > * {
    width: 100%;
    box-sizing: border-box;
    margin-left: 0;
    margin-right: 0;
  }

  > * + * {
    margin-top: 12px;
  }
`
