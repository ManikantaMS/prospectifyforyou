import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import ChatWidget from '../components/clean-chat-widget'

export const metadata: Metadata = {
  title: "Prospectify - Location Intelligence for SMB Marketing",
  description: "Find the best cities for your marketing campaigns with real EU demographic data",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body className={`${GeistSans.className} antialiased`}>
        <AuthProvider>
          {children}
                  <ChatWidget />
        </AuthProvider>
      </body>
    </html>
  )
}
