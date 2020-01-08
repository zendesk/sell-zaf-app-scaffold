import * as React from 'react'
import * as ReactDOM from 'react-dom'

import {ZAFClientContextProvider} from '@zendesk/zaf-app-utils-for-sell'
import {ThemeProvider} from '@zendeskgarden/react-theming'

import App from './App'

const Application = () => {
  return (
    <ZAFClientContextProvider
      // @ts-ignore
      value={window.ZAFClient.init()}
    >
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ZAFClientContextProvider>
  )
}

ReactDOM.render(<Application />, document.getElementById('app'))
