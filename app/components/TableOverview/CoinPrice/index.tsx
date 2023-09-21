import { TableDataProps } from '../TableDataProps'

interface CoinPriceProps {
  coin: TableDataProps
  getSymbol: () => string
}

const CoinPrice: React.FC<CoinPriceProps> = ({ coin, getSymbol }) => {
  const symbol = getSymbol()

  return (
    <td className="py-4">
      <div className="flex items-center">
        <span>
          {symbol}
          {coin.current_price.toLocaleString('en-US')}
        </span>
      </div>
    </td>
  )
}

export default CoinPrice
