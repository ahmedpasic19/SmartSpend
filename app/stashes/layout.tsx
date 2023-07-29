import Navbar from '@/components/layout/nav/Navbar'

export const metadata = {
  title: 'SmartSpend',
  description: 'Track youre financial transactions',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="flex flex-col-reverse">
      <Navbar />
      <body>{children}</body>
    </html>
  )
}
