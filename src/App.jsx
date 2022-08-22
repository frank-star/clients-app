import React from 'react'
import { useRoutes } from 'react-router-dom'

import { mainRoutes } from './routes'

const App = () => {
  const routing = useRoutes([mainRoutes])

  return (
    <>
      {routing}
    </>
  )
}

export default App
