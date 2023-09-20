import React from 'react'
import { TableDataProps } from '../TableDataProps'
import { useAppSelector } from '@/app/store/store'

interface VolumeMarketProps {
  coin: TableDataProps
  formatNumber: (number: number) => string
  symbol: string
}

const VolumeMarket: React.FC<VolumeMarketProps> = ({
  coin,
  formatNumber,
  symbol,
}) => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-1">
        <div className="bg-green-300 rounded-full h-[10px] w-[10px]"></div>
        <span>
          {symbol}
          {/* {formatNumber(coin.total_volume)} */}
          {coin.total_volume}
        </span>
      </div>
      <div>
        <div className="flex items-center gap-1">
          <div className="bg-yellow-300 rounded-full h-[10px] w-[10px]"></div>
          <span>
            {symbol}
            {/* {formatNumber(coin.market_cap_change_24h)} */}
            {coin.market_cap_change_24h}
          </span>
        </div>
      </div>
    </div>
  )
}

export default VolumeMarket
