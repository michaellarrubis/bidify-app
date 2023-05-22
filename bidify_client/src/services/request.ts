import axios from 'axios'
import { IRequest, IHeaderObjectPair } from './interface'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

export const request = async (args: IRequest) => {
  const accessToken = localStorage.getItem('auth:accessToken') ?? ''
  let headers: IHeaderObjectPair = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  if (accessToken) {
    headers = {
      ...headers,
      'Authorization': `Bearer ${JSON.parse(accessToken)}`
    }
  }
  

  switch(args.method) {
    case 'AUTH':
      return await axiosInstance.post(`${args.endpoint}`, args.body)
    case 'POST':
      return await axiosInstance.post(`${args.endpoint}`, args.body, { headers })
    case 'GET':
      return await axiosInstance.get(`${args.endpoint}`, { headers })
    default:
      return null
  }
}

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.message === 'Request failed with status code 401') {
      console.log('error: ', error)
      // window.location.href = '/login'
      return
    }

    if (error.response.data.message === "USER_NOT_EXIST") {
      localStorage.removeItem('user')
      localStorage.removeItem('auth:accessToken')
    }
    
    return error.response
  }
)