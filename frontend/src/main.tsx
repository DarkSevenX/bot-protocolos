import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/style.css'
import App from './App.tsx'
import {RouterContextProvider} from './context/RouterContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterContextProvider>
      <App />
    </RouterContextProvider>
  </StrictMode>,
)
