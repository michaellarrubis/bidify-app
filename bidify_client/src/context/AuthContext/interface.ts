import { IUser } from "src/services/interface"

export interface IAuthContext {
  user: IUser | null
  setUser: (user: IUser | null) => void
}

export interface IAuthContextProvider {
  children: string | React.ReactNode
}