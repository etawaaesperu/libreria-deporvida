import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { DeporvidaProvider, DeporvidaApp } from './index'
import './styles/main.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DeporvidaProvider>
      <DeporvidaApp />
    </DeporvidaProvider>
  </StrictMode>,
)