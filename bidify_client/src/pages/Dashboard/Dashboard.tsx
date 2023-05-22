import { FC, useState, useEffect } from 'react'

import Navbar from 'src/components/Navbar'
import BidItem from 'src/components/BidItem'
import BidModal from 'src/components/BidModal'

import { IBidItem, IBidItemResponse, IUser } from 'src/services/interface'
import { getAllBidItemsService, placeBidService } from 'src/services/modules/bids'
import { useLocalStorage } from 'src/hooks/useLocalStorage'

const Dashboard: FC = () => {
  const { getItem, setItem } = useLocalStorage()
  const [isShowBidForm, setIsShowBidModal] = useState<boolean>(false)
  const [bidStatus, setBidStatus] = useState<string>('ongoing')
  const [selectedBid, setSelectedBid] = useState<IBidItem | null>(null)
  const [rawBidItems, setRawBidItems] = useState<IBidItem[] | []>([])
  const [bidItems, setBidItems] = useState<IBidItem[] | []>([])

  useEffect(() => {
    handleGetAllBidItems()
  }, [])

  useEffect(() => {
    let filteredItems: IBidItem[] = []
    if (bidStatus === 'ongoing') {
      filteredItems = rawBidItems.filter((item: IBidItem) => !item.is_completed)
    }
    if (bidStatus === 'completed') {
      filteredItems = rawBidItems.filter((item: IBidItem) => item.is_completed)
    }

    setBidItems(filteredItems)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bidStatus])

  const handleGetAllBidItems = async() => {
    const result: IBidItemResponse = await getAllBidItemsService()
    if (!!result?.data?.length) {
      let updatedResult = result.data.map((item: IBidItem) => {
        return {
          ...item,
          is_completed: new Date(item.time_window) < new Date()
        }
      })

      setRawBidItems(updatedResult)
      setBidItems(updatedResult.filter((item: IBidItem) => !item.is_completed))
    }
  }

  const handleOpenBidModal = (item: IBidItem) => {
    setIsShowBidModal(true)
    setSelectedBid(item)
  }

  const handlePlaceBid = async (amount: number) => {
    setIsShowBidModal(false)
    const { statusCode } = await placeBidService({ amount, bid_item_id: selectedBid?.id! })
    if (statusCode < 400) {
      const user: string | null = getItem('user') ?? null
      
      if (user) {
        const currentUser: IUser = JSON.parse(user)
        currentUser.total_funds = Number(currentUser.total_funds) - amount

        setItem('user', JSON.stringify(currentUser))
      }
    }
  }

  return (
    <>
      <Navbar />
      <div className="h-full w-full">
        <div className="w-10/12 mx-auto">
          <div className="flex w-5/12 pt-32">
            <button 
              className={`py-2 text-center w-full ${bidStatus === 'ongoing' ? 'bg-green-700 text-white' : 'bg-gray-300'} mr-8`}
              onClick={() => setBidStatus('ongoing')}
            >Ongoing</button>
            <button 
              className={`py-2 text-center w-full ${bidStatus === 'completed' ? 'bg-green-700 text-white' : 'bg-gray-300'}`}
              onClick={() => setBidStatus('completed')}
            >Completed</button>
          </div>
          
          <div className="w-full mt-16 bg-white p-6">
            {bidItems?.length > 0 ? (
              <>
                <div className="flex border-b-2">
                  <div className="py-2 w-2/5 font-semibold pl-6">Name</div>
                  <div className="py-2 w-1/5 font-semibold pl-6">Current Price</div>
                  <div className="py-2 w-1/5 font-semibold pl-6">Duration</div>
                  <div className="py-2 w-1/5 font-semibold text-center">Bid</div>
                </div>
    
                {bidItems.map((bid: IBidItem, index: number) => {
                  return <BidItem key={index} item={bid} onToggleBidModal={handleOpenBidModal} />
                })}
              </>
            ) : (<div className="font-semibold">No Items to Bid</div>)}
          </div>
        </div>

        { isShowBidForm && selectedBid && (
          <BidModal
            selectedBid={selectedBid}
            onShowBidModal={setIsShowBidModal}
            onPlaceBid={handlePlaceBid}
          />
        )}
      </div>
    </>
  )
}

export default Dashboard