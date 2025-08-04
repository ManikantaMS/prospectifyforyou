"use client"
import { notFound } from "next/navigation"
import Image from "next/image"

const featureBlogs = [
  {
    id: "dashboard",
    title: "📊 Dashboard Overview",
    date: "Published: July 2025",
    category: "Feature Guide",
    image: "/placeholder-logo.png",
    author: "Team Prospectify",
    content: `The Dashboard is your main hub after login. Here, you can quickly access all major features: campaigns, analytics, profile, and settings. The sidebar or top navigation makes it easy to switch between sections, view stats, and get a snapshot of your marketing performance. Designed for clarity and speed, the dashboard helps you stay organized and focused on your goals.`
  },
  // ...other feature blogs can be added here
]

import React from "react"

export default function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params)
  const blog = featureBlogs.find(b => b.id === id)
  if (!blog) return notFound()
  const handleBackToBlogs = () => {
    window.location.href = '/blogs'
  }

  const handleClose = () => {
    window.location.href = '/blogs'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-10 flex justify-center items-center">
      <div className="max-w-xl w-full bg-white border border-blue-100 rounded-2xl shadow-xl p-8 relative">
        <button 
          onClick={handleBackToBlogs}
          className="absolute top-4 left-4 text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-1 rounded-lg bg-blue-50 border border-blue-100 transition-colors hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          ← Back to Blogs
        </button>
        <button 
          onClick={handleClose} 
          className="absolute top-4 right-4 text-blue-400 hover:text-blue-700 text-xl font-bold bg-transparent border-none cursor-pointer hover:bg-blue-50 rounded-full w-8 h-8 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500" 
          aria-label="Close"
        >
          ×
        </button>
        <div className="flex items-center mb-6 mt-6">
          <Image src={blog.image} alt={blog.title} width={64} height={64} className="rounded mr-4 border border-blue-200 bg-blue-50" />
          <div>
            <h1 className="text-2xl font-bold text-blue-900 mb-2">{blog.title}</h1>
            <p className="text-sm text-blue-600 mb-1">{blog.date} · <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">{blog.category}</span></p>
            <p className="text-xs text-blue-500">- with {blog.author}</p>
          </div>
        </div>
        <p className="text-blue-900 text-base whitespace-pre-line">{blog.content}</p>
      </div>
    </div>
  )
}
