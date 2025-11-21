'use client'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function ErrorContent() {
  const searchParams = useSearchParams()
  const reason = searchParams.get('reason')

  const getErrorMessage = (reason: string | null) => {
    switch (reason) {
      case 'missing_params':
        return {
          title: 'Invalid Link',
          message: 'The verification link is missing required parameters. Please check your email and try again.'
        }
      case 'verification_failed':
        return {
          title: 'Verification Failed',
          message: 'The verification token is invalid or has expired. Please request a new verification email.'
        }
      case 'expired':
        return {
          title: 'Link Expired',
          message: 'This verification link has expired. Please request a new one.'
        }
      default:
        return {
          title: 'Something went wrong',
          message: 'An unexpected error occurred. Please try again.'
        }
    }
  }

  const error = getErrorMessage(reason)

  return (
    <div style={{ 
      textAlign: 'center', 
      marginTop: '2rem', 
      padding: '2rem',
      maxWidth: '500px',
      margin: '2rem auto'
    }}>
      <h1 style={{ color: '#dc2626', marginBottom: '1rem' }}>
        ❌ {error.title}
      </h1>
      <p style={{ 
        marginBottom: '2rem', 
        color: '#6b7280',
        lineHeight: '1.6'
      }}>
        {error.message}
      </p>
      
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button
          onClick={() => window.history.back()}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            textDecoration: 'none'
          }}
        >
          Go Back
        </button>
        
        <a
          href="/login"
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            textDecoration: 'none',
            display: 'inline-block'
          }}
        >
          Go to Login
        </a>
      </div>

      {reason === 'verification_failed' && (
        <div style={{ marginTop: '1.5rem' }}>
          <a
            href="/resend-verification"
            style={{
              color: '#3b82f6',
              textDecoration: 'underline',
              fontSize: '0.875rem'
            }}
          >
            Resend verification email
          </a>
        </div>
      )}
    </div>
  )
}

export default function ErrorPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', marginTop: '2rem' }}>Loading...</div>}>
      <ErrorContent />
    </Suspense>
  )
}