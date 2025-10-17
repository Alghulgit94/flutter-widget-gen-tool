"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import type { ComponentData } from "@/lib/types"
import { useLanguage } from "@/lib/language-context"
import { useTranslation } from "@/lib/i18n"

interface ImplementationStepProps {
  data: ComponentData
  updateData: (updates: Partial<ComponentData>) => void
  quickStartMode: boolean
}

export function ImplementationStep({ data, updateData, quickStartMode }: ImplementationStepProps) {
  const { language } = useLanguage()
  const t = useTranslation(language)

  const updateStateManagement = (key: string, value: any) => {
    updateData({ stateManagement: { ...data.stateManagement, [key]: value } })
  }

  const updateValidation = (key: string, value: string) => {
    updateData({ validation: { ...data.validation, [key]: value } })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="fileLocation" className="text-sm font-medium">
          {t.implementation.fileLocation}
        </Label>
        <Input
          id="fileLocation"
          placeholder={t.implementation.fileLocationPlaceholder}
          value={data.fileLocation}
          onChange={(e) => updateData({ fileLocation: e.target.value })}
          className="font-mono text-xs"
        />
        <p className="text-xs text-muted-foreground">{t.implementation.fileLocationHint}</p>
      </div>

      <div className="space-y-4 p-4 border border-border rounded-lg">
        <div className="flex items-center justify-between">
          <Label htmlFor="needsProvider" className="text-sm font-medium">
            {t.implementation.needsProvider}
          </Label>
          <Switch
            id="needsProvider"
            checked={data.stateManagement.needsProvider}
            onCheckedChange={(checked) => updateStateManagement("needsProvider", checked)}
          />
        </div>

        {data.stateManagement.needsProvider && !quickStartMode && (
          <>
            <div className="space-y-2">
              <Label htmlFor="providerStructure" className="text-xs">
                {t.implementation.providerStructure}
              </Label>
              <Textarea
                id="providerStructure"
                placeholder={t.implementation.providerStructurePlaceholder}
                value={data.stateManagement.providerStructure}
                onChange={(e) => updateStateManagement("providerStructure", e.target.value)}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="consumesProviders" className="text-xs">
                {t.implementation.consumesProviders}
              </Label>
              <Input
                id="consumesProviders"
                placeholder={t.implementation.consumesProvidersPlaceholder}
                value={data.stateManagement.consumesProviders}
                onChange={(e) => updateStateManagement("consumesProviders", e.target.value)}
              />
            </div>
          </>
        )}
      </div>

      {!quickStartMode && (
        <div className="space-y-4 p-4 border border-border rounded-lg">
          <h4 className="text-sm font-semibold text-foreground">{t.implementation.validationTitle}</h4>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="validationRules" className="text-xs">
                {t.implementation.validationRules}
              </Label>
              <Input
                id="validationRules"
                placeholder={t.implementation.validationRulesPlaceholder}
                value={data.validation.rules}
                onChange={(e) => updateValidation("rules", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="validationTiming" className="text-xs">
                {t.implementation.validationTiming}
              </Label>
              <Input
                id="validationTiming"
                placeholder={t.implementation.validationTimingPlaceholder}
                value={data.validation.timing}
                onChange={(e) => updateValidation("timing", e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="additionalNotes" className="text-sm font-medium">
          {t.implementation.additionalNotes}
        </Label>
        <Textarea
          id="additionalNotes"
          placeholder={t.implementation.additionalNotesPlaceholder}
          value={data.additionalNotes}
          onChange={(e) => updateData({ additionalNotes: e.target.value })}
          rows={4}
        />
      </div>
    </div>
  )
}
