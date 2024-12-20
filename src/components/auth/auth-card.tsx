import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AuthForm } from './auth-form'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'

interface AuthCardProps {
  onBack?: () => void
}

export function AuthCard({ onBack }: AuthCardProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login')

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        {onBack && (
          <Button
            variant="ghost"
            className="w-fit -ml-2 mb-2"
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        )}
        <CardTitle>{mode === 'login' ? 'Welcome Back' : 'Create Account'}</CardTitle>
        <CardDescription>
          {mode === 'login'
            ? 'Enter your email to sign in to your account'
            : 'Enter your email to create a new account'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AuthForm mode={mode} />
        <div className="mt-4 text-center text-sm">
          {mode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button
                onClick={() => setMode('register')}
                className="text-primary hover:underline"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                onClick={() => setMode('login')}
                className="text-primary hover:underline"
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}