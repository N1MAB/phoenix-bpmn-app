import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BpmnApp from './BpmnApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BpmnApp />
  </StrictMode>,
)
