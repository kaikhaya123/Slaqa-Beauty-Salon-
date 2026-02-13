'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Admin authentication
    if (username === 'Goodhope' && password === 'Probarbershoponlypassword@2026') {
      localStorage.setItem('adminAuth', 'true')
      localStorage.setItem('adminUser', username)
      router.push('/admin')
    } else {
      setError('Invalid credentials. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="h-screen w-screen flex flex-col lg:flex-row">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-cream-50">
        <div className="w-full max-w-md space-y-8">
          {/* Logo and Header */}
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="relative w-20 h-20 lg:w-28 lg:h-28">
                <Image
                  src="/logo/Pro_barbershop_logo.png"
                  alt="Pro Barbershop"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <div className="space-y-3">
              <h1 className="text-3xl lg:text-4xl font-black text-dark-900 tracking-tight">
                Admin Portal
              </h1>
              <p className="text-dark-600 text-base lg:text-lg">
                Manage your barbershop with precision
              </p>
            </div>
          </div>

          {/* Login Form Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-cream-300">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border-2 border-red-200 text-red-800 px-4 py-3 rounded-xl flex items-center gap-3 animate-shake">
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">{error}</span>
                </div>
              )}

              {/* Username Field */}
              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-bold text-dark-900">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-cream-50 border-2 border-cream-300 rounded-xl text-dark-900 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-dark-900 focus:border-transparent transition-all duration-200 text-base"
                  placeholder="Enter your username"
                  autoComplete="username"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-bold text-dark-900">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-cream-50 border-2 border-cream-300 rounded-xl text-dark-900 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-dark-900 focus:border-transparent transition-all duration-200 text-base"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-dark-900 hover:bg-dark-800 text-cream-50 font-bold py-3.5 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-900 text-base shadow-lg"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Access Dashboard'
                )}
              </button>
            </form>

            {/* Back Link */}
            <div className="mt-6 pt-6 border-t border-cream-200 text-center">
              <a 
                href="/" 
                className="inline-flex items-center gap-2 text-sm text-dark-600 hover:text-dark-900 transition-colors font-semibold group"
              >
                <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Website
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Hero Image - Desktop Only */}
      <div className="hidden lg:block lg:flex-1 relative overflow-hidden bg-dark-900">
        <div className="relative w-full h-full">
          <Image
            src="/Images/hairdresser-grooming-their-client.jpg"
            alt="Professional Barbershop Service"
            fill
            className="object-cover opacity-40"
            priority
          />
          
          {/* Content Overlay */}
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="space-y-8 text-cream-50 max-w-xl text-center">
              <div className="space-y-4">
                <h2 className="text-5xl font-black leading-tight tracking-tight">
                  Professional Management
                </h2>
                <div className="h-1.5 w-24 bg-cream-200 rounded-full mx-auto"></div>
              </div>
              <p className="text-xl text-cream-200 leading-relaxed">
                Real-time insights. Smart analytics. Every booking managed with precision.
              </p>
              <div className="grid grid-cols-1 gap-4 pt-4">
                <div className="flex items-center gap-3 text-cream-300 bg-dark-800/50 rounded-xl p-4">
                  <div className="w-3 h-3 bg-cream-200 rounded-full flex-shrink-0"></div>
                  <span className="font-semibold">Live booking updates</span>
                </div>
                <div className="flex items-center gap-3 text-cream-300 bg-dark-800/50 rounded-xl p-4">
                  <div className="w-3 h-3 bg-cream-200 rounded-full flex-shrink-0"></div>
                  <span className="font-semibold">Revenue tracking</span>
                </div>
                <div className="flex items-center gap-3 text-cream-300 bg-dark-800/50 rounded-xl p-4">
                  <div className="w-3 h-3 bg-cream-200 rounded-full flex-shrink-0"></div>
                  <span className="font-semibold">Customer management</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
