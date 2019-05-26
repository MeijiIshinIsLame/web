import {
  AggregatedContestLogsByDayEntry,
  ContestLog,
  Ranking,
  RankingRegistrationOverview,
} from './interfaces'
import { Contest } from './../contest/interfaces'
import { languageNameByCode } from './database'

type AggregatedByDaysResult = {
  [languageCode: string]: AggregatedContestLogsByDayEntry[]
}

export const aggregateContestLogsByDays = (
  logs: ContestLog[],
  contest: Contest,
): AggregatedByDaysResult => {
  const aggregated: {
    [languageCode: string]: { [date: string]: AggregatedContestLogsByDayEntry }
  } = {}

  const languages: string[] = []

  logs.forEach(log => {
    if (!languages.includes(log.languageCode)) {
      languages.push(log.languageCode)
    }
  })

  const initializedSeries: {
    [date: string]: AggregatedContestLogsByDayEntry
  } = {}

  getDates(contest.start, contest.end).forEach(date => {
    initializedSeries[prettyDate(date)] = { x: date, y: 0 }
  })

  languages.forEach(language => {
    const series: typeof initializedSeries = {}

    Object.keys(initializedSeries).forEach(date => {
      series[date] = { ...initializedSeries[date] }
    })

    aggregated[language] = series
  })

  logs.forEach(log => {
    const date = prettyDate(log.date)

    aggregated[log.languageCode][date].y +=
      Math.round(log.adjustedAmount * 10) / 10
  })

  const result: AggregatedByDaysResult = {}

  Object.keys(aggregated).forEach(languageCode => {
    result[languageCode] = Object.values(aggregated[languageCode])
  })

  return result
}

export const prettyDate = (date: Date): string =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

const getDates = (startDate: Date, endDate: Date) => {
  const dates = []

  let currentDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate(),
  )

  while (currentDate <= endDate) {
    dates.push(currentDate)

    currentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1,
    )
  }

  return dates
}

export const rankingsToRegistrationOverview = (
  rankings: Ranking[],
): RankingRegistrationOverview | undefined => {
  if (rankings.length === 0) {
    return undefined
  }

  const registrations = rankings
    .map(r => ({
      languageCode: r.languageCode,
      amount: r.amount,
    }))
    .reduce(
      (acc, element) => {
        if (element.languageCode === 'GLO') {
          return [element, ...acc]
        }
        return [...acc, element]
      },
      [] as { languageCode: string; amount: number }[],
    )

  return {
    contestId: rankings[0].contestId,
    userId: rankings[0].userId,
    userDisplayName: rankings[0].userDisplayName,
    registrations,
  }
}

export const amountToPages = (amount: number) => Math.round(amount * 10) / 10

export const pagesLabel = (languageCode: string) =>
  `pages in ${languageNameByCode(languageCode)}`
