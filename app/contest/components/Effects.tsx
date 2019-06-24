import { Dispatch } from 'redux'
import * as ContestStore from '../redux'
import { connect, useDispatch } from 'react-redux'
import { Contest } from '../interfaces'
import ContestApi from '../api'
import { useCachedApiState } from '../../cache'

interface Props {
  updateLatestContest: (contest: Contest | undefined) => void
}

const ContestEffects = ({ updateLatestContest }: Props) => {
  const dispatch = useDispatch()
  useCachedApiState({
    cacheKey: `latest_contest?i=1`,
    defaultValue: undefined as Contest | undefined,
    fetchData: ContestApi.getLatest,
    onChange: updateLatestContest,
    dispatch,
  })

  return null
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateLatestContest: (contest: Contest | undefined) => {
    dispatch({
      type: ContestStore.ActionTypes.ContestUpdateLatestContest,
      payload: {
        latestContest: contest,
      },
    })
  },
})

export default connect(
  null,
  mapDispatchToProps,
)(ContestEffects)
