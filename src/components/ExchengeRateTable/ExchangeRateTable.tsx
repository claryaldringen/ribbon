import React from 'react'
import { ExchangeRatesType } from '../../utils'

type Props = {
  table: ExchangeRatesType
}

export const ExchangeRateTable: React.FC<Props> = ({ table }) => (
  <table>
    <thead>
      <tr>
        <th>Country</th>
        <th>Currency (ISO)</th>
        <th>Amount</th>
        <th>Rate</th>
      </tr>
    </thead>
    <tbody>
      {table.rates.map(({ country, currency, iso, amount, rate }) => (
        <tr>
          <td>{country}</td>
          <td>
            {currency} ({iso})
          </td>
          <td>{amount}</td>
          <td>{rate} CZK</td>
        </tr>
      ))}
    </tbody>
  </table>
)
