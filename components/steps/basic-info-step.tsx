"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import type { ComponentData } from "@/lib/types"
import { useLanguage } from "@/lib/language-context"
import { useTranslation } from "@/lib/i18n"

const COMPONENT_TYPES = [
  "Input/Form component",
  "Button",
  "Card",
  "List item",
  "Navigation component",
  "Modal/Dialog",
  "Other",
]

interface BasicInfoStepProps {
  data: ComponentData
  updateData: (updates: Partial<ComponentData>) => void
  quickStartMode: boolean
}

export function BasicInfoStep({ data, updateData, quickStartMode }: BasicInfoStepProps) {
  const { language } = useLanguage()
  const t = useTranslation(language)

  const handleTypeToggle = (type: string) => {
    const types = data.componentType.includes(type)
      ? data.componentType.filter((t) => t !== type)
      : [...data.componentType, type]
    updateData({ componentType: types })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="componentName" className="text-sm font-medium">
          {t.basicInfo.componentName} <span className="text-destructive">{t.basicInfo.required}</span>
        </Label>
        <Input
          id="componentName"
          placeholder={t.basicInfo.componentNamePlaceholder}
          value={data.componentName}
          onChange={(e) => updateData({ componentName: e.target.value })}
          className="font-mono"
        />
        <p className="text-xs text-muted-foreground">{t.basicInfo.componentNameHint}</p>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium">{t.basicInfo.componentType}</Label>
        <div className="grid grid-cols-2 gap-3">
          {COMPONENT_TYPES.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={type}
                checked={data.componentType.includes(type)}
                onCheckedChange={() => handleTypeToggle(type)}
              />
              <label htmlFor={type} className="text-sm text-foreground cursor-pointer">
                {type}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium">
          {t.basicInfo.description} <span className="text-destructive">{t.basicInfo.required}</span>
        </Label>
        <Textarea
          id="description"
          placeholder={t.basicInfo.descriptionPlaceholder}
          value={data.description}
          onChange={(e) => updateData({ description: e.target.value })}
          rows={4}
        />
      </div>

      {!quickStartMode && (
        <div className="space-y-2">
          <Label htmlFor="visualReference" className="text-sm font-medium">
            {t.basicInfo.visualReference}
          </Label>
          <Textarea
            id="visualReference"
            placeholder={t.basicInfo.visualReferencePlaceholder}
            value={data.visualReference}
            onChange={(e) => updateData({ visualReference: e.target.value })}
            rows={4}
          />
          <p className="text-xs text-muted-foreground">{t.basicInfo.visualReferenceHint}</p>
          <div className="mt-2 p-3 bg-muted/50 border border-border rounded-md">
            <p className="text-xs text-muted-foreground italic">
              💡 {t.basicInfo.visualReferenceDisclaimer}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
