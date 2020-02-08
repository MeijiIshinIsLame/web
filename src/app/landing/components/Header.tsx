import React from 'react'
import styled from 'styled-components'

import SignupCard from './SignupCard'

interface Props {
  refreshSession: () => void
  openLoginModal: () => void
}

const Header = ({ refreshSession, openLoginModal }: Props) => (
  <Background>
    <Grid>
      <IntroCard>
        <Logo />
        <Title>Get good at your second language</Title>
        <Tagline>
          Tadoku is a friendly foreign-language reading contest aimed at
          building a habit of reading in your non-native languages.
        </Tagline>
      </IntroCard>
      <SignupCard
        refreshSession={refreshSession}
        openLoginModal={openLoginModal}
      />
    </Grid>
  </Background>
)

export default Header

const Background = styled.div`
  width: 100%;
  max-width: 1850px;
  height: 460px;
  margin: 0 auto;
  background-image: url('./img/header.jpg');
  background-size: cover;
`

const Grid = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  position: relative;
`

const IntroCard = styled.div`
  background: #f2f8ff;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.08);
  max-width: 505px;
  box-sizing: border-box;
  padding: 60px;
`

const Logo = styled.img.attrs(() => ({
  src: './img/logo.svg',
  alt: 'Tadoku',
}))`
  height: 29px;
  width: 158px;
`
const Title = styled.h1`
  font-family: 'Merriweather', serif;
  margin: 60px 20px 30px 0;
  font-size: 30px;
  line-height: 37px;
  font-weight: 700;
`

const Tagline = styled.p`
  font-size: 18px;
  line-height: 29px;
  font-family: 'Open sans', serif;
  padding: 0;
  margin: 0;
`
