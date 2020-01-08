import * as React from 'react'
import {Skeleton} from '@zendeskgarden/react-loaders'

import * as css from './Loader.css'

const Loader = () => {
  return (
    <div>
      <Skeleton className={css.Skeleton} />
      <Skeleton className={css.Skeleton} />
    </div>
  )
}

export default Loader
