'use client'

import localFont from 'next/font/local'
import { usePathname } from 'next/navigation'
import AdminSidebar from '@/components/admin/AdminSidebar'

const rethinkSans = localFont({
  src: [
    {
      path: '../../public/Font/rethink-sans/RethinkSans[wght].ttf',
      weight: '100 900',
      style: 'normal',
    },
  ],
  variable: '--font-rethink-sans',
  display: 'swap',
})

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/admin/login'

  return (
    <div className={`${rethinkSans.variable} ${isLoginPage ? 'min-h-screen' : 'fixed inset-0 w-full h-full flex flex-col lg:flex-row bg-cream-50'}`}>
      {!isLoginPage && <AdminSidebar />}
      <main className={isLoginPage ? 'w-full' : 'flex-1 w-full lg:w-auto flex flex-col overflow-hidden'}>
        {children}
      </main>
    </div>
  )
}
