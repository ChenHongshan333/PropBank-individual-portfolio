import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PropBank — Chen Hongshan | IDP Portfolio',
  description: 'Individual Design Portfolio — Gear Library & Marketplace, PropMes, Opening & Landing',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
