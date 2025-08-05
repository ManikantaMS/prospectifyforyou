/**
 * Debug utility to test localStorage corruption handling
 * Run this in browser console to test the fixes
 */

// Test localStorage corruption handling
window.testStorageFix = () => {
  console.log('🧪 Testing localStorage corruption handling...')
  
  // Simulate corrupted localStorage
  try {
    // Add some corrupted auth data
    localStorage.setItem('supabase.auth.token', 'corrupted-token-data')
    localStorage.setItem('sb-auth-token', 'invalid-json-{broken')
    
    console.log('✅ Added corrupted auth data')
    
    // Test storage utils
    const { storageUtils } = require('./storage-utils')
    
    console.log('📝 Testing storage availability:', storageUtils.isAvailable())
    
    // Clean auth storage
    storageUtils.cleanAuthStorage()
    
    console.log('🧹 Cleaned auth storage')
    
    // Refresh the page to test auth recovery
    window.location.reload()
    
  } catch (error) {
    console.error('❌ Test failed:', error)
  }
}

console.log('🎯 Run window.testStorageFix() to test localStorage corruption handling')
