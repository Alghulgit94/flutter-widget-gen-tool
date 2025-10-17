"use client"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ComponentData } from "@/lib/types"
import { useLanguage } from "@/lib/language-context"
import { useTranslation } from "@/lib/i18n"

const APP_COLORS = [
  "AppColors.primary",
  "AppColors.secondary",
  "AppColors.surface",
  "AppColors.background",
  "AppColors.onSurface",
  "AppColors.onBackground",
  "AppColors.outline",
  "AppColors.error",
  "AppColors.success",
]

const APP_TYPOGRAPHY = [
  "AppTypography.displayLarge",
  "AppTypography.displayMedium",
  "AppTypography.displaySmall",
  "AppTypography.headlineLarge",
  "AppTypography.headlineMedium",
  "AppTypography.headlineSmall",
  "AppTypography.titleLarge",
  "AppTypography.titleMedium",
  "AppTypography.titleSmall",
  "AppTypography.bodyLarge",
  "AppTypography.bodyMedium",
  "AppTypography.bodySmall",
  "AppTypography.labelLarge",
  "AppTypography.labelMedium",
  "AppTypography.labelSmall",
]

const APP_DIMENSIONS = [
  "AppDimensions.xs",
  "AppDimensions.sm",
  "AppDimensions.md",
  "AppDimensions.lg",
  "AppDimensions.xl",
  "AppDimensions.xxl",
]

interface DesignSpecsStepProps {
  data: ComponentData
  updateData: (updates: Partial<ComponentData>) => void
  quickStartMode: boolean
}

export function DesignSpecsStep({ data, updateData, quickStartMode }: DesignSpecsStepProps) {
  const { language } = useLanguage()
  const t = useTranslation(language)

  const updateColors = (key: string, value: string) => {
    updateData({ colors: { ...data.colors, [key]: value } })
  }

  const updateTypography = (key: string, value: string) => {
    updateData({ typography: { ...data.typography, [key]: value } })
  }

  const updateDimensions = (key: string, value: string) => {
    updateData({ dimensions: { ...data.dimensions, [key]: value } })
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-foreground">{t.designSpecs.colors}</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="color-background" className="text-xs">
              {t.designSpecs.background}
            </Label>
            <Select value={data.colors.background} onValueChange={(v) => updateColors("background", v)}>
              <SelectTrigger id="color-background">
                <SelectValue placeholder={t.designSpecs.selectColor} />
              </SelectTrigger>
              <SelectContent>
                {APP_COLORS.map((color) => (
                  <SelectItem key={color} value={color}>
                    {color}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="color-text" className="text-xs">
              {t.designSpecs.text}
            </Label>
            <Select value={data.colors.text} onValueChange={(v) => updateColors("text", v)}>
              <SelectTrigger id="color-text">
                <SelectValue placeholder={t.designSpecs.selectColor} />
              </SelectTrigger>
              <SelectContent>
                {APP_COLORS.map((color) => (
                  <SelectItem key={color} value={color}>
                    {color}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {!quickStartMode && (
            <>
              <div className="space-y-2">
                <Label htmlFor="color-border" className="text-xs">
                  {t.designSpecs.border}
                </Label>
                <Select value={data.colors.border} onValueChange={(v) => updateColors("border", v)}>
                  <SelectTrigger id="color-border">
                    <SelectValue placeholder={t.designSpecs.selectColor} />
                  </SelectTrigger>
                  <SelectContent>
                    {APP_COLORS.map((color) => (
                      <SelectItem key={color} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="color-icons" className="text-xs">
                  {t.designSpecs.icons}
                </Label>
                <Select value={data.colors.icons} onValueChange={(v) => updateColors("icons", v)}>
                  <SelectTrigger id="color-icons">
                    <SelectValue placeholder={t.designSpecs.selectColor} />
                  </SelectTrigger>
                  <SelectContent>
                    {APP_COLORS.map((color) => (
                      <SelectItem key={color} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-foreground">{t.designSpecs.typography}</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="typo-primary" className="text-xs">
              {t.designSpecs.primaryText}
            </Label>
            <Select value={data.typography.primaryText} onValueChange={(v) => updateTypography("primaryText", v)}>
              <SelectTrigger id="typo-primary">
                <SelectValue placeholder={t.designSpecs.selectStyle} />
              </SelectTrigger>
              <SelectContent>
                {APP_TYPOGRAPHY.map((typo) => (
                  <SelectItem key={typo} value={typo}>
                    {typo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {!quickStartMode && (
            <>
              <div className="space-y-2">
                <Label htmlFor="typo-secondary" className="text-xs">
                  {t.designSpecs.secondaryText}
                </Label>
                <Select
                  value={data.typography.secondaryText}
                  onValueChange={(v) => updateTypography("secondaryText", v)}
                >
                  <SelectTrigger id="typo-secondary">
                    <SelectValue placeholder={t.designSpecs.selectStyle} />
                  </SelectTrigger>
                  <SelectContent>
                    {APP_TYPOGRAPHY.map((typo) => (
                      <SelectItem key={typo} value={typo}>
                        {typo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="typo-labels" className="text-xs">
                  {t.designSpecs.labels}
                </Label>
                <Select value={data.typography.labels} onValueChange={(v) => updateTypography("labels", v)}>
                  <SelectTrigger id="typo-labels">
                    <SelectValue placeholder={t.designSpecs.selectStyle} />
                  </SelectTrigger>
                  <SelectContent>
                    {APP_TYPOGRAPHY.map((typo) => (
                      <SelectItem key={typo} value={typo}>
                        {typo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-foreground">{t.designSpecs.dimensions}</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dim-padding" className="text-xs">
              {t.designSpecs.padding}
            </Label>
            <Select value={data.dimensions.padding} onValueChange={(v) => updateDimensions("padding", v)}>
              <SelectTrigger id="dim-padding">
                <SelectValue placeholder={t.designSpecs.selectSize} />
              </SelectTrigger>
              <SelectContent>
                {APP_DIMENSIONS.map((dim) => (
                  <SelectItem key={dim} value={dim}>
                    {dim}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dim-border-radius" className="text-xs">
              {t.designSpecs.borderRadius}
            </Label>
            <Select value={data.dimensions.borderRadius} onValueChange={(v) => updateDimensions("borderRadius", v)}>
              <SelectTrigger id="dim-border-radius">
                <SelectValue placeholder={t.designSpecs.selectSize} />
              </SelectTrigger>
              <SelectContent>
                {APP_DIMENSIONS.map((dim) => (
                  <SelectItem key={dim} value={dim}>
                    {dim}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}
