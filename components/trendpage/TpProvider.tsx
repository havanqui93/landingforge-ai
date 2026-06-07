'use client'
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

interface TpTheme {
  dark: boolean
  toggleDark: () => void
}

const TpThemeContext = createContext<TpTheme>({ dark: false, toggleDark: () => {} })

export function useTpTheme() {
  return useContext(TpThemeContext)
}

export function TpProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('tp-dark') === 'true') setDark(true)
  }, [])

  const toggleDark = () =>
    setDark(d => {
      localStorage.setItem('tp-dark', String(!d))
      return !d
    })

  return (
    <TpThemeContext.Provider value={{ dark, toggleDark }}>
      <div className={`tp-root${dark ? ' dark' : ''}`}>{children}</div>
    </TpThemeContext.Provider>
  )
}
