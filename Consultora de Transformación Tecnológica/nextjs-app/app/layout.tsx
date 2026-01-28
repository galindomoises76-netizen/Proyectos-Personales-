import type { Metadata } from 'next'
import './globals.css'
import { I18nProvider } from '@/components/I18nProvider'

export const metadata: Metadata = {
  title: 'AI Consultancy - Transform Your Business with AI',
  description: 'AI Automation Consultancy for SMEs - Transform your business with cutting-edge AI solutions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  )
}
