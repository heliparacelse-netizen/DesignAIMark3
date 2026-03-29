import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/Providers'

export const metadata: Metadata = {
  title: 'Roomvera AI — AI Interior Design Studio',
  description: 'Transform any room with AI-powered interior design. Upload a photo and get a stunning redesign in seconds. Start free.',
  openGraph: {
    title: 'Roomvera AI — AI Interior Design Studio',
    description: 'Upload a room photo and get an AI redesign in seconds.',
    siteName: 'Roomvera AI',
  },
  twitter: { card: 'summary_large_image', title: 'Roomvera AI', description: 'AI Interior Design Studio' }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
