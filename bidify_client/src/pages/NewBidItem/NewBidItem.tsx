import { FC, useState, ChangeEvent, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Navbar from 'src/components/Navbar'
import { IResponse } from 'src/services/interface'
import { createBidItemService } from 'src/services/modules/bids'

const NewBidItem: FC = () => {
  const navigate = useNavigate()
  const [fields, setFields] = useState<{
    name: string,
    start_price: number,
    time_window: string
  }>({
    name: '',
    start_price: 0,
    time_window: ''
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFields({ ...fields, [name]: value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('fields: ', fields)
    if (fields.name && fields.start_price && fields.time_window) {
      const result: IResponse = await createBidItemService({ ...fields })
      if (result.statusCode < 400) navigate('/')
    }
  }
  return (
    <>
      <Navbar/>
      <div className="w-full h-full flex items-center justify-center">
        <div className="bg-white w-6/12 py-12 px-8 shadow-md rounded">
          <h1 className="text-3xl font-semibold">Create Item</h1>

          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="name" 
                name="name"
                type="text" 
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="start_price">
                Start Price
              </label>
              <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="start_price" 
                name="start_price" 
                type="number" 
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time_window">
                Time Window
              </label>
              <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="time_window" 
                name="time_window" 
                type="datetime-local" 
                min="2023-05-13"
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
                disabled={!fields.name || !fields.start_price || !fields.time_window}
                className={`${!fields.name || !fields.start_price || !fields.time_window ? 'bg-blue-500/50' : 'hover:bg-blue-700'} bg-blue-500 hover:bg-blue-700 text-white py-2 px-10 rounded focus:outline-none focus:shadow-outline`} 
                type="submit"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default NewBidItem