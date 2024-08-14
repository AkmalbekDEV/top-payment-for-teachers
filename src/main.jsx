import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { PrimeReactProvider } from 'primereact/api'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <PrimeReactProvider>
          <App />
        </PrimeReactProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
