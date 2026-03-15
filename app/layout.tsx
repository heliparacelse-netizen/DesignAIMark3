import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/Providers'
import DesignCopilot from '@/components/DesignCopilot'

export const metadata: Metadata = {
  title: 'DesignAI — AI Interior Design Studio',
  description: 'Transform any room with AI-powered interior design. Beats Homestyler, Interior AI, and Spacely AI.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <DesignCopilot />
        </Providers>
      </body>
    </html>
  )
}
