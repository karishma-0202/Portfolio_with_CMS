import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    localStorage.getItem('adminToken')
  )

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('adminUser')) || null
  )

  const login = (loginResponse) => {
    localStorage.setItem('adminToken', loginResponse.token)

    const userData = {
      username: loginResponse.username,
      role: loginResponse.role,
    }

    localStorage.setItem('adminUser', JSON.stringify(userData))

    setToken(loginResponse.token)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')

    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}