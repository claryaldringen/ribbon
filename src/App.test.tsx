import React from 'react'
import { render, waitFor, fireEvent } from '@testing-library/react'
import App from './App'
import { useQuery } from 'react-query'
import fetchMock, { FetchMock } from 'jest-fetch-mock'

const mockData = `03.12.2021 #233
země|měna|množství|kód|kurz
Austrálie|dolar|1|AUD|15,885
Brazílie|real|1|BRL|3,991
Bulharsko|lev|1|BGN|12,996
Čína|žen-min-pi|1|CNY|3,533
Dánsko|koruna|1|DKK|3,418
EMU|euro|1|EUR|25,415
Filipíny|peso|100|PHP|44,550
Hongkong|dolar|1|HKD|2,888
Chorvatsko|kuna|1|HRK|3,377
Indie|rupie|100|INR|29,953
Indonesie|rupie|1000|IDR|1,563
Island|koruna|100|ISK|17,313
Izrael|nový šekel|1|ILS|7,127
Japonsko|jen|100|JPY|19,861
Jižní Afrika|rand|1|ZAR|1,416
Kanada|dolar|1|CAD|17,563
Korejská republika|won|100|KRW|1,905
Maďarsko|forint|100|HUF|6,985
Malajsie|ringgit|1|MYR|5,320
Mexiko|peso|1|MXN|1,060
MMF|ZPČ|1|XDR|31,524
Norsko|koruna|1|NOK|2,470
Nový Zéland|dolar|1|NZD|15,281
Polsko|zlotý|1|PLN|5,534
Rumunsko|leu|1|RON|5,135
Rusko|rubl|100|RUB|30,612
Singapur|dolar|1|SGD|16,432
Švédsko|koruna|1|SEK|2,463
Švýcarsko|frank|1|CHF|24,468
Thajsko|baht|100|THB|66,446
Turecko|lira|1|TRY|1,628
USA|dolar|1|USD|22,509
Velká Británie|libra|1|GBP|29,883`

const mockBrokenData = ` #233
země|měna|množství|kód|kurz
Austrálie|dolar|1|AUD|15,885
Brazílie|real|1|BRL|3,991
Bulharsko|BGN|12,996
Čína|žen-min-pi|1|CNY|XXI
Dánsko||1|DKK|3,418
EMU|euro|1|EUR|25,415
Filipíny|peso|100|PHP|44,550
Hongkong|dolar|1||2,888
Chorvatsko|kuna|1|HRK|3,377
Indie|rupie|100|INR|29,953
Indonesie|1000|IDR|1,563
Island|koruna|a|ISK|17,313`

jest.setTimeout(30000)

describe('Given an App component', () => {
  beforeAll(() => {
    fetchMock.enableMocks()
  })

  beforeEach(() => {
    //;(useQuery as jest.Mock).mockClear()
    fetchMock.resetMocks()
  })

  afterAll(() => {
    fetchMock.disableMocks()
  })

  it('should try 3 times render with error and match the snapshot', async () => {
    ;(fetch as FetchMock).mockReject(new Error('Test error'))
    const { container, getByLabelText } = render(<App />)
    await waitFor(() => getByLabelText('audio-loading'))
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(4), { timeout: 30000 })
    expect(container).toMatchSnapshot()
  })

  it('should render with no data and match the snapshot', async () => {
    ;(fetch as FetchMock).mockResponse('')
    const { container } = render(<App />)
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(4), { timeout: 30000 })
    expect(container).toMatchSnapshot()
  })

  it('should render with all data and match the snapshot', async () => {
    ;(fetch as FetchMock).mockResponseOnce(mockData)
    const { getByRole, findByText, container, findByRole } = render(<App />)
    expect(container).toMatchSnapshot('Loading')
    await findByRole('button')
    expect(container).toMatchSnapshot('Loaded')
    expect(getByRole('button')).toBeDisabled()
    fireEvent.change(getByRole('spinbutton'), { target: { value: '200' } })
    await waitFor(() => getByRole('button'))
    expect(getByRole('button')).not.toBeDisabled()
    fireEvent.change(getByRole('combobox'), { target: { value: 'USD' } })
    await waitFor(() => getByRole('button'))
    fireEvent.click(getByRole('button'))
    await findByRole('heading')
    await findByText('200 CZK = 8.885 USD')
  })

  it('should render with broken data and match the snapshot', async () => {
    ;(fetch as FetchMock).mockResponseOnce(mockBrokenData)
    const { getByRole, container } = render(<App />)
    await waitFor(() => getByRole('button'))
    expect(container).toMatchSnapshot()
  })
})
