import * as React from 'react'
import {
  useClientHeight,
  ResponseHandler,
  useSellContactEmail,
  useFormattedDate,
} from '@zendesk/zaf-app-utils-for-sell'

import Loader from './components/Loader'
import EmptyStateSVG from './svg/EmptyState.svg'

import * as css from './App.css'

const Header = ({contactEmail}: {contactEmail: string}) => (
  <div className={css.header}>
    <span className={css.title}>ZAF React Skeleton App for {contactEmail}</span>
  </div>
)

const EmptyView = () => {
  return (
    <div className={css.container}>
      <EmptyStateSVG width={'40%'} />
    </div>
  )
}

export const App = () => {
  const contactEmailResponse = useSellContactEmail()
  const todayDate = useFormattedDate(new Date())
  useClientHeight(230)

  return (
    <div className={css.App}>
      <div className={css.dateContainer}>Date: {todayDate}</div>
      <ResponseHandler
        response={contactEmailResponse}
        loadingView={<Loader />}
        errorView={<div>Something went wrong!</div>}
        emptyView={<div>There's nothing to see yet.</div>}
      >
        {([sellContact]: [string]) => (
          <>
            <Header contactEmail={sellContact} />
            <EmptyView />
          </>
        )}
      </ResponseHandler>
    </div>
  )
}

export default App
