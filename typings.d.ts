interface Settings {
  setup_completed?: string,
  title?: string,
  token?: string,
  currentUserLocale?: string,
  currentUserId?: number,
}

interface Metadata {
  appId: number,
  name: string,
  version: string,
  installationId: number,
  settings: Settings,
}

type AppLocation = 'ticket_sidebar' | 'user_sidebar' | 'organization_sidebar' | 'modal'

interface Context {
  host: string
  hostAccountId: null
  product: string
  location: AppLocation
  instanceGuid: string
  account: Account
  ticketId: number
}

interface Account {
  subdomain: string
}

declare var DEVELOPMENT: boolean
declare var API_URL: string

declare module '@zendeskgarden/react-buttons'
declare module '@zendeskgarden/react-theming'
declare module '@zendeskgarden/react-typography'
declare module '@zendeskgarden/react-loaders'
declare module '@zendeskgarden/react-select'
declare module '@zendeskgarden/svg-icons'
declare module '*.png'
declare module '*.jpg'
declare module '*.json'
declare module '*.svg'
