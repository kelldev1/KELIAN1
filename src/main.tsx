import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Polices hébergées localement (RGPD : aucune requête vers Google Fonts).
import '@fontsource/anton/400.css'
import '@fontsource/space-mono/400.css'
import '@fontsource/space-mono/700.css'
import './styles/tokens.css'
import './styles/global.css'
import './styles/tailwind.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
