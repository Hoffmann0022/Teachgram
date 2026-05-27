import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/authContext'

import { SignUp } from './pages/SignUp'
import { Login } from './pages/Login'
import Profile from './pages/Profile'

import './index.css'

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/perfil" element={<Profile />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  </StrictMode>

)
