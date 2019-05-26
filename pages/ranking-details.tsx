import React, { useState, useEffect } from 'react'
import Layout from '../app/ui/components/Layout'
import ErrorPage from 'next/error'
import { ExpressNextContext } from '../app/interfaces'
import {
  ContestLog,
  RankingRegistrationOverview,
} from '../app/ranking/interfaces'
import RankingApi from '../app/ranking/api'
import ContestApi from '../app/contest/api'
import ContestLogsByDayGraph from '../app/ranking/components/ContestLogsByDayGraph'
import { rankingsToRegistrationOverview } from '../app/ranking/transform'
import { Contest } from '../app/contest/interfaces'

interface Props {
  contestId: number | undefined
  userId: number | undefined
}

const RankingDetails = ({ contestId, userId }: Props) => {
  const [loaded, setLoaded] = useState(false)
  const [logs, setLogs] = useState([] as ContestLog[])
  const [contest, setContest] = useState(undefined as Contest | undefined)
  const [registration, setRegistration] = useState(undefined as
    | RankingRegistrationOverview
    | undefined)

  useEffect(() => {
    if (!contestId || !userId) {
      return
    }

    const getLogs = async () => {
      const [contest, logs, registration] = await Promise.all([
        ContestApi.get(contestId),
        RankingApi.getLogsFor(contestId, userId),
        RankingApi.getRankingsRegistration(contestId, userId),
      ])

      setContest(contest)
      setLogs(logs)
      setRegistration(rankingsToRegistrationOverview(registration))
      setLoaded(true)
    }

    getLogs()
  }, [contestId, userId])

  if (!contestId || !userId) {
    return <ErrorPage statusCode={404} />
  }

  if (!loaded) {
    return <Layout>Loading...</Layout>
  }

  if (!registration || !contest) {
    return <ErrorPage statusCode={500} />
  }

  return (
    <Layout>
      <h1>{registration.userDisplayName}</h1>
      <ContestLogsByDayGraph logs={logs} contest={contest} />
    </Layout>
  )
}

RankingDetails.getInitialProps = async ({ req, query }: ExpressNextContext) => {
  if (req && req.params) {
    const { contest_id, user_id } = req.params

    return {
      contestId: parseInt(contest_id),
      userId: parseInt(user_id),
    }
  }

  if (query.contest_id && query.user_id) {
    const { contest_id, user_id } = query

    return {
      contestId: parseInt(contest_id as string),
      userId: parseInt(user_id as string),
    }
  }

  return {}
}

export default RankingDetails
