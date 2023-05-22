import { FC } from 'react'
import Routes from './Routes'

import AuthContextProvider from './context/AuthContext'

const App: FC = () => {
  return (
    <AuthContextProvider>
      <div className="bg-gray-100 h-screen w-screen relative">
        <Routes />
      </div>
    </AuthContextProvider>
  )
}

export default App
