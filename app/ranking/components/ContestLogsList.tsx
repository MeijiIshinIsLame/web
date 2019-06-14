import React, { useState } from 'react'
import { ContestLog, RankingRegistrationOverview } from '../interfaces'
import styled from 'styled-components'
import { languageNameByCode, mediumDescriptionById } from '../database'
import { amountToPages } from '../transform'
import EditLogFormModal from './modals/EditLogFormModal'
import { State } from '../../store'
import { connect } from 'react-redux'
import { User } from '../../session/interfaces'
import { Button, ButtonContainer } from '../../ui/components'
import RankingApi from '../api'
import media from 'styled-media-query'
import ContestLogsTable from './ContestLogsTable'

interface Props {
  logs: ContestLog[]
  registration: RankingRegistrationOverview
  signedInUser?: User | undefined
  refreshData: () => void
}

const ContestLogList = (props: Props) => {
  const [selectedLog, setSelectedLog] = useState(undefined as
    | ContestLog
    | undefined)

  const finishUpdate = () => {
    props.refreshData()
    setSelectedLog(undefined)
  }

  const deleteLog = (log: ContestLog) => {
    const shouldDelete = confirm('Are you sure you want to delete this?')

    if (!shouldDelete) {
      return
    }

    RankingApi.deleteLog(log.id)
    props.refreshData()
  }

  const canEdit =
    (props.signedInUser &&
      props.signedInUser.id === props.registration.userId) ||
    false

  return (
    <>
      <h1>Updates</h1>
      <EditLogFormModal
        log={selectedLog}
        setLog={setSelectedLog}
        onSuccess={finishUpdate}
        onCancel={() => setSelectedLog(undefined)}
      />
      <ContestLogsTable
        logs={props.logs}
        canEdit={canEdit}
        editLog={setSelectedLog}
        deleteLog={deleteLog}
      />
      <SmallList>
        {props.logs.map((l, i) => (
          <SmallRow even={i % 2 === 0} key={l.id}>
            <span>{l.date.toLocaleString()}</span>
            <span>{languageNameByCode(l.languageCode)}</span>
            <span>{mediumDescriptionById(l.mediumId)}</span>
            <span>{amountToPages(l.amount)}</span>
            <span>{amountToPages(l.adjustedAmount)}</span>
            {canEdit && (
              <span style={{ width: '1px', whiteSpace: 'nowrap' }}>
                <ButtonContainer>
                  <Button onClick={() => setSelectedLog(l)} icon="edit">
                    Edit
                  </Button>
                  <Button onClick={() => deleteLog(l)} icon="trash" destructive>
                    Delete
                  </Button>
                </ButtonContainer>
              </span>
            )}
          </SmallRow>
        ))}
      </SmallList>
    </>
  )
}

const SmallList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 auto;
  width: 100%;

  ${media.greaterThan('medium')`
    display: none;
  `}
`

const SmallRow = styled.li`
  margin: 20px 0;
  padding: 20px 30px;
  background-color: ${({ even }: { even?: boolean }) =>
    even ? 'rgba(0, 0, 0, 0.02)' : 'transparant'};
`

const mapStateToProps = (state: State, props: Props) => ({
  ...props,
  signedInUser: state.session.user,
})

export default connect(mapStateToProps)(ContestLogList)
