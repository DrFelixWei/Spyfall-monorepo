import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // Import BrowserRouter
import { RecoilRoot } from 'recoil' // Import RecoilRoot
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <RecoilRoot> 
        <App />
      </RecoilRoot>
    </BrowserRouter>
  </StrictMode>
)
