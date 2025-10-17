"use client"

import { useState, useEffect } from "react"
import { ComponentForm } from "@/components/component-form"
import { MarkdownPreview } from "@/components/markdown-preview"
import { LoginScreen } from "@/components/login-screen"
import { SignupScreen } from "@/components/signup-screen"
import { Button } from "@/components/ui/button"
import { FileDown, Sparkles, LogOut } from "lucide-react"
import { generateMarkdown } from "@/lib/markdown-generator"
import type { ComponentData } from "@/lib/types"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/lib/language-context"
import { useTranslation } from "@/lib/i18n"

export default function Home() {
  const { language, setLanguage } = useLanguage()
  const translations = useTranslation(language)

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [showSignup, setShowSignup] = useState(false)
  const [componentData, setComponentData] = useState<ComponentData | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [allStepsComplete, setAllStepsComplete] = useState(false)

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me")
        const data = await response.json()

        if (response.ok && data.success) {
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error("[auth] Failed to check authentication:", error)
      } finally {
        setIsCheckingAuth(false)
      }
    }

    checkAuth()
  }, [])

  const handleDataChange = (data: ComponentData) => {
    setComponentData(data)
  }

  const handleValidationChange = (complete: boolean) => {
    setAllStepsComplete(complete)
  }

  const handleExport = () => {
    if (!componentData || !allStepsComplete) return

    const markdown = generateMarkdown(componentData)
    const blob = new Blob([markdown], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${componentData.componentName || "component"}-spec.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      setIsAuthenticated(false)
    } catch (error) {
      console.error("[logout] Error:", error)
    }
  }

  // Show loading state while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    if (showSignup) {
      return (
        <SignupScreen
          onSignup={() => setIsAuthenticated(true)}
          onSwitchToLogin={() => setShowSignup(false)}
          language={language}
          onLanguageChange={setLanguage}
          translations={translations}
        />
      )
    }

    return (
      <LoginScreen
        onLogin={() => setIsAuthenticated(true)}
        onSwitchToSignup={() => setShowSignup(true)}
        language={language}
        onLanguageChange={setLanguage}
        translations={translations}
      />
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">{translations.login.title}</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">{translations.login.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher currentLang={language} onLanguageChange={setLanguage} />
            <Button variant="outline" size="sm" onClick={() => setShowPreview(!showPreview)} className="hidden md:flex">
              {showPreview ? "Hide" : "Show"} Preview
            </Button>
            <Button
              onClick={handleExport}
              disabled={!componentData || !allStepsComplete}
              size="sm"
              className="gap-2"
              title={!allStepsComplete ? translations.review.completeStepsToExport : translations.review.exportButton}
            >
              <FileDown className="w-4 h-4" />
              <span className="hidden sm:inline">Export MD</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={showPreview ? "lg:block" : "col-span-2"}>
            <ComponentForm
              onDataChange={handleDataChange}
              onValidationChange={handleValidationChange}
              translations={translations}
            />
          </div>

          {showPreview && (
            <div className="hidden lg:block">
              <MarkdownPreview data={componentData} allStepsComplete={allStepsComplete} translations={translations} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
