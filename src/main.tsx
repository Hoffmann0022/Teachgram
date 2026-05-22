import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp.tsx'
import Login from './pages/Login.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </HashRouter>
  </StrictMode>

)
