import { createContext, useState, useContext } from 'react'

const AuthContext = createContext()

export function useAuthContext() {
  return useContext(AuthContext)
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState('');

  const value = {
    user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}