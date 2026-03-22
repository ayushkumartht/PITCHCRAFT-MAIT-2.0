import { useState, createContext, useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import AIScan from './pages/AIScan'
import Shop from './pages/Shop'
import Settings from './pages/Settings'
import './index.css'

// Auth Context
export const AuthContext = createContext()

// Language Context
export const LangContext = createContext()

export const useAuth = () => useContext(AuthContext)
export const useLang = () => useContext(LangContext)

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('agriai-user')
    return saved ? JSON.parse(saved) : null
  })

  const [lang, setLang] = useState(() => {
    return localStorage.getItem('agriai-lang') || 'hi'
  })

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('agriai-user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('agriai-user')
  }

  const toggleLang = () => {
    const newLang = lang === 'hi' ? 'en' : 'hi'
    setLang(newLang)
    localStorage.setItem('agriai-lang', newLang)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <LangContext.Provider value={{ lang, toggleLang }}>
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={user ? <Navigate to="/dashboard" /> : <Landing />} 
            />
            <Route 
              path="/dashboard" 
              element={user ? <Dashboard /> : <Navigate to="/" />} 
            />
            <Route 
              path="/scan" 
              element={user ? <AIScan /> : <Navigate to="/" />} 
            />
            <Route 
              path="/shop" 
              element={user ? <Shop /> : <Navigate to="/" />} 
            />
            <Route 
              path="/settings" 
              element={user ? <Settings /> : <Navigate to="/" />} 
            />
          </Routes>
        </BrowserRouter>
      </LangContext.Provider>
    </AuthContext.Provider>
  )
}

export default App
