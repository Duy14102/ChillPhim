import { lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Layout from './Layout.jsx'
import App from './page/Home/App.jsx'
const Information = lazy(() => import('./page/Information/Information.jsx'))
const Streaming = lazy(() => import('./page/Streaming/Streaming.jsx'))

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<App />} />
        <Route path='/Information/:Name' element={<Information />} />
        <Route path='/Streaming/:Name/:Ep' element={<Streaming />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
