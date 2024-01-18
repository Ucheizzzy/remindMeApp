import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import NavBar from '@/components/NavBar'
import ThemeProvider from '@/providers/ThemeProvider'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'

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
      <html
        lang='en'
        className={cn(inter.className, 'dark')}
        style={{ colorScheme: 'dark' }}
      >
        <body>
          <ThemeProvider>
            <main className='flex min-h-screen w-full flex-col item-center dark:bg-black'>
              <NavBar />
              <Separator />
              <div className='flex flex-grow w-full justify-center items-center dark:bg-neutral-950'>
                {children}
                <Toaster />
              </div>
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
