"use client"

import type React from "react"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles, Mail, Lock, User } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"
import type { Language } from "@/lib/i18n"
import { useToast } from "@/hooks/use-toast"

interface SignupScreenProps {
  onSignup: () => void
  onSwitchToLogin: () => void
  language: Language
  onLanguageChange: (lang: Language) => void
  translations: any
}

export function SignupScreen({
  onSignup,
  onSwitchToLogin,
  language,
  onLanguageChange,
  translations,
}: SignupScreenProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { toast } = useToast()

  const t = translations.signup

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate passwords match
    if (password !== confirmPassword) {
      setError(t.passwordMismatch)
      return
    }

    // Validate password length
    if (password.length < 6) {
      setError(t.passwordTooShort)
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        setError(data.error || translations.auth?.signupError || "Failed to create account")
        toast({
          title: translations.auth?.error || "Error",
          description: data.error || translations.auth?.signupError || "Failed to create account",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      toast({
        title: translations.auth?.success || "Success",
        description: translations.auth?.signupSuccess || "Account created successfully",
      })

      onSignup()
    } catch (error) {
      console.error("[signup] Error:", error)
      const errorMsg = translations.auth?.networkError || "Network error. Please try again."
      setError(errorMsg)
      toast({
        title: translations.auth?.error || "Error",
        description: errorMsg,
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher currentLang={language} onLanguageChange={onLanguageChange} />
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Tool description */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
              <p className="text-muted-foreground">{t.subtitle}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">{t.getStarted}</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary text-sm font-semibold">1</span>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{t.benefit1Title}</h3>
                  <p className="text-sm text-muted-foreground">{t.benefit1Desc}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary text-sm font-semibold">2</span>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{t.benefit2Title}</h3>
                  <p className="text-sm text-muted-foreground">{t.benefit2Desc}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary text-sm font-semibold">3</span>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{t.benefit3Title}</h3>
                  <p className="text-sm text-muted-foreground">{t.benefit3Desc}</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="p-4 bg-muted/50 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{t.freeForever}</span> {t.freeForeverDesc}
            </p>
          </div>
        </div>

        {/* Right side - Signup form */}
        <Card className="p-8 bg-card border-border">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-bold text-foreground">{t.createAccount}</h2>
              <p className="text-sm text-muted-foreground">{t.signupPrompt}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">
                  {t.name}
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder={t.namePlaceholder}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  {t.email}
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">
                  {t.password}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="pl-10"
                  />
                </div>
                <p className="text-xs text-muted-foreground">{t.passwordHint}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-foreground">
                  {t.confirmPassword}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    className="pl-10"
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? t.creatingAccount : t.createAccountButton}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                {t.haveAccount}{" "}
                <button type="button" onClick={onSwitchToLogin} className="text-primary hover:underline font-medium">
                  {t.signIn}
                </button>
              </p>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground text-center">
                🔒 {t.supabaseReady}
                <br />
                <span className="text-[10px]">{t.authPrepared}</span>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
