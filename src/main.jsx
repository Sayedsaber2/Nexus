import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthConTextProvider from './Context/AuthConText'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthConTextProvider>
    <App />
    </AuthConTextProvider>
  </StrictMode>,
)
