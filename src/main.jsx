import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// StrictMode intentionally omitted: its dev-only double-mount breaks
// framer-motion mount animations (elements freeze at initial opacity/blur).
createRoot(document.getElementById('root')).render(<App />)
