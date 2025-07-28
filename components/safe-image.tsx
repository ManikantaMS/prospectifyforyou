"use client"

import type React from "react"

import { useState } from "react"
import { ImageIcon } from "lucide-react"

interface SafeImageProps {
  src?: string
  alt: string
  className?: string
  fallbackIcon?: React.ReactNode
}

export function SafeImage({ src, alt, className = "", fallbackIcon }: SafeImageProps) {
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // If no src provided or error occurred, show fallback
  if (!src || hasError) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
        {fallbackIcon || <ImageIcon className="h-8 w-8 text-gray-400" />}
      </div>
    )
  }

  return (
    <img
      src={src || "/placeholder.svg"}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      onLoad={() => setIsLoading(false)}
      style={{ display: isLoading ? "none" : "block" }}
    />
  )
}
