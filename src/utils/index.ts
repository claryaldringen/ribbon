export type RateType = {
  country: string
  currency: string
  amount: number
  iso: string
  rate: number
}

export type ExchangeRatesType = {
  date?: Date
  rates: RateType[]
}

export const parse = (raw: string): ExchangeRatesType => {
  const rows = raw.split('\n')
  const firstRow = rows.shift()
  const dateParts = firstRow?.split(' ')[0].split('.')
  rows.shift() // Removes first line contains labels - we don't need them.
  return {
    date: dateParts && dateParts.length === 3 ? new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`) : undefined,
    rates: rows.reduce((rates: RateType[], line) => {
      const items = line.split('|')
      if (items && items.length >= 5) {
        rates.push({
          country: items[0],
          currency: items[1],
          amount: +items[2],
          iso: items[3],
          rate: Number(items[4]?.replace(',', '.')),
        })
      }
      return rates
    }, []),
  }
}
