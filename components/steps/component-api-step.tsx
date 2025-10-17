"use client"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { ComponentData } from "@/lib/types"
import { useLanguage } from "@/lib/language-context"
import { useTranslation } from "@/lib/i18n"

const DEFAULT_API_TEMPLATE = `class ComponentName extends StatelessWidget {
  // Required parameters
  final String requiredParam1;
  final VoidCallback? onTap;
  
  // Optional parameters
  final String? optionalParam;
  final bool enabled;
  
  const ComponentName({
    Key? key,
    required this.requiredParam1,
    this.onTap,
    this.optionalParam,
    this.enabled = true,
  }) : super(key: key);
}`

interface ComponentAPIStepProps {
  data: ComponentData
  updateData: (updates: Partial<ComponentData>) => void
  quickStartMode: boolean
}

export function ComponentAPIStep({ data, updateData, quickStartMode }: ComponentAPIStepProps) {
  const { language } = useLanguage()
  const t = useTranslation(language)

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="componentAPI" className="text-sm font-medium mb-2 block">
          {t.componentAPI.title}
        </Label>
        <p className="text-xs text-muted-foreground mb-4">{t.componentAPI.description}</p>
        <Textarea
          id="componentAPI"
          value={data.componentAPI || DEFAULT_API_TEMPLATE}
          onChange={(e) => updateData({ componentAPI: e.target.value })}
          rows={quickStartMode ? 12 : 18}
          className="font-mono text-xs"
        />
      </div>

      <div className="bg-muted/50 p-4 rounded-lg space-y-2">
        <h4 className="text-xs font-semibold text-foreground">{t.componentAPI.tips}</h4>
        <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
          <li>{t.componentAPI.tip1}</li>
          <li>{t.componentAPI.tip2}</li>
          <li>{t.componentAPI.tip3}</li>
          <li>{t.componentAPI.tip4}</li>
        </ul>
      </div>
    </div>
  )
}
