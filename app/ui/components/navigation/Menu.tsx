import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { State } from '../../../store'
import { User } from '../../../user/interfaces'
import { RankingRegistration } from '../../../ranking/interfaces'
import { ActiveUserNavigationBar } from './ActiveUserNavigationBar'
import { AnonymousNavigationBar } from './AnonymousNavigationBar'

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
`

export const NavLink = styled.a`
  padding: 10px;
  display: block;
`

interface Props {
  user: User | undefined
  registration: RankingRegistration | undefined
}

const NavMenu = ({ user, registration }: Props) => {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }

  return (
    <StyledNav>
      {user ? (
        <ActiveUserNavigationBar registration={registration} />
      ) : (
        <AnonymousNavigationBar />
      )}
    </StyledNav>
  )
}

const mapStateToProps = (state: State) => ({
  user: state.session.user,
  registration: state.ranking.registration,
})

export default connect(mapStateToProps)(NavMenu)
