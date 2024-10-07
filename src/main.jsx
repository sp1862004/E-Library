import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BooksProvider } from './context/BooksContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BooksProvider>
      <App />
    </BooksProvider>

  </StrictMode>,
)
