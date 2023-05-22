import { FC, createContext, useContext, useState } from 'react'
import { IAuthContext, IAuthContextProvider } from './interface'
import { useLocalStorage } from 'src/hooks/useLocalStorage'

export const AuthContext = createContext({})
export const useAuthContext = () => {
  return useContext(AuthContext)
}

const AuthContextProvider:FC<IAuthContextProvider> = ({ children }) => {
  const { getItem } = useLocalStorage()

  const [user, setUser] = useState<IAuthContext | null>(() => {
    const currentUser = getItem("user") ?? null
    return currentUser ? JSON.parse(currentUser) : null
  })

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      { children }
    </AuthContext.Provider>
  )
}

export default AuthContextProvider