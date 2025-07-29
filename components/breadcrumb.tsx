import { ChevronRight, Home } from "lucide-react"
import Link from "next/link"

interface BreadcrumbItem {
  label: string
  href?: string
  current?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav className={`flex items-center space-x-2 text-sm text-gray-600 mb-6 ${className}`}>
      <Link href="/" className="flex items-center hover:text-gray-900 transition-colors">
        <Home className="h-4 w-4" />
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
          {item.href && !item.current ? (
            <Link 
              href={item.href} 
              className="hover:text-gray-900 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className={item.current ? "text-gray-900 font-medium" : ""}>
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  )
}
