import { useQuery } from 'react-query'
import { ExchangeRatesType, parse } from '../utils'

const CNB_URL =
  'https://www.cnb.cz/cs/financni-trhy/devizovy-trh/kurzy-devizoveho-trhu/kurzy-devizoveho-trhu/denni_kurz.txt'

export const useFetchExchangeRates = () =>
  useQuery<ExchangeRatesType, Error>('daily_exchange_rates', async () => {
    const response = await fetch(`https://thingproxy.freeboard.io/fetch/${CNB_URL}`)
    return parse(await response.text())
  })
