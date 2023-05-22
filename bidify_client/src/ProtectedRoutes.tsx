import { FC } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from 'src/hooks/useAuth'

const ProtectedRoute: FC<{ children: JSX.Element }> = ({ children }) => {
  const { user } = useAuth()
  const location = useLocation()

  if (user) return children
  return <Navigate to={"/login"} state={{ from: location }} replace />
}

export default ProtectedRoute