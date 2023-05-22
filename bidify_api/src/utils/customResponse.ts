import { Response } from 'express'

interface IResponsePayload {
  statusCode: number
  message?: string
  data?: object | null
}

const processMessage = (message: string | null) => {
  if (!message) return null

  if (message.includes('Cannot read properties of null')) {
    return 'Data not found.'
  }

  return message
}

export default function customResponse (res: Response, payload: IResponsePayload) {
  const statusCode = payload.statusCode ? payload.statusCode : 400
  return res
    .status(statusCode)
    .json({
      statusCode,
      message: processMessage(payload.message || null),
      data: payload.data || null
    })
}