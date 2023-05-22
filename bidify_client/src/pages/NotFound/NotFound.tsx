import { FC } from 'react'
import { Link } from 'react-router-dom'

const NotFound: FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="bg-white w-6/12 py-12 px-8 shadow-md rounded">
        <h1 className="text-3xl text-center font-semibold">Page Not Found!</h1>
        <div className="text-center mt-10">
          <Link
            to="/"
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-8 rounded focus:outline-none focus:shadow-outline" 
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound