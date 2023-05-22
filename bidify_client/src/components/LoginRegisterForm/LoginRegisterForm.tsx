import { ChangeEvent, FC, useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ILoginRegisterFormProps } from './interface'

const LoginRegisterForm: FC<ILoginRegisterFormProps> = ({ 
  isLoginPage,
  onSubmit,
}: ILoginRegisterFormProps) => {
  const [fields, setFields] = useState<{
    email: string,
    password: string
  }>({
    email: '',
    password: ''
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFields({ ...fields, [name]: value })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (fields?.email && fields?.password) onSubmit(fields.email, fields.password)
  }

  return (
    <form className="mt-6" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          id="email" 
          type="email" 
          name="email"
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
          id="password" 
          type="password" 
          placeholder="****"
          name="password"
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mx-auto text-center">
        <button 
          className="mx-auto bg-blue-500 hover:bg-blue-700 text-white py-2 px-10 rounded focus:outline-none focus:shadow-outline" 
          type="submit"
        >
          {isLoginPage ? 'Login' : 'Register'}
        </button>
        <Link className="text-sm text-blue-500 hover:text-blue-800 mt-4 block underline" to={`${ isLoginPage ? '/register' : '/login'}`}>
          {isLoginPage ? 'Register' : 'Login'}
        </Link>
      </div>
    </form>
  )
}

export default LoginRegisterForm