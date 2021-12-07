import React from 'react'
import { ExchangeRatesType } from '../../utils'
import { Cell, RightCell, Row, Table } from './Styled'

type Props = {
  table: ExchangeRatesType
}

export const ExchangeRateTable: React.FC<Props> = ({ table }) => (
  <Table>
    <thead>
      <tr>
        <th>Country</th>
        <th>Currency (ISO)</th>
        <th>Amount</th>
        <th>Rate</th>
      </tr>
    </thead>
    <tbody>
      {table.rates.map(({ country, currency, iso, amount, rate }, index) => (
        <Row key={`row_${iso}`} odd={index % 2}>
          <Cell>{country}</Cell>
          <Cell>
            {currency} ({iso})
          </Cell>
          <RightCell>{amount}</RightCell>
          <RightCell>{rate} CZK</RightCell>
        </Row>
      ))}
    </tbody>
    {table.date && (
      <tfoot>
        <tr>
          <Cell colSpan={4}>Courses are actual to {table.date?.toLocaleDateString()}</Cell>
        </tr>
      </tfoot>
    )}
  </Table>
)
