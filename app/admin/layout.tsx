import localFont from 'next/font/local'
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
  return (
    <html lang="en" className={rethinkSans.variable}>
      <body className="font-sans antialiased bg-cream-50">
        <div className="flex h-screen overflow-hidden">
          <AdminSidebar />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
