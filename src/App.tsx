import { useAuth } from '@/hooks/use-auth'
import { AuthCard } from '@/components/auth/auth-card'
import { DashboardLayout } from './components/dashboard/dashboard-layout'
import { LandingPage } from './components/landing/landing-page'
import { FloatingNotebook } from './components/notebook/floating-notebook'
import { UserMenu } from './components/layout/user-menu'
import { useState } from 'react'

export default function App() {
  const { user, signOut } = useAuth()
  const [showAuth, setShowAuth] = useState(false)

  if (!user) {
    return showAuth ? (
      <div className="min-h-screen bg-background/50 flex items-center justify-center p-4">
        <AuthCard onBack={() => setShowAuth(false)} />
      </div>
    ) : (
      <LandingPage onGetStarted={() => setShowAuth(true)} />
    )
  }

  return (
    <div className="min-h-screen bg-background/50">
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <span className="text-xl font-semibold tracking-tight">LearnMatePro</span>
          <UserMenu user={user} onSignOut={signOut} />
        </div>
      </header>
      <div className="pt-[65px]">
        <DashboardLayout />
      </div>
      <FloatingNotebook />
    </div>
  )
}