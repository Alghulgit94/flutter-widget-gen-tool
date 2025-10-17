"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowLeft, CheckCircle2, Zap, Users, FileCode, Globe } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/lib/language-context"
import { useTranslation } from "@/lib/i18n"
import Link from "next/link"

export default function DocsPage() {
  const { language, setLanguage } = useLanguage()
  const translations = useTranslation(language)
  const t = translations.docs

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">{t.title}</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">{t.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher currentLang={language} onLanguageChange={setLanguage} />
            <Link href="/">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">{t.backToHome}</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Getting Started Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">{t.gettingStarted}</h2>
          </div>
          <p className="text-muted-foreground mb-6">{t.gettingStartedDesc}</p>

          {/* How to Use Steps */}
          <h3 className="text-xl font-semibold text-foreground mb-4">{t.howToUse}</h3>
          <div className="space-y-6">
            {/* Step 1 */}
            <Card className="p-6 bg-card border-border">
              <h4 className="text-lg font-semibold text-foreground mb-2">{t.step1Title}</h4>
              <p className="text-muted-foreground">{t.step1Desc}</p>
            </Card>

            {/* Step 2 */}
            <Card className="p-6 bg-card border-border">
              <h4 className="text-lg font-semibold text-foreground mb-2">{t.step2Title}</h4>
              <p className="text-muted-foreground mb-4">{t.step2Desc}</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-primary mt-1">•</span>
                  <span>{t.step2Item1}</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-primary mt-1">•</span>
                  <span>{t.step2Item2}</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-primary mt-1">•</span>
                  <span>{t.step2Item3}</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-primary mt-1">•</span>
                  <span>{t.step2Item4}</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-primary mt-1">•</span>
                  <span>{t.step2Item5}</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-primary mt-1">•</span>
                  <span>{t.step2Item6}</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-primary mt-1">•</span>
                  <span>{t.step2Item7}</span>
                </li>
              </ul>
            </Card>

            {/* Step 3 */}
            <Card className="p-6 bg-card border-border">
              <h4 className="text-lg font-semibold text-foreground mb-2">{t.step3Title}</h4>
              <p className="text-muted-foreground">{t.step3Desc}</p>
            </Card>

            {/* Step 4 */}
            <Card className="p-6 bg-card border-border">
              <h4 className="text-lg font-semibold text-foreground mb-2">{t.step4Title}</h4>
              <p className="text-muted-foreground">{t.step4Desc}</p>
            </Card>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">{t.features}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">{t.feature1Title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{t.feature1Desc}</p>
            </Card>

            <Card className="p-6 bg-card border-border">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">{t.feature2Title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{t.feature2Desc}</p>
            </Card>

            <Card className="p-6 bg-card border-border">
              <div className="flex items-center gap-3 mb-3">
                <FileCode className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">{t.feature3Title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{t.feature3Desc}</p>
            </Card>

            <Card className="p-6 bg-card border-border">
              <div className="flex items-center gap-3 mb-3">
                <Globe className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">{t.feature4Title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{t.feature4Desc}</p>
            </Card>
          </div>
        </section>

        {/* Pro Tips Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">{t.tips}</h2>
          <div className="space-y-4">
            <Card className="p-5 bg-muted/50 border-border">
              <h4 className="font-semibold text-foreground mb-2">{t.tip1Title}</h4>
              <p className="text-sm text-muted-foreground">{t.tip1Desc}</p>
            </Card>

            <Card className="p-5 bg-muted/50 border-border">
              <h4 className="font-semibold text-foreground mb-2">{t.tip2Title}</h4>
              <p className="text-sm text-muted-foreground">{t.tip2Desc}</p>
            </Card>

            <Card className="p-5 bg-muted/50 border-border">
              <h4 className="font-semibold text-foreground mb-2">{t.tip3Title}</h4>
              <p className="text-sm text-muted-foreground">{t.tip3Desc}</p>
            </Card>

            <Card className="p-5 bg-muted/50 border-border">
              <h4 className="font-semibold text-foreground mb-2">{t.tip4Title}</h4>
              <p className="text-sm text-muted-foreground">{t.tip4Desc}</p>
            </Card>
          </div>
        </section>

        {/* AI-Optimized Output Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">{t.aiOptimized}</h2>
          <p className="text-muted-foreground mb-4">{t.aiOptimizedDesc}</p>
          <Card className="p-6 bg-card border-border">
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{t.aiItem1}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{t.aiItem2}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{t.aiItem3}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{t.aiItem4}</span>
              </li>
            </ul>
          </Card>
        </section>

        {/* Need Help Section */}
        <section className="mb-8">
          <Card className="p-6 bg-primary/5 border-primary/20">
            <h2 className="text-xl font-bold text-foreground mb-2">{t.needHelp}</h2>
            <p className="text-muted-foreground">{t.needHelpDesc}</p>
          </Card>
        </section>

        {/* CTA */}
        <div className="flex justify-center">
          <Link href="/">
            <Button size="lg" className="gap-2">
              <Sparkles className="w-5 h-5" />
              {t.backToHome}
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-12">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-sm text-muted-foreground">
            Flutter Component Generator - {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  )
}
