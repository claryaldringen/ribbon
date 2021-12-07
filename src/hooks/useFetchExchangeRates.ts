import { useQuery, UseQueryResult } from 'react-query'
import { parse } from '../utils/parse'
import { ExchangeRatesType } from '../types'

const CNB_URL =
  'https://www.cnb.cz/cs/financni-trhy/devizovy-trh/kurzy-devizoveho-trhu/kurzy-devizoveho-trhu/denni_kurz.txt'

export const useFetchExchangeRates = (): UseQueryResult<ExchangeRatesType, Error> =>
  useQuery<ExchangeRatesType, Error>('daily_exchange_rates', async () => {
    const response = await fetch(`https://thingproxy.freeboard.io/fetch/${CNB_URL}`)
    const parsed = parse(await response.text())
    if (!parsed.rates.length) {
      throw new Error('Downloaded daily exchange rates can not be parsed.')
    }
    return parsed
  })
