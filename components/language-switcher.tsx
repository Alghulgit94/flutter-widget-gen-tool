"use client"

import { Button } from "@/components/ui/button"
import { Languages } from "lucide-react"
import type { Language } from "@/lib/i18n"

interface LanguageSwitcherProps {
  currentLang: Language
  onLanguageChange: (lang: Language) => void
}

export function LanguageSwitcher({ currentLang, onLanguageChange }: LanguageSwitcherProps) {
  return (
    <div className="flex items-center gap-2 bg-muted/50 rounded-lg p-1">
      <Languages className="w-4 h-4 text-muted-foreground ml-2" />
      <Button
        variant={currentLang === "en" ? "default" : "ghost"}
        size="sm"
        onClick={() => onLanguageChange("en")}
        className="h-8 px-3 text-xs"
      >
        EN
      </Button>
      <Button
        variant={currentLang === "es" ? "default" : "ghost"}
        size="sm"
        onClick={() => onLanguageChange("es")}
        className="h-8 px-3 text-xs"
      >
        ES
      </Button>
    </div>
  )
}
