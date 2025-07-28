import { createClient } from "@supabase/supabase-js"

// Check if we're in a browser environment
const isBrowser = typeof window !== "undefined"

// Get environment variables with fallbacks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

// Helper function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  const isConfigured = !!(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl !== "https://placeholder.supabase.co" &&
    supabaseAnonKey !== "placeholder-key" &&
    supabaseUrl.startsWith("https://") &&
    supabaseUrl.includes(".supabase.co") &&
    supabaseUrl.length > 30 &&
    supabaseAnonKey.length > 50 &&
    supabaseAnonKey.startsWith("eyJ")
  )

  console.log("🔍 Supabase configuration check:", {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseAnonKey,
    urlValid: supabaseUrl.startsWith("https://") && supabaseUrl.includes(".supabase.co"),
    urlLength: supabaseUrl.length,
    keyLength: supabaseAnonKey.length,
    keyFormat: supabaseAnonKey.startsWith("eyJ"),
    actualUrl: supabaseUrl ? supabaseUrl.substring(0, 50) + "..." : "Not set",
    actualKeyStart: supabaseAnonKey ? supabaseAnonKey.substring(0, 20) + "..." : "Not set",
    isConfigured,
  })

  return isConfigured
}

// Create a comprehensive mock client that handles all query patterns
function createMockSupabaseClient() {
  console.log("🎭 Creating mock Supabase client - no real database connections will be made")

  const createMockPromise = (data: any = [], error: any = null) => {
    return {
      then: (resolve: any, reject?: any) => {
        console.log("🎭 Mock query resolving with:", { data, error })
        return Promise.resolve({ data, error }).then(resolve, reject)
      },
      catch: (handler: any) => Promise.resolve({ data, error }).catch(handler),
    }
  }

  const mockQueryBuilder = {
    select: (columns?: string) => {
      console.log("🎭 Mock SELECT:", columns)
      return mockQueryBuilder
    },
    eq: (column: string, value: any) => {
      console.log("🎭 Mock WHERE:", column, "=", value)
      return mockQueryBuilder
    },
    order: (column: string, options?: any) => {
      console.log("🎭 Mock ORDER BY:", column, options)
      return mockQueryBuilder
    },
    limit: (count: number) => {
      console.log("🎭 Mock LIMIT:", count)
      return mockQueryBuilder
    },
    single: () => {
      console.log("🎭 Mock SINGLE")
      return mockQueryBuilder
    },
    ...createMockPromise([]),
  }

  const mockTable = {
    select: (columns?: string) => {
      console.log("🎭 Mock table SELECT:", columns)
      return mockQueryBuilder
    },
    insert: (data: any) => {
      console.log("🎭 Mock table INSERT:", data)
      return createMockPromise(null)
    },
    upsert: (data: any, options?: any) => {
      console.log("🎭 Mock table UPSERT:", data, options)
      return createMockPromise(null)
    },
    update: (data: any) => {
      console.log("🎭 Mock table UPDATE:", data)
      return mockQueryBuilder
    },
    delete: () => {
      console.log("🎭 Mock table DELETE")
      return mockQueryBuilder
    },
  }

  return {
    from: (table: string) => {
      console.log("🎭 Mock: Accessing table", table)
      return mockTable
    },
    channel: (name: string) => {
      console.log("🎭 Mock: Creating channel", name)
      return {
        on: (event: string, config: any, callback: any) => {
          console.log("🎭 Mock: Setting up listener for", event)
          return {
            subscribe: () => {
              console.log(`🎭 Mock subscription to ${name} created`)
              return { unsubscribe: () => console.log(`🎭 Mock subscription to ${name} unsubscribed`) }
            },
          }
        },
        subscribe: () => {
          console.log(`🎭 Mock channel ${name} subscribed`)
          return { unsubscribe: () => console.log(`🎭 Mock channel ${name} unsubscribed`) }
        },
      }
    },
    removeChannel: (channel: any) => {
      console.log("🎭 Mock: Removing channel")
    },
    auth: {
      getUser: () => {
        console.log("🎭 Mock: Getting user")
        return Promise.resolve({ data: { user: null }, error: null })
      },
      signIn: (credentials: any) => {
        console.log("🎭 Mock: Sign in attempt")
        return Promise.resolve({ data: null, error: new Error("Supabase not configured") })
      },
      signOut: () => {
        console.log("🎭 Mock: Sign out")
        return Promise.resolve({ error: null })
      },
      onAuthStateChange: (callback: any) => {
        console.log("🎭 Mock: Setting up auth state change listener")
        return {
          data: { subscription: { unsubscribe: () => console.log("🎭 Mock: Auth listener unsubscribed") } },
          error: null,
        }
      },
    },
  } as any
}

