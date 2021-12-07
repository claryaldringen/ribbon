import React from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'

import { useFetchExchangeRates } from '../../hooks/useFetchExchangeRates'
import { ExchangeRateTable } from '../ExchengeRateTable/ExchangeRateTable'
import { Form } from '../Form/Form'
import { Error, Spinner } from './Styled'

export const Layout: React.FC = () => {
  const { isLoading, error, data } = useFetchExchangeRates()

  if (isLoading) {
    return <Spinner type="Watch" color="black" />
  }

  if (error) {
    return (
      <Error>
        An error has occurred during loading exchange rate list:
        <br />
        <b>{error.message}</b>
        <br />
        <br />
        Don't worry, you can still buy some Bitcoin.
      </Error>
    )
  }

  if (!data) {
    return null
  }

  return (
    <Grid>
      <Row>
        <Col md={6}>
          <ExchangeRateTable table={data} />
        </Col>
        <Col md={6}>
          <Form rates={data.rates} />
        </Col>
      </Row>
    </Grid>
  )
}
