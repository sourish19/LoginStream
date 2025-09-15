import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Toaster } from 'sonner'
import store from './app/store.js'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Toaster richColors />
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)
