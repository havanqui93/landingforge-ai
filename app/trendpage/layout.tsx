import type { ReactNode } from 'react'
import { TpProvider } from '@/components/trendpage/TpProvider'

export const metadata = {
  title: 'TrendPage AI — AI-Powered SEO Landing Page Generator',
  description: 'Generate SEO-optimized landing pages using AI in seconds.',
}

export default function TrendPageLayout({ children }: { children: ReactNode }) {
  return <TpProvider>{children}</TpProvider>
}
