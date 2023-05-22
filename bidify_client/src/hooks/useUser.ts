import { useAuthContext } from 'src/context/AuthContext/AuthContext'

import { IUser } from 'src/services/interface'
import { useLocalStorage } from 'src/hooks/useLocalStorage'
import { IAuthContext } from 'src/context/AuthContext/interface'


export const useUser = () => {
  const { user, setUser } = useAuthContext() as IAuthContext
  const { setItem, removeItem } = useLocalStorage()

  const handleSetUser = (args: IUser) => {
    if (!args) return
    setItem('auth:accessToken', JSON.stringify(args?.accessToken))
    setUser(args)
    setItem('user', JSON.stringify(args))
  }

  const removeUser = () => {
    setUser(null)
    removeItem('user')
    removeItem('auth:accessToken')
  }

  return { user, handleSetUser, removeUser }
}