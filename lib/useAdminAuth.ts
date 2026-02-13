'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = () => {
      const authToken = localStorage.getItem('adminAuth')
      const adminUser = localStorage.getItem('adminUser')
      
      if (authToken === 'true' && adminUser) {
        setIsAuthenticated(true)
      } else if (pathname !== '/admin/login') {
        // Only redirect if not already on login page
        router.push('/admin/login')
      }
      setLoading(false)
    }

    checkAuth()
  }, [router, pathname])

  const logout = () => {
    localStorage.removeItem('adminAuth')
    localStorage.removeItem('adminUser')
    router.push('/admin/login')
  }

  return { isAuthenticated, loading, logout }
}
