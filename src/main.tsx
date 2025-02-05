import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

if (navigator.serviceWorker) {
  try {
    navigator.serviceWorker.register('../sw.js');
  }
  catch (error) {
    console.log(error)
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
