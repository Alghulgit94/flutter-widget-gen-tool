"use client"

import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import type { ComponentData } from "@/lib/types"
import { CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useTranslation } from "@/lib/i18n"

const VALIDATION_CHECKLIST = [
  "Uses ONLY colors from app_colors.dart",
  "Uses ONLY typography from app_typography.dart",
  "Uses ONLY dimensions from app_dimensions.dart",
  "Works in both light and dark themes",
  "Follows naming conventions",
  "Meets accessibility standards",
  "Has comprehensive dartdoc comments",
  "Includes usage example",
  "Handles all specified states/variants",
  "Uses const constructors where possible",
]

interface ReviewStepProps {
  data: ComponentData
  updateData: (updates: Partial<ComponentData>) => void
  quickStartMode: boolean
}

export function ReviewStep({ data, updateData, quickStartMode }: ReviewStepProps) {
  const { language } = useLanguage()
  const t = useTranslation(language)

  const handleChecklistToggle = (item: string) => {
    const checklist = data.validationChecklist.includes(item)
      ? data.validationChecklist.filter((i) => i !== item)
      : [...data.validationChecklist, item]
    updateData({ validationChecklist: checklist })
  }

  const completionPercentage = Math.round((data.validationChecklist.length / VALIDATION_CHECKLIST.length) * 100)

  return (
    <div className="space-y-6">
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 text-center">
        <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-foreground mb-2">{t.review.title}</h3>
        <p className="text-sm text-muted-foreground">{t.review.description}</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">{t.review.validationChecklist}</Label>
          <span className="text-xs font-medium text-muted-foreground">
            {completionPercentage}
            {t.review.percentComplete}
          </span>
        </div>

        <div className="space-y-2">
          {VALIDATION_CHECKLIST.map((item) => (
            <div
              key={item}
              className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
            >
              <Checkbox
                id={item}
                checked={data.validationChecklist.includes(item)}
                onCheckedChange={() => handleChecklistToggle(item)}
              />
              <label htmlFor={item} className="text-sm text-foreground cursor-pointer flex-1">
                {item}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-muted/50 p-4 rounded-lg">
        <h4 className="text-sm font-semibold text-foreground mb-3">{t.review.componentSummary}</h4>
        <dl className="space-y-2 text-xs">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">{t.review.componentName}</dt>
            <dd className="font-mono text-foreground">{data.componentName || t.review.notSet}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">{t.review.type}</dt>
            <dd className="text-foreground">{data.componentType.join(", ") || t.review.notSet}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">{t.review.variants}</dt>
            <dd className="text-foreground">
              {data.variants.length} {t.review.variantsSelected}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">{t.review.fileLocation}</dt>
            <dd className="font-mono text-foreground text-right max-w-xs truncate">
              {data.fileLocation || t.review.notSet}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
