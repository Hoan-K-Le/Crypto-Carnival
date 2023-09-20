import React from 'react'
import Icon from '../../Icon/Icon'
import { TableDataProps } from '../TableDataProps'
const CoinAvg = ({
  coin,
  getAverageData,
}: {
  coin: TableDataProps
  getAverageData: (number: number) => string
}) => {
  return (
    <>
      <td
        className={`py-4 gap-1 ${getAverageData(
          coin.price_change_percentage_1h_in_currency
        )}`}
      >
        <div className="flex items-center gap-1">
          <span>
            {coin.price_change_percentage_1h_in_currency < 0 ? (
              <Icon iconVariant="arrowDown" />
            ) : (
              <Icon iconVariant="arrowUp" />
            )}
          </span>
          <span>{coin.price_change_percentage_1h_in_currency.toFixed(2)}%</span>
        </div>
      </td>
      <td
        className={`py-4 ${getAverageData(
          coin.price_change_percentage_24h_in_currency
        )}`}
      >
        <div className="flex items-center gap-1">
          <span>
            {coin.price_change_percentage_24h_in_currency < 0 ? (
              <Icon iconVariant="arrowDown" />
            ) : (
              <Icon iconVariant="arrowUp" />
            )}
          </span>
          <span>
            {coin.price_change_percentage_24h_in_currency.toFixed(2)}%
          </span>
        </div>
      </td>
      <td
        className={`py-4 ${getAverageData(
          coin.price_change_percentage_7d_in_currency
        )}`}
      >
        <div className="flex items-center gap-1">
          <span>
            {coin.price_change_percentage_24h_in_currency < 0 ? (
              <Icon iconVariant="arrowDown" />
            ) : (
              <Icon iconVariant="arrowUp" />
            )}
          </span>
          <span>{coin.price_change_percentage_7d_in_currency.toFixed(2)}%</span>
        </div>
      </td>
    </>
  )
}

export default CoinAvg