// Create a lazy-initialized client
let _supabase: ReturnType<typeof createClient> | null = null
let _supabaseServer: ReturnType<typeof createClient> | null = null

export const getSupabaseClient = () => {
  if (!_supabase) {
    if (!isSupabaseConfigured()) {
      console.warn("⚠️ Supabase not configured - using mock client for development")
      _supabase = createMockSupabaseClient()
      return _supabase
    }

    try {
      console.log("✅ Creating real Supabase client with URL:", supabaseUrl)
      _supabase = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: isBrowser,
          autoRefreshToken: isBrowser,
        },
      })
      console.log("✅ Supabase client created successfully")
    } catch (error) {
      console.error("❌ Failed to create Supabase client:", error)
      console.log("🔄 Falling back to mock client")
      _supabase = createMockSupabaseClient()
    }
  }
  return _supabase
}

export const getSupabaseServerClient = () => {
  if (!_supabaseServer) {
    if (!isSupabaseConfigured()) {
      console.warn("⚠️ Supabase not configured - using mock server client")
      _supabaseServer = createMockSupabaseClient()
      return _supabaseServer
    }

    try {
      console.log("✅ Creating real Supabase server client")
      const serviceKey = supabaseServiceKey || supabaseAnonKey
      _supabaseServer = createClient(supabaseUrl, serviceKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      })
      console.log("✅ Supabase server client created successfully")
    } catch (error) {
      console.error("❌ Failed to create Supabase server client:", error)
      console.log("🔄 Falling back to mock server client")
      _supabaseServer = createMockSupabaseClient()
    }
  }
  return _supabaseServer
}

// Test connection function with better error handling
export const testSupabaseConnection = async () => {
  if (!isSupabaseConfigured()) {
    return { success: false, error: "Supabase not configured", usingMock: true }
  }

  try {
    const client = getSupabaseClient()
    console.log("🧪 Testing Supabase connection...")

    // Try a simple query to test the connection with timeout
    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Connection timeout")), 10000))

    const queryPromise = client.from("cities").select("count").limit(1)

    const { data, error } = (await Promise.race([queryPromise, timeoutPromise])) as any

    if (error) {
      console.error("❌ Supabase connection test failed:", error)

      // Check if it's a table not found error
      if (error.message?.includes("relation") && error.message?.includes("does not exist")) {
        return {
          success: false,
          error: "Database tables not found. Please run the SQL scripts to create tables.",
          usingMock: false,
          needsSetup: true,
        }
      }

      return { success: false, error: error.message, usingMock: false }
    }

    console.log("✅ Supabase connection test successful")
    return { success: true, error: null, usingMock: false }
  } catch (error) {
    console.error("❌ Supabase connection test error:", error)

    let errorMessage = "Unknown error"
    if (error instanceof Error) {
      errorMessage = error.message

      // Handle specific error types
      if (errorMessage.includes("Failed to fetch")) {
        errorMessage = "Cannot connect to Supabase. Check your URL and API keys."
      } else if (errorMessage.includes("timeout")) {
        errorMessage = "Connection timeout. Check your internet connection."
      }
    }

    return { success: false, error: errorMessage, usingMock: false }
  }
}

// Export the lazy clients
export const supabase = getSupabaseClient()
export const supabaseServer = getSupabaseServerClient()
