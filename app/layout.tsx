import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Remind Me App',
  description:
    'This is an application that reminds you of your set task for the day or month.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang='en'
      
      >
        <body className={inter.className}>
          <main className='flex min-h-screen w-full flex-col item-center dark:bg-black'>
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
