import React from 'react'
import { TableDataProps } from '../TableDataProps'
import { useAppSelector } from '@/app/store/store'

interface CirculatingSupplyProps {
  coin: TableDataProps
  formatNumber: (number: number) => string
  symbol: string
}

const CirculatingSupply: React.FC<CirculatingSupplyProps> = ({
  symbol,
  formatNumber,
  coin,
}) => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-1">
        <div className="bg-green-300 rounded-full h-[10px] w-[10px]"></div>
        {/* <span>{formatNumber(coin.circulating_supply)}</span> */}
        <span className="flex items-center">
          {symbol}
          {formatNumber(coin.circulating_supply)}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <div className="bg-yellow-300 rounded-full h-[10px] w-[10px]"></div>
        <span>
          {symbol}
          {coin.total_supply !== null ? formatNumber(coin.total_supply) : 'N/A'}
        </span>
      </div>
    </div>
  )
}

export default CirculatingSupply
