// Utility for safe API calls that won't cause blob URL errors
export async function safeFetch(url: string, options?: RequestInit): Promise<Response | null> {
  try {
    // Avoid blob URLs and invalid URLs
    if (!url || url.startsWith("blob:") || !url.startsWith("http")) {
      console.warn("Invalid URL detected, skipping fetch:", url)
      return null
    }

    const response = await fetch(url, {
      ...options,
      // Add timeout to prevent hanging requests
      signal: AbortSignal.timeout(10000), // 10 second timeout
    })

    if (!response.ok) {
      console.warn("Fetch failed:", response.status, response.statusText)
      return null
    }

    return response
  } catch (error) {
    console.warn("Fetch error:", error)
    return null
  }
}

// Safe image loader that handles errors gracefully
export function createSafeImageUrl(src?: string): string {
  if (!src || src.startsWith("blob:") || !src.startsWith("http")) {
    // Return a data URL for a simple placeholder
    return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlPC90ZXh0Pjwvc3ZnPg=="
  }
  return src
}
