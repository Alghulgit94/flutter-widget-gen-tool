"use client"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import type { ComponentData } from "@/lib/types"
import { useLanguage } from "@/lib/language-context"
import { useTranslation } from "@/lib/i18n"

const ACCESSIBILITY_REQUIREMENTS = [
  "Semantic labels for screen readers",
  "Minimum touch target size (48x48dp)",
  "Focus indicators",
  "Color contrast requirements (WCAG AA)",
  "Keyboard navigation support",
  "Screen reader announcements for state changes",
]

interface BehaviorStepProps {
  data: ComponentData
  updateData: (updates: Partial<ComponentData>) => void
  quickStartMode: boolean
}

export function BehaviorStep({ data, updateData, quickStartMode }: BehaviorStepProps) {
  const { language } = useLanguage()
  const t = useTranslation(language)

  const handleAccessibilityToggle = (requirement: string) => {
    const accessibility = data.accessibility.includes(requirement)
      ? data.accessibility.filter((a) => a !== requirement)
      : [...data.accessibility, requirement]
    updateData({ accessibility })
  }

  const displayRequirements = quickStartMode ? ACCESSIBILITY_REQUIREMENTS.slice(0, 3) : ACCESSIBILITY_REQUIREMENTS

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="behavior" className="text-sm font-medium">
          {t.behavior.behaviorTitle}
        </Label>
        <Textarea
          id="behavior"
          placeholder={t.behavior.behaviorPlaceholder}
          value={data.behavior}
          onChange={(e) => updateData({ behavior: e.target.value })}
          rows={quickStartMode ? 4 : 6}
        />
      </div>

      {!quickStartMode && (
        <div className="space-y-2">
          <Label htmlFor="responsiveBehavior" className="text-sm font-medium">
            {t.behavior.responsiveTitle}
          </Label>
          <Textarea
            id="responsiveBehavior"
            placeholder={t.behavior.responsivePlaceholder}
            value={data.responsiveBehavior}
            onChange={(e) => updateData({ responsiveBehavior: e.target.value })}
            rows={4}
          />
        </div>
      )}

      <div className="space-y-3">
        <Label className="text-sm font-medium">{t.behavior.accessibilityTitle}</Label>
        <div className="space-y-2">
          {displayRequirements.map((requirement) => (
            <div
              key={requirement}
              className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
            >
              <Checkbox
                id={requirement}
                checked={data.accessibility.includes(requirement)}
                onCheckedChange={() => handleAccessibilityToggle(requirement)}
              />
              <label htmlFor={requirement} className="text-sm text-foreground cursor-pointer flex-1">
                {requirement}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
