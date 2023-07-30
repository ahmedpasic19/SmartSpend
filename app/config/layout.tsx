import Navbar from '@/components/layout/nav/Navbar'

export const metadata = {
  title: 'SmartSpend',
  description: 'Track youre financial transactions',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col">
          <div>
            <Navbar />
          </div>
          {children}
        </div>
      </body>
    </html>
  )
}
