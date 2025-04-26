"use client"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { AuthProvider, useAuth } from "./Forms/AuthContext"
import LandingPage from "./LandingPage"

function AppContent() {
  const { user, isLoading } = useAuth()
  const [mounted, setMounted] = useState(false)

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return user ? redirect('/home') : <LandingPage />
}

export function AppWrapper() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
