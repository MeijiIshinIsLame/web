import React from 'react'
import { connect } from 'react-redux'
import { State } from '../app/store'
import RankingOverview from '../app/ranking/pages/RankingOverview'
import { Dispatch } from 'redux'
import * as RankingStore from '../app/ranking/redux'
import { Contest } from '../app/contest/interfaces'
import { RankingRegistration } from '../app/ranking/interfaces'
import { User } from '../app/session/interfaces'

const mapStateToProps = (state: State) => ({
  contest: state.contest.latestContest,
  registration: state.ranking.registration,
  user: state.session.user,
  effectCount: state.ranking.runEffectCount,
})

const mapDispatchToProps = (dispatch: Dispatch<RankingStore.Action>) => ({
  dispatch,
  refreshRegistration: () => {
    dispatch({
      type: RankingStore.ActionTypes.RankingRunEffects,
    })
  },
})

interface Props {
  contest: Contest | undefined
  registration: RankingRegistration | undefined
  user: User | undefined
  effectCount: number
  refreshRegistration: () => void
  dispatch: Dispatch
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(({ contest, ...props }: Props) => {
  if (!contest) {
    return null
  }

  return <RankingOverview contest={contest} {...props} />
})
