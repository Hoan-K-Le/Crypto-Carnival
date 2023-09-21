'use client'
import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useAppSelector } from '@/app/store/store'

type Params = {
  params: {
    id: string
  }
}
type CoinDetailProps = {
  name: string
  symbol: string
  links: { homepage: string[]; blockchain_site: string[] } // blockchain_site first,second,third index of the array of the links
  image: { small: string }
  market_data: {
    current_price: { usd: number }
    ath: { usd: number }
    ath_date: { usd: string }
    ath_change_percentage: { usd: number }
    atl: { usd: number }
    atl_change_percentage: { usd: number }
    atl_date: { usd: string }
    price_change_percentage_24h: number
    market_cap: { usd: number }
    market_cap_change_percentage_24h: number
    fully_diluted_valuation: { usd: number }
    total_volume: { usd: number }
    circulating_supply: number
    max_supply: number | null // if null = infinity supply
  }
  description: { en: string }
}

const CoinPage = ({ params }: Params) => {
  const [coinDetail, setCoinDetail] = useState<CoinDetailProps | null>(null)
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD')
  const [isSwapped, setIsSwapped] = useState<boolean>(false)
  const [basePrice, setBasePrice] = useState<string | null>('1')
  const [coinPrice, setCoinPrice] = useState<string | null>('1')
  const { id } = params

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false`
      )
      setCoinDetail(data)
    } catch (error) {
      console.error(error)
    }
  }
  const currentCurrency = useAppSelector(state => state.currency.currencies)

  useEffect(() => {
    fetchData()
  }, [])

  if (coinDetail === null) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  }

  // Then we grab the rate when we use the find method if it matches with the currentCurrency that we have selected
  const currencyRate =
    currencies.find(currency => currency.region === currentCurrency)?.rate || 1

  const selectedCurrencyObj = currencies.find(
    currency => currency.region === currentCurrency
  )

  const currencySymbol =
    selectedCurrencyObj?.symbol === 'PiCurrencyGbpLight'
      ? '£'
      : selectedCurrencyObj?.symbol === 'BiEuro'
      ? '€'
      : '$'

  const convertBaseCurrency = Number(basePrice) * currencyRate

  const convertCoinCurrency =
    currencySymbol +
    convertBaseCurrency / coinDetail.market_data.current_price.usd

  const handleBaseChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value
    setBasePrice(value)
  }
  const handleCoinChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value
    setCoinPrice(value)
  }

  const handleSwitchInput = (): void => {
    setIsSwapped(prevState => !prevState)
  }

  const { image, name, symbol, links, market_data, description } = coinDetail
  const {
    price_change_percentage_24h,
    market_cap,
    fully_diluted_valuation,
    total_volume,
    circulating_supply,
    max_supply,
  } = market_data
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4 items-center">
        <p>Name/Symbol/Image</p>
        <img src={image.small} alt="Coin-Image" />
        <span>{name}</span>
        <span>{symbol}</span>
      </div>
      <div className="flex gap-2">
        <p>Links:</p>
        <span>{links.homepage[0]}</span>
        <span>{links.blockchain_site[0]}</span>
        <span>{links.blockchain_site[1]}</span>
        <span>{links.blockchain_site[2]}</span>
      </div>
      <span>Current_Price: {market_data.current_price.usd}</span>
      <span>{price_change_percentage_24h}</span>
      <div>
        <p>ATH</p>
        <span>{Number(market_data.ath.usd)}</span>
        <span>{market_data.ath_date.usd}</span>
        <span>{market_data.ath_change_percentage.usd}</span>
      </div>
      <div>
        <p>ATL</p>
        <span>{Number(market_data.atl.usd)}</span>
        <span>{market_data.atl_date.usd}</span>
        <span>{market_data.atl_change_percentage.usd}</span>
      </div>
      <div className="flex flex-col gap-4">
        <span>Market Cap:{market_cap.usd}</span>
        <span>fully diluated Valuation: {fully_diluted_valuation.usd}</span>
        <span>This is where 24h volume goes</span>
        <span>
          TotalVolume/Market_cap{Number(total_volume) / Number(market_cap)}
        </span>
        <span>{circulating_supply}</span>
        <span>{max_supply === null ? 'infinity' : max_supply}</span>
        <span>progress bar</span>
      </div>
      <div>
        <p>Description:</p>
        <p>{description.en}</p>
      </div>
      <div className="flex flex-col gap-4">
        <p>Convert Coin</p>
        {isSwapped ? (
          <>
            <div className="flex gap-2">
              <label htmlFor={currentCurrency}>
                {!currentCurrency ? 'USD' : currentCurrency}
              </label>
              <span>{currencySymbol}</span>
              <input
                id={currentCurrency}
                type="text"
                value={convertBaseCurrency}
                onChange={handleBaseChange}
                name={currentCurrency}
              />
            </div>
            <button onClick={handleSwitchInput}>reverse</button>
            <div className="flex gap-2">
              <label htmlFor={symbol}>{symbol}</label>

              <input
                id={symbol}
                type="text"
                placeholder="btc"
                value={convertCoinCurrency}
                name={name}
                onChange={handleCoinChange}
              />
            </div>
          </>
        ) : (
          <>
            <button onClick={handleSwitchInput}>reverse</button>
            <div className="flex gap-2">
              <label htmlFor={symbol}>{symbol}</label>
              <input
                id={symbol}
                type="text"
                placeholder="btc"
                value={convertCoinCurrency}
                name={name}
                onChange={handleCoinChange}
              />
            </div>
            <div className="flex gap-2">
              <label htmlFor={currentCurrency}>
                {!currentCurrency ? 'USD' : currentCurrency}
              </label>
              <span>{currencySymbol}</span>
              <input
                id={currentCurrency}
                type="text"
                value={convertBaseCurrency}
                onChange={handleBaseChange}
                name={currentCurrency}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CoinPage
