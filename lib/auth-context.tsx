"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  company?: string
  industry?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (userData: any) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("prospectify_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // In a real app, this would use Supabase auth
    const mockUser: User = {
      id: "1",
      email,
      firstName: "Demo",
      lastName: "User",
      company: "Demo Company",
      industry: "fashion",
    }

    setUser(mockUser)
    localStorage.setItem("prospectify_user", JSON.stringify(mockUser))
  }

  const signup = async (userData: any) => {
    // In a real app, this would use Supabase auth
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      company: userData.company,
      industry: userData.industry,
    }

    setUser(newUser)
    localStorage.setItem("prospectify_user", JSON.stringify(newUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("prospectify_user")
  }

  const value: AuthContextType = {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
