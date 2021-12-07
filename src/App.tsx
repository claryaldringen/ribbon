import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import './App.css'
import { Layout } from './components/Layout/Layout'

const queryClient = new QueryClient()

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <Layout />
  </QueryClientProvider>
)

export default App
