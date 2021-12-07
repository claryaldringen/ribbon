import React, { useCallback, useState } from 'react'
import { RateType } from '../../utils'

type Props = {
  rates: RateType[]
}

export const Form: React.FC<Props> = ({ rates }) => {
  const [amount, setAmount] = useState<number>()
  const [currency, setCurrency] = useState<string>()
  const [result, setResult] = useState<number>()

  const handleBlur = useCallback(
    (event) => {
      setResult(undefined)
      setAmount(Number(event.target.value))
    },
    [setAmount, setResult],
  )

  const handleChange = useCallback(
    (event) => {
      setResult(undefined)
      setCurrency(event.target.value)
    },
    [setCurrency, setResult],
  )

  const handleClick = useCallback(() => {
    const currencyData = rates.find(({ iso }) => iso === currency)
    setResult(
      currencyData && amount
        ? Math.round((amount / (currencyData.rate / currencyData.amount)) * 1000) / 1000
        : undefined,
    )
  }, [rates, amount, currency, setResult])

  return (
    <div>
      <label htmlFor="amount_czk">Amount (CZK):</label>
      <input id="amount_czk" type="number" min={0} onBlur={handleBlur} />
      <label htmlFor="currency">Target currency:</label>
      <select id="currency" onChange={handleChange}>
        {rates.map(({ currency, iso }) => (
          <option value={iso}>
            {currency} ({iso})
          </option>
        ))}
      </select>
      <button onClick={handleClick}>Convert</button>
      {result && (
        <div>
          {amount} CZK = {result} {currency}
        </div>
      )}
    </div>
  )
}
