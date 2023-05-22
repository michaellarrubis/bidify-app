import { useEffect } from 'react'
import { useUser } from './useUser'
import { useLocalStorage } from './useLocalStorage'
import { IUser } from 'src/services/interface'

export const useAuth = () => {
  const { user, handleSetUser, removeUser } = useUser()
  const { getItem } = useLocalStorage()

  useEffect(() => {
    const user = getItem("user")
    if (user) {
      handleSetUser(JSON.parse(user))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setAuthUser = (user: IUser) => {
    handleSetUser(user)
  }

  const logout = () => {
    removeUser()
  }

  return { user, setAuthUser, logout }
}