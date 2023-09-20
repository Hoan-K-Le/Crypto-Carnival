import React from 'react'
import { TableDataProps } from '../TableDataProps'

function CoinRank({ coin }: { coin: TableDataProps }) {
  return (
    <td className="py-4">
      <p>{coin.market_cap_rank}</p>
    </td>
  )
}

export default CoinRank
