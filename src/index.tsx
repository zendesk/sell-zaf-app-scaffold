import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {useMemo} from 'react'

import {ZAFClientContextProvider, Client} from '@zendesk/sell-zaf-app-toolbox'
import {ThemeProvider} from '@zendeskgarden/react-theming'

import EntryView from './EntryView'

declare var ZAFClient: {
  init: () => Client
}

const App = () => {
  const client = useMemo(() => ZAFClient.init(), [])
  return (
    <ZAFClientContextProvider value={client}>
      <ThemeProvider>
        <EntryView />
      </ThemeProvider>
    </ZAFClientContextProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
