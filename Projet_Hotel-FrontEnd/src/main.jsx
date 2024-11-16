import { createRoot } from 'react-dom/client'
import './css/index.css'
import App from './App.jsx'
import Layout from './Layout'
import Home from './Home'

createRoot(document.getElementById('root')).render(
    <StrictMode>

    <App />
  </StrictMode>,
)
