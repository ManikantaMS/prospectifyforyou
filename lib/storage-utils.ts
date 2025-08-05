/**
 * Storage utilities for handling localStorage corruption
 */

export const storageUtils = {
  /**
   * Safely get item from localStorage with error handling
   */
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key)
    } catch (error) {
      console.warn(`Error accessing localStorage for key "${key}":`, error)
      return null
    }
  },

  /**
   * Safely set item in localStorage with error handling
   */
  setItem: (key: string, value: string): boolean => {
    try {
      localStorage.setItem(key, value)
      return true
    } catch (error) {
      console.warn(`Error setting localStorage for key "${key}":`, error)
      return false
    }
  },

  /**
   * Safely remove item from localStorage
   */
  removeItem: (key: string): boolean => {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.warn(`Error removing localStorage for key "${key}":`, error)
      return false
    }
  },

  /**
   * Clear all localStorage with error handling
   */
  clear: (): boolean => {
    try {
      localStorage.clear()
      return true
    } catch (error) {
      console.warn('Error clearing localStorage:', error)
      return false
    }
  },

  /**
   * Check if localStorage is available and working
   */
  isAvailable: (): boolean => {
    try {
      const testKey = '__storage_test__'
      localStorage.setItem(testKey, 'test')
      localStorage.removeItem(testKey)
      return true
    } catch (error) {
      return false
    }
  },

  /**
   * Clean corrupted storage and reset auth state
   */
  cleanAuthStorage: (): void => {
    const authKeys = [
      'supabase.auth.token',
      'sb-auth-token',
      'sb-refresh-token',
      'sb-access-token'
    ]

    authKeys.forEach(key => {
      try {
        localStorage.removeItem(key)
      } catch (error) {
        console.warn(`Error removing auth key "${key}":`, error)
      }
    })
  }
}
