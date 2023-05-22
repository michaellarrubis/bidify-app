import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from 'src/hooks/useAuth'
import LoginRegisterForm from 'src/components/LoginRegisterForm'

import { ERRORS } from 'src/services/constants'
import { loginUserService } from 'src/services/modules/users'
import { IResponse } from 'src/services/interface'
import { IUser } from 'src/services/interface'

const Login: FC = () => {
  const { setAuthUser } = useAuth()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleLogin = async (email: string, password: string) => {
    const { data, statusCode, message }: IResponse = await loginUserService({ email, password })

    if (statusCode < 400) {
      setAuthUser({
        id: data.id,
        email: data.email,
        total_funds: data.total_funds,
        accessToken: data.accessToken,
      } as IUser)
      navigate('/')
    }

    if (statusCode >= 400) {
      setErrorMessage(ERRORS[message] as string)
    }
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="bg-white w-6/12 p-6 shadow-md rounded">
        <h1 className="text-3xl">Login</h1>
        {errorMessage && (
          <p className="text-rose-700 mt-2">{errorMessage}</p>
        )}

        <LoginRegisterForm 
          onSubmit={handleLogin} 
          isLoginPage={true} 
        />
      </div>
    </div>
  )
}

export default Login