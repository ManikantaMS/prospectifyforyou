"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Session, User as SupabaseUser } from '@supabase/supabase-js'
import { storageUtils } from './storage-utils'

interface User {
  id: string
  email: string
  firstName?: string
  lastName?: string
  company?: string
  industry?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (userData: SignupData) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  session: Session | null
  demoLogin: () => Promise<void>
}

interface SignupData {
  firstName: string
  lastName: string
  email: string
  password: string
  company: string
  industry: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    // Clear corrupted localStorage gracefully
    const clearCorruptedStorage = () => {
      if (!storageUtils.isAvailable()) {
        console.warn('localStorage not available or corrupted, cleaning auth storage...')
        storageUtils.cleanAuthStorage()
      }
    }

    // Get initial session
    const getInitialSession = async () => {
      try {
        clearCorruptedStorage()
        
        const { data: { session: initialSession }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Session error:', error)
          // Clear potentially invalid session
          storageUtils.cleanAuthStorage()
          await supabase.auth.signOut()
          setLoading(false)
          return
        }
        
        if (initialSession?.user) {
          // Validate session is not expired
          const now = Date.now() / 1000
          if (initialSession.expires_at && initialSession.expires_at < now) {
            console.warn('Session expired, signing out...')
            storageUtils.cleanAuthStorage()
            await supabase.auth.signOut()
            setLoading(false)
            return
          }
          
          await loadUserProfile(initialSession.user)
          setSession(initialSession)
        }
        setLoading(false)
      } catch (error) {
        console.error('Error getting initial session:', error)
        storageUtils.cleanAuthStorage()
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email)
        
        if (event === 'SIGNED_IN' && session?.user) {
          await loadUserProfile(session.user)
          setSession(session)
        } else if (event === 'SIGNED_OUT') {
          setUser(null)
          setSession(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const loadUserProfile = async (authUser: SupabaseUser) => {
    try {
      // Fetch user profile from custom users table
      const { data: profile, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .single()

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        console.error('Error loading user profile:', error)
      }

      // Create user object with auth data and profile data
      const userData: User = {
        id: authUser.id,
        email: authUser.email || '',
        firstName: authUser.user_metadata?.first_name || profile?.first_name,
        lastName: authUser.user_metadata?.last_name || profile?.last_name,
        company: profile?.company_name,
        industry: profile?.industry,
      }

      setUser(userData)
    } catch (error) {
      console.error('Error in loadUserProfile:', error)
      // Set basic user data even if profile loading fails
      setUser({
        id: authUser.id,
        email: authUser.email || '',
        firstName: authUser.user_metadata?.first_name,
        lastName: authUser.user_metadata?.last_name,
      })
    }
  }

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      throw new Error(error.message)
    }

    // User profile will be loaded automatically by the auth state change listener
  }

  const signup = async (userData: SignupData) => {
    try {
      // Step 1: Create Supabase Auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName,
            company: userData.company,
            industry: userData.industry,
          }
        }
      })

      if (authError) {
        throw new Error(authError.message)
      }

      if (!authData.user) {
        throw new Error('User creation failed')
      }

      // Note: User profile creation is handled automatically by Supabase trigger
      // The trigger creates a user profile in the users table when a new auth user is created
      // This includes: id, email, company_name, industry data from auth metadata
      
      /*
      COMMENTED OUT - Replaced by Supabase trigger for automatic profile creation
      
      // Step 2: Create user profile in custom users table
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,  // Use Supabase Auth user ID
          email: userData.email,
          company_name: userData.company,
          industry: userData.industry,
        })

      if (profileError) {
        console.error('Profile creation error:', profileError)
        // Don't throw here - auth user is created, we can handle profile later
        console.warn('User authenticated but profile creation failed. Profile can be completed later.')
      } else {
        console.log('✅ User profile created successfully')
      }
      */

      console.log('✅ User created successfully - Profile will be created automatically by Supabase trigger')

      // User will be automatically loaded by the auth state change listener
      
    } catch (error) {
      console.error('Signup error:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      // Clear storage first to prevent issues
      storageUtils.cleanAuthStorage()
      
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Logout error:', error)
      }
      
      // Always clear local state even if logout fails
      setUser(null)
      setSession(null)
    } catch (error) {
      console.error('Error during logout:', error)
      // Force clear state
      storageUtils.cleanAuthStorage()
      setUser(null)
      setSession(null)
    }
  }

  const demoLogin = async () => {
    console.log("🚀 Starting demo login...")
    setLoading(true)
    try {
      console.log("📧 Attempting login with demo@prospectify.com")
      const { data, error } = await supabase.auth.signInWithPassword({
        email: "demo@prospectify.com",
        password: "Demo@123"
      })

      if (error) {
        console.error("❌ Demo login error:", error)
        throw new Error("Demo login failed: " + error.message)
      }

      console.log("✅ Demo login successful!")
      console.log("👤 User data:", data.user)
      console.log("🔑 Session data:", data.session)
      
      // Force session update
      if (data.session) {
        setSession(data.session)
        if (data.user) {
          await loadUserProfile(data.user)
        }
      }
    } catch (error) {
      console.error("💥 Demo login error:", error)
      throw error
    } finally {
      setLoading(false)
      console.log("🏁 Demo login process completed")
    }
  }

  const value: AuthContextType = {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
    session,
    demoLogin,
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
