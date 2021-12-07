import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import { Layout } from './components/Layout/Layout'

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Layout />
  </QueryClientProvider>
)

export default App
