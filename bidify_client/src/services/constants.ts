import { IObjectPair } from "./interface"

export const API_LIST = {
  LOGIN: '/users/login',
  REGISTER: '/users/register',
  BID_ITEMS: '/bids/bid-items',
  ADD_FUNDS: '/deposits/add-funds',
  NEW_BID_ITEMS: '/bids/new-bid-item',
  PLACE_BID: '/bids/place'
}

export const ERRORS: IObjectPair= {
  USER_EMAIL_DOES_NOT_EXISTS: 'User doesn\'t exists!',
  EMAIL_ALREADY_EXISTS: 'Email already exists!'
}