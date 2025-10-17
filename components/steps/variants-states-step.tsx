"use client"

import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import type { ComponentData } from "@/lib/types"
import { useLanguage } from "@/lib/language-context"
import { useTranslation } from "@/lib/i18n"

const VARIANTS = ["Default", "Hover", "Pressed/Active", "Focused", "Disabled", "Loading", "Error", "Success"]

interface VariantsStatesStepProps {
  data: ComponentData
  updateData: (updates: Partial<ComponentData>) => void
  quickStartMode: boolean
}

export function VariantsStatesStep({ data, updateData, quickStartMode }: VariantsStatesStepProps) {
  const { language } = useLanguage()
  const t = useTranslation(language)

  const handleVariantToggle = (variant: string) => {
    const variants = data.variants.includes(variant)
      ? data.variants.filter((v) => v !== variant)
      : [...data.variants, variant]
    updateData({ variants })
  }

  const displayVariants = quickStartMode ? VARIANTS.slice(0, 4) : VARIANTS

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-sm font-medium mb-4 block">{t.variantsStates.selectVariants}</Label>
        <div className="grid grid-cols-2 gap-4">
          {displayVariants.map((variant) => (
            <div
              key={variant}
              className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
            >
              <Checkbox
                id={variant}
                checked={data.variants.includes(variant)}
                onCheckedChange={() => handleVariantToggle(variant)}
              />
              <label htmlFor={variant} className="text-sm text-foreground cursor-pointer flex-1">
                {variant}
              </label>
            </div>
          ))}
        </div>
      </div>

      {quickStartMode && (
        <p className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">{t.variantsStates.quickStartNote}</p>
      )}
    </div>
  )
}
