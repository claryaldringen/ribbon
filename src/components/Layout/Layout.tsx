import React from 'react'
import { useFetchExchangeRates } from '../../hooks/useFetchExchangeRates'
import { ExchangeRateTable } from '../ExchengeRateTable/ExchangeRateTable'
import { Form } from '../Form/Form'

export const Layout: React.FC = () => {
  const { isLoading, error, data } = useFetchExchangeRates()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>An error has occurred: {error.message}</div>
  }

  if (!data) {
    return null
  }

  return (
    <div>
      <ExchangeRateTable table={data} />
      <Form rates={data.rates} />
    </div>
  )
}
