import { FC, useState, ChangeEvent, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from 'src/components/Navbar'

import { depositFundsService } from 'src/services/modules/users'
import { useLocalStorage } from 'src/hooks/useLocalStorage'
import { IUser } from 'src/services/interface'

const Deposit: FC = () => {
  const navigate = useNavigate()
  const { getItem, setItem } = useLocalStorage()
  const [amount, setAmount] = useState<number | null>(null)
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    setAmount(Number(value))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!amount) return

    const { data, statusCode } = await depositFundsService(amount)
    if (statusCode < 400) {
      const user: string | null = getItem('user') ?? null
      
      if (user) {
        const currentUser: IUser = JSON.parse(user)
        currentUser.total_funds = Number(data.total_funds)

        setItem('user', JSON.stringify(currentUser))
        navigate('/')
      }
    }
  }

  return (
    <>
      <Navbar />
      <div className="w-full h-full flex items-center justify-center">
        <div className="bg-white w-6/12 py-12 px-8 shadow-md rounded">
          <h1 className="text-3xl font-semibold">Deposit</h1>

          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                Amount
              </label>
              <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="amount" 
                name="amount"
                type="number" 
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-center justify-end mt-16">
              <Link 
                to="/"
                className="mr-10 bg-slate-100 hover:bg-slate-50 text-black py-2 px-10 rounded focus:outline-none focus:shadow-outline" 
              >
                Cancel
              </Link>
              <button 
                disabled={!amount}
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-10 rounded focus:outline-none focus:shadow-outline" 
                type="submit"
              >
                Deposit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Deposit