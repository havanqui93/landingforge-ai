import type { ReactNode } from 'react'
import { TpShell } from '@/components/trendpage/TpShell'

export default function AppLayout({ children }: { children: ReactNode }) {
  return <TpShell>{children}</TpShell>
}
