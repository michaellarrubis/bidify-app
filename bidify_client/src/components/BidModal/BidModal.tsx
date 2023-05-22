import { FC, useState, ChangeEvent, FormEvent } from 'react'
import { IBidModal } from './interface'
import { useAuth } from 'src/hooks/useAuth'

const BidModal: FC<IBidModal> = (props: IBidModal) => {
  const { user } = useAuth()
  const [bidAmount, setBidAmount] = useState<number>(props.selectedBid.current_price!)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBidAmount(Number(e.target.value))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await props.onPlaceBid(bidAmount!)
  }

  return (
    <div className="absolute top-0 left-0 bg-black/40 w-screen h-screen">
      <div className="absolute top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4 bg-white w-6/12 p-6">
        <div className="flex justify-between">
          <h1 className="text-3xl font-semibold">{props.selectedBid.name}</h1>
          <div className="cursor-pointer text-3xl" onClick={() => props.onShowBidModal(false)}>✕</div>
        </div>

        <form className="mt-16" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bid_amount">
              Bid Price
            </label>
            <input 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              id="bid_amount" 
              name="bid_amount"
              type="number"
              min={props.selectedBid.current_price}
              defaultValue={props.selectedBid.current_price}
              onChange={handleInputChange}
            />
            {props.selectedBid?.current_price! >= user?.total_funds! && (<span className="text-rose-700 text-xs mt-2">Not eligible to Bid!</span>)}
          </div>
          <div className="flex items-center justify-end mt-16">
            <button 
              className="mr-10 bg-slate-100 hover:bg-slate-50 text-black py-2 px-10 rounded focus:outline-none focus:shadow-outline" 
              type="button"
              onClick={() => props.onShowBidModal(false)}
            >
              Cancel
            </button>
            <button 
              disabled={props.selectedBid?.current_price! >= user?.total_funds!}
              className={`${props.selectedBid?.current_price! <= user?.total_funds! ? 'hover:bg-blue-700' : 'bg-blue-500/50'} bg-blue-500 text-white py-2 px-10 rounded focus:outline-none focus:shadow-outline`}
              type="submit"
            >
              Place Bid
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BidModal