import { IBidItem } from 'src/services/interface'

export interface IBidModal {
  selectedBid: IBidItem
  onShowBidModal: (isShow: boolean) => void
  onPlaceBid: (amount: number) => void
}