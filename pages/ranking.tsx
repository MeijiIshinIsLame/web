import React from 'react'
import Layout from '../components/ui/Layout'
import { Ranking } from '../domain/Ranking'
import RankingList from '../app/ranking/List'
import RankingApi from '../app/ranking/api'

interface Props {
  rankings: Ranking[]
}

const Home = (props: Props) => {
  return (
    <Layout>
      <RankingList rankings={props.rankings} />
    </Layout>
  )
}

Home.getInitialProps = async (_: any) => {
  const rankings = await RankingApi.get(1)

  if (rankings.length > 0) {
    return { rankings }
  }

  return { rankings: [] }
}

export default Home
