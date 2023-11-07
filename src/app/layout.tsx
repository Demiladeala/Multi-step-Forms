import type { Metadata } from 'next'
import { Nunito_Sans } from 'next/font/google'
import './globals.css'
import { ModalProvider } from './context/ModalContext'

const nunito = Nunito_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Multi Step Forms',
  description: 'Learning forms with Nextjs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ModalProvider>
        <body className={` bg-slate-200 ${nunito.className}`}>
          {children}
        </body>
      </ModalProvider>
    </html>
  )
}
