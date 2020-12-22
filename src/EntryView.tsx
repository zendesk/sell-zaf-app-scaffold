import * as React from 'react'
import {
  useClientHeight,
  ResponseHandler,
  useSellContactEmail,
  useFormattedDate,
} from '@zendesk/sell-zaf-app-toolbox'
import {Row, Col, Grid} from '@zendeskgarden/react-grid'
import ZendeskStroke from '@zendeskgarden/svg-icons/src/16/zendesk-stroke.svg'

import Loader from './components/Loader'
import EmptyStateSVG from './svg/EmptyState.svg'

import css from './App.css'

const Header = ({contactEmail}: {contactEmail: string}) => (
  <Row justifyContent="center" className={css.header}>
    <div className={css.icon}>
      <ZendeskStroke />
    </div>
    <div className={css.title}>
      What are you looking for <strong>{contactEmail}</strong>?
    </div>
  </Row>
)

const ContentView = () => {
  return (
    <Row justifyContent="center" className={css.contentView}>
      <EmptyStateSVG width={'40%'} />
    </Row>
  )
}

export const EntryView = () => {
  useClientHeight(230)
  const contactEmailResponse = useSellContactEmail()
  const todayDate = useFormattedDate(new Date())

  return (
    <Grid gutters={false} className={css.App}>
      <Row>
        <ResponseHandler
          response={contactEmailResponse}
          loadingView={<Loader />}
          errorView={<div>Something went wrong!</div>}
          emptyView={<div>There's nothing to see yet.</div>}
        >
          {([sellContact]: [string]) => (
            <Col textAlign="center">
              <Header contactEmail={sellContact} />
              <div className={css.dateContainer}>Date: {todayDate}</div>
              <ContentView />
            </Col>
          )}
        </ResponseHandler>
      </Row>
    </Grid>
  )
}

export default EntryView
