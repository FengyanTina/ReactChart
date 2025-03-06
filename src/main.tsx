import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import React from 'react'
import { StyledEngineProvider } from '@mui/material'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <StyledEngineProvider injectFirst>
    <App />
    </StyledEngineProvider>
  </StrictMode>,
)
