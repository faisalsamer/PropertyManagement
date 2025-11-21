'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const parseCookies = (cookieString: string): Record<string, string> => {
  if (!cookieString) return {}
  return cookieString.split('; ').reduce((acc, cookie) => {
    const [key, value] = cookie.split('=')
    if (key && value) acc[key] = decodeURIComponent(value)
    return acc
  }, {} as Record<string, string>)
}

export default function ConfirmedPage() {
  const router = useRouter()
  const [count, setCount] = useState(3)
  const [verified, setVerified] = useState<boolean | null>(null) // null = loading

  useEffect(() => {
    // check cookie
    const cookies = parseCookies(document.cookie)

    if (cookies['verified'] === 'true') {
      setVerified(true)

      // remove cookie so refresh doesn't fake verification
      document.cookie = 'verified=; max-age=0; path=/'

      // start countdown
      const timer = setInterval(() => {
        setCount(c => c - 1)
      }, 1000)

      const redirectTimer = setTimeout(() => {
        router.push('/login')
      }, 3000)

      return () => {
        clearInterval(timer)
        clearTimeout(redirectTimer)
      }
    } else {
      // manual visit or expired cookie → redirect to login
      setVerified(false)
      router.replace('/login')
    }
  }, [router])

  // Loading state
  if (verified === null) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <p>Verifying...</p>
      </div>
    )
  }

  // Not verified (shouldn't render as we redirect, but just in case)
  if (!verified) return null

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Email confirmed ✅</h1>
      <p role="status" aria-live="polite">
        Redirecting to login in {count} seconds...
      </p>
    </div>
  )
}