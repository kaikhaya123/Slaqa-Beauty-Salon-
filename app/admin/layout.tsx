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
    <div className={`${rethinkSans.variable} flex flex-col lg:flex-row min-h-screen bg-cream-50`}>
      <AdminSidebar />
      <main className="flex-1 flex flex-col lg:overflow-hidden">
        {children}
      </main>
    </div>
  )
}
