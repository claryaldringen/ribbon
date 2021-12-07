import React, { useCallback, useState } from 'react'
import { Col } from 'react-flexbox-grid'

import { RateType } from '../../types'
import { CenterCol, FormRow, LeftCol } from './Styled'

type Props = {
  rates: RateType[]
}

export const Form: React.FC<Props> = ({ rates }) => {
  const [amount, setAmount] = useState<number>()
  const [currency, setCurrency] = useState<string>(rates[0].iso)
  const [result, setResult] = useState<number>()

  const handleAmountChange = useCallback(
    (event) => {
      setResult(undefined)
      setAmount(Number(event.target.value))
    },
    [setAmount, setResult],
  )

  const handleCurrencyChange = useCallback(
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
    <>
      <FormRow>
        <LeftCol md={6}>
          <label htmlFor="amount_czk">Amount&nbsp;(CZK): </label>
        </LeftCol>
        <Col md={6}>
          <input id="amount_czk" type="number" min={0} onChange={handleAmountChange} />
        </Col>
      </FormRow>
      <FormRow>
        <LeftCol md={6}>
          <label htmlFor="currency">Target&nbsp;currency: </label>
        </LeftCol>
        <Col md={6}>
          <select id="currency" onChange={handleCurrencyChange}>
            {rates.map(({ currency, iso }) => (
              <option key={`opt_${iso}`} value={iso}>
                {currency} ({iso})
              </option>
            ))}
          </select>
        </Col>
      </FormRow>
      <FormRow>
        <CenterCol md={12}>
          <button onClick={handleClick} disabled={!amount}>
            Convert
          </button>
          {result && (
            <h3>
              {amount} CZK = {result} {currency}
            </h3>
          )}
        </CenterCol>
      </FormRow>
    </>
  )
}
