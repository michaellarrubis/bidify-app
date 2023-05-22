import { FC } from 'react'
import { IBidItem } from 'src/services/interface'
import { useCountdown } from 'src/hooks/useCountdown'

const CountdownTimer = (props: { time_window: Date }) => {
  const [days, hours, minutes, seconds] = useCountdown(props.time_window)
  if (days + hours + minutes + seconds <= 0) return <p>Completed</p>
  return (
    <div>
      {days > 0 && (
        <span>{days}d </span>
      )}
      {hours > 0 && (
        <span>{hours}h </span>
      )}
      {minutes > 0 && (
        <span>{minutes}m </span>
      )}
      {seconds > 0 && (
        <span>{seconds}s </span>
      )}
    </div>
  )
}

interface IBidItemDetail {
  item: IBidItem
  onToggleBidModal: (item: IBidItem) => void
}

const BidItem: FC<IBidItemDetail> = (props: IBidItemDetail) => {
  return (
    <div className="flex border mt-6">
      <div className="py-4 px-6 w-2/5 flex items-center">{props.item.name}</div>
      <div className="py-4 px-6 w-1/5 flex items-center">${props.item.current_price}</div>
      <div className="py-4 px-6 w-1/5 flex items-center">
        <CountdownTimer time_window={new Date(props.item.time_window)}/>
      </div>
      <div className="py-4 px-6 w-1/5 flex items-center text-center">
        <button disabled={props.item.is_completed} className="border-2 py-1 text-center w-full bg-gray-200" onClick={() => props.onToggleBidModal(props.item)}>Bid</button>
      </div>
    </div>
  )
}

export default BidItem