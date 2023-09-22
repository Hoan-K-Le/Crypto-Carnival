import React from 'react'

export const ProgressBar = ({ progressBar, coin }: any) => {
  return (
    <div className="w-full h-[10px] rounded-xl  bg-yellow-300">
      <div
        className="h-[10px] rounded-xl  bg-green-300"
        style={{
          width: `${progressBar(coin.total_volume, coin.market_cap)}%`,
        }}
      ></div>
    </div>
  )
}
export default ProgressBar
