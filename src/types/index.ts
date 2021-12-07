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
