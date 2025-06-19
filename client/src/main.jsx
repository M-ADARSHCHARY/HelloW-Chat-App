
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ChatMenuProvider } from './context/chatMenu.context.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ChatMenuProvider>
      <App />
    </ChatMenuProvider>
    </BrowserRouter> {/* it is a component from react-router-dom for enabling routing in the app*/}
  </StrictMode>,
)
