import React from 'react'
import Header from './Header'
import styled, { createGlobalStyle } from 'styled-components'
import Constants from '../Constants'
import Footer from './Footer'

const Layout: React.SFC<{}> = ({ children }) => {
  return (
    <div>
      <GlobalStyle {...Constants} />
      <Header />
      <Container>{children}</Container>
      <Footer />
    </div>
  )
}

export default Layout

const GlobalStyle = createGlobalStyle<typeof Constants>`
  body {
    background: ${props => props.colors.light};
    font-family: 'Open Sans', sans-serif;
    margin: 0;
    padding: 0;
  }

  a {
    color: ${props => props.colors.dark}
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover, &:active, &:focus {
      color: ${props => props.colors.primary}
    }
  }

  a[href],
  input[type='submit']:not([disabled]),
  input[type='image']:not([disabled]),
  label[for]:not([disabled]),
  select:not([disabled]),
  button:not([disabled]) {
    cursor: pointer;
  }
`

const Container = styled.div`
  padding: 20px;
  max-width: ${Constants.maxWidth};
  margin: 0 auto;
`
