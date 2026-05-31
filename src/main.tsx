import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/authContext'

import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Profile from './pages/Profile'
import UserProfile from './pages/UserProfile'
import Feed from './pages/Feed'
import Settings from './pages/Settings'
import ConfigAccount from './pages/ConfigAccount'

import './index.css'
import EditProfile from './pages/EditProfile'


createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="/usuario/:id" element={<UserProfile />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/configuracoes" element={<Settings />} />
          <Route path="/configuracoes_da_conta" element={<ConfigAccount />} />
          <Route path="/editar_perfil" element={<EditProfile />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  </StrictMode>

)
