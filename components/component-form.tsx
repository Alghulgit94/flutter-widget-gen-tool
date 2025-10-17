"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react"
import { BasicInfoStep } from "@/components/steps/basic-info-step"
import { VariantsStatesStep } from "@/components/steps/variants-states-step"
import { DesignSpecsStep } from "@/components/steps/design-specs-step"
import { ComponentAPIStep } from "@/components/steps/component-api-step"
import { BehaviorStep } from "@/components/steps/behavior-step"
import { ImplementationStep } from "@/components/steps/implementation-step"
import { ReviewStep } from "@/components/steps/review-step"
import type { ComponentData } from "@/lib/types"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { validateStep, validateAllSteps } from "@/lib/validation"
import { useLanguage } from "@/lib/language-context"
import { useTranslation } from "@/lib/i18n"

const STEPS = [
  { id: 1, titleKey: "basicInfo", component: BasicInfoStep },
  { id: 2, titleKey: "variantsStates", component: VariantsStatesStep },
  { id: 3, titleKey: "designSpecs", component: DesignSpecsStep },
  { id: 4, titleKey: "componentAPI", component: ComponentAPIStep },
  { id: 5, titleKey: "behavior", component: BehaviorStep },
  { id: 6, titleKey: "implementation", component: ImplementationStep },
  { id: 7, titleKey: "review", component: ReviewStep },
]

const INITIAL_FORM_DATA: ComponentData = {
  componentName: "",
  componentType: [],
  description: "",
  visualReference: "",
  variants: [],
  colors: { background: "", text: "", border: "", icons: "", stateColors: "" },
  typography: { primaryText: "", secondaryText: "", labels: "", other: "" },
  dimensions: { height: "", width: "", padding: "", margin: "", borderRadius: "", borderWidth: "", iconSize: "" },
  icons: { iconName: "", iconPosition: "", iconColor: "" },
  animations: { animationType: "", duration: "", curve: "", trigger: "" },
  componentAPI: "",
  componentParameters: [],
  behavior: "",
  responsiveBehavior: "",
  accessibility: [],
  stateManagement: { needsProvider: false, providerStructure: "", consumesProviders: "" },
  validation: { rules: "", timing: "", errorHandling: "", successHandling: "" },
  fileLocation: "",
  additionalNotes: "",
  validationChecklist: [],
}

interface ComponentFormProps {
  onDataChange: (data: ComponentData) => void
  onValidationChange: (allComplete: boolean) => void
  translations: any
}

export function ComponentForm({ onDataChange, onValidationChange, translations }: ComponentFormProps) {
  const { language } = useLanguage()
  const t = useTranslation(language)

  const [currentStep, setCurrentStep] = useState(1)
  const [quickStartMode, setQuickStartMode] = useState(false)
  const [formData, setFormData] = useState<ComponentData>(INITIAL_FORM_DATA)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("flutter-component-data")
    if (saved) {
      try {
        const parsedData = JSON.parse(saved)
        // Migration: Add componentParameters if it doesn't exist
        if (!parsedData.componentParameters) {
          parsedData.componentParameters = []
        }
        setFormData(parsedData)
      } catch (e) {
        console.error("[v0] Failed to parse saved data:", e)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("flutter-component-data", JSON.stringify(formData))
    onDataChange(formData)

    const validation = validateAllSteps(formData)
    setCompletedSteps(validation.completedSteps)
    onValidationChange(validation.allComplete)
  }, [formData, onDataChange, onValidationChange])

  const updateFormData = (updates: Partial<ComponentData>) => {
    setFormData((prev) => ({ ...prev, ...updates }))
  }

  const handleResetCurrentStep = () => {
    const stepDefaults: Partial<ComponentData> = {}

    switch (currentStep) {
      case 1:
        stepDefaults.componentName = ""
        stepDefaults.componentType = []
        stepDefaults.description = ""
        stepDefaults.visualReference = ""
        break
      case 2:
        stepDefaults.variants = []
        break
      case 3:
        stepDefaults.colors = { background: "", text: "", border: "", icons: "", stateColors: "" }
        stepDefaults.typography = { primaryText: "", secondaryText: "", labels: "", other: "" }
        stepDefaults.dimensions = {
          height: "",
          width: "",
          padding: "",
          margin: "",
          borderRadius: "",
          borderWidth: "",
          iconSize: "",
        }
        stepDefaults.icons = { iconName: "", iconPosition: "", iconColor: "" }
        stepDefaults.animations = { animationType: "", duration: "", curve: "", trigger: "" }
        break
      case 4:
        stepDefaults.componentAPI = ""
        break
      case 5:
        stepDefaults.behavior = ""
        stepDefaults.responsiveBehavior = ""
        stepDefaults.accessibility = []
        break
      case 6:
        stepDefaults.stateManagement = { needsProvider: false, providerStructure: "", consumesProviders: "" }
        stepDefaults.validation = { rules: "", timing: "", errorHandling: "", successHandling: "" }
        stepDefaults.fileLocation = ""
        break
      case 7:
        stepDefaults.additionalNotes = ""
        stepDefaults.validationChecklist = []
        break
    }

    updateFormData(stepDefaults)
  }

  const handleResetAll = () => {
    setFormData(INITIAL_FORM_DATA)
    setCurrentStep(1)
    localStorage.removeItem("flutter-component-data")
  }

  const progress = (currentStep / STEPS.length) * 100
  const CurrentStepComponent = STEPS[currentStep - 1].component

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const currentStepValidation = validateStep(currentStep, formData)

  return (
    <div className="space-y-4">
      <Card className="p-6 bg-card border-border">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-medium text-muted-foreground">
                {translations.form.stepOf.replace("{current}", currentStep).replace("{total}", STEPS.length)}
              </h2>
              <h3 className="text-xl font-semibold text-foreground mt-1">
                {t.steps[STEPS[currentStep - 1].titleKey as keyof typeof t.steps]}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="quick-start" checked={quickStartMode} onCheckedChange={setQuickStartMode} />
              <Label htmlFor="quick-start" className="text-sm text-muted-foreground cursor-pointer">
                {translations.form.quickStart}
              </Label>
            </div>
          </div>

          <Progress value={progress} className="h-2" />

          <div className="flex gap-2 flex-wrap">
            {STEPS.map((step) => (
              <button
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors relative ${
                  currentStep === step.id
                    ? "bg-primary text-primary-foreground"
                    : completedSteps.includes(step.id)
                      ? "bg-green-500/20 text-green-700 dark:text-green-400 hover:bg-green-500/30"
                      : "bg-muted/50 text-muted-foreground/50 hover:bg-muted"
                }`}
              >
                {t.steps[step.titleKey as keyof typeof t.steps]}
                {completedSteps.includes(step.id) && step.id !== 7 && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-card border-border">
        <CurrentStepComponent data={formData} updateData={updateFormData} quickStartMode={quickStartMode} />

        <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetCurrentStep}
            className="gap-2 text-muted-foreground hover:text-foreground bg-transparent"
          >
            <RotateCcw className="w-4 h-4" />
            {translations.form.resetStep}
          </Button>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="gap-2 bg-transparent"
            >
              <ChevronLeft className="w-4 h-4" />
              {translations.form.previous}
            </Button>
            <Button onClick={handleNext} disabled={currentStep === STEPS.length} className="gap-2">
              {translations.form.next}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
