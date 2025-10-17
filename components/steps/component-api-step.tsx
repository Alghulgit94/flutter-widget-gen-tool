"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Plus, Trash2, Code2, Wrench } from "lucide-react"
import type { ComponentData } from "@/lib/types"
import { useLanguage } from "@/lib/language-context"
import { useTranslation } from "@/lib/i18n"
import { generateDartClass, DART_TYPES, type ComponentParameter } from "@/lib/dart-generator"

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
  const [mode, setMode] = useState<"builder" | "code">("builder")

  // Sync generated code when parameters change
  useEffect(() => {
    if (mode === "builder" && data.componentParameters.length > 0) {
      const generatedCode = generateDartClass(data.componentName, data.componentParameters)
      if (generatedCode !== data.componentAPI) {
        updateData({ componentAPI: generatedCode })
      }
    }
  }, [data.componentParameters, data.componentName, mode])

  const addParameter = () => {
    const newParam: ComponentParameter = {
      id: Math.random().toString(36).substring(7),
      name: "",
      type: "String",
      isRequired: false,
      isNullable: false,
      defaultValue: "",
      description: "",
    }
    updateData({ componentParameters: [...data.componentParameters, newParam] })
  }

  const updateParameter = (id: string, updates: Partial<ComponentParameter>) => {
    const updated = data.componentParameters.map((p) => (p.id === id ? { ...p, ...updates } : p))
    updateData({ componentParameters: updated })
  }

  const removeParameter = (id: string) => {
    updateData({ componentParameters: data.componentParameters.filter((p) => p.id !== id) })
  }

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-sm font-medium mb-2 block">{t.componentAPI.title}</Label>
        <p className="text-xs text-muted-foreground mb-4">{t.componentAPI.description}</p>

        {/* Mode Toggle */}
        <div className="flex gap-2 mb-4">
          <Button
            type="button"
            variant={mode === "builder" ? "default" : "outline"}
            size="sm"
            onClick={() => setMode("builder")}
            className="gap-2"
          >
            <Wrench className="w-4 h-4" />
            {t.componentAPI.builderMode}
          </Button>
          <Button
            type="button"
            variant={mode === "code" ? "default" : "outline"}
            size="sm"
            onClick={() => setMode("code")}
            className="gap-2"
          >
            <Code2 className="w-4 h-4" />
            {t.componentAPI.codeMode}
          </Button>
        </div>

        {mode === "builder" ? (
          <div className="space-y-4">
            {/* Parameter List */}
            {data.componentParameters.length === 0 ? (
              <Card className="p-8 text-center bg-muted/20">
                <p className="text-sm text-muted-foreground mb-4">{t.componentAPI.noParameters}</p>
                <Button type="button" onClick={addParameter} size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  {t.componentAPI.addParameter}
                </Button>
              </Card>
            ) : (
              <>
                <div className="space-y-3">
                  {data.componentParameters.map((param, index) => (
                    <Card key={param.id} className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {/* Parameter Name */}
                        <div>
                          <Label className="text-xs">{t.componentAPI.parameterName}</Label>
                          <Input
                            value={param.name}
                            onChange={(e) => updateParameter(param.id, { name: e.target.value })}
                            placeholder="onPressed"
                            className="mt-1"
                          />
                        </div>

                        {/* Parameter Type */}
                        <div>
                          <Label className="text-xs">{t.componentAPI.parameterType}</Label>
                          <Select value={param.type} onValueChange={(value) => updateParameter(param.id, { type: value })}>
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {DART_TYPES.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Default Value */}
                        <div>
                          <Label className="text-xs">{t.componentAPI.defaultValue}</Label>
                          <Input
                            value={param.defaultValue}
                            onChange={(e) => updateParameter(param.id, { defaultValue: e.target.value })}
                            placeholder="true"
                            className="mt-1"
                          />
                        </div>

                        {/* Description */}
                        <div>
                          <Label className="text-xs">{t.componentAPI.description}</Label>
                          <Input
                            value={param.description}
                            onChange={(e) => updateParameter(param.id, { description: e.target.value })}
                            placeholder="Callback when pressed"
                            className="mt-1"
                          />
                        </div>

                        {/* Checkboxes and Remove Button */}
                        <div className="md:col-span-2 flex items-center justify-between">
                          <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                              <Checkbox
                                id={`required-${param.id}`}
                                checked={param.isRequired}
                                onCheckedChange={(checked) => updateParameter(param.id, { isRequired: !!checked })}
                              />
                              <Label htmlFor={`required-${param.id}`} className="text-xs cursor-pointer">
                                {t.componentAPI.required}
                              </Label>
                            </div>
                            <div className="flex items-center gap-2">
                              <Checkbox
                                id={`nullable-${param.id}`}
                                checked={param.isNullable}
                                onCheckedChange={(checked) => updateParameter(param.id, { isNullable: !!checked })}
                              />
                              <Label htmlFor={`nullable-${param.id}`} className="text-xs cursor-pointer">
                                {t.componentAPI.nullable}
                              </Label>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeParameter(param.id)}
                            className="text-destructive hover:text-destructive gap-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            {t.componentAPI.removeParameter}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <Button type="button" onClick={addParameter} variant="outline" size="sm" className="w-full gap-2">
                  <Plus className="w-4 h-4" />
                  {t.componentAPI.addParameter}
                </Button>
              </>
            )}

            {/* Generated Code Preview */}
            {data.componentParameters.length > 0 && (
              <div className="mt-4">
                <Label className="text-xs font-semibold mb-2 block">{t.componentAPI.generatedCode}</Label>
                <Textarea
                  value={generateDartClass(data.componentName, data.componentParameters)}
                  readOnly
                  rows={quickStartMode ? 12 : 18}
                  className="font-mono text-xs bg-muted/50"
                />
              </div>
            )}
          </div>
        ) : (
          <Textarea
            value={data.componentAPI || DEFAULT_API_TEMPLATE}
            onChange={(e) => updateData({ componentAPI: e.target.value })}
            rows={quickStartMode ? 12 : 18}
            className="font-mono text-xs"
          />
        )}
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
