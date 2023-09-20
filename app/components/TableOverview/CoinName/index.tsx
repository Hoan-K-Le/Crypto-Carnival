'use client'
import React from 'react'
import PageLink from '../../links/PageLink'
import { TableDataProps } from '../TableDataProps'

const CoinName = ({ coin }: { coin: TableDataProps }) => {
  return (
    <td className="pl-2 py-10 flex items-center">
      <PageLink href={`../pages/CoinDetail/${coin.id}`} id={coin.id}>
        <button className="flex justify-center gap-2">
          <img className="w-[25px] h-[25px]" src={coin.image} alt="coin-img" />
          <span>{coin.name}</span>
          <span>({coin.symbol.toUpperCase()})</span>
        </button>
      </PageLink>
    </td>
  )
}

export default CoinName
