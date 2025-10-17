import type { ComponentData } from "./types"

export interface StepValidation {
  stepId: number
  isComplete: boolean
  requiredFields: string[]
  missingFields: string[]
}

export function validateStep(stepId: number, data: ComponentData): StepValidation {
  const validation: StepValidation = {
    stepId,
    isComplete: false,
    requiredFields: [],
    missingFields: [],
  }

  switch (stepId) {
    case 1: // Basic Info
      validation.requiredFields = ["componentName", "componentType", "description"]
      if (!data.componentName?.trim()) validation.missingFields.push("componentName")
      if (!data.componentType || data.componentType.length === 0) validation.missingFields.push("componentType")
      if (!data.description?.trim()) validation.missingFields.push("description")
      break

    case 2: // Variants & States
      validation.requiredFields = ["variants"]
      if (!data.variants || data.variants.length === 0) validation.missingFields.push("variants")
      break

    case 3: // Design Specs
      validation.requiredFields = ["colors", "typography", "dimensions"]
      if (!data.colors.background?.trim()) validation.missingFields.push("colors.background")
      if (!data.typography.primaryText?.trim()) validation.missingFields.push("typography.primaryText")
      if (!data.dimensions.height?.trim()) validation.missingFields.push("dimensions.height")
      break

    case 4: // Component API
      validation.requiredFields = ["componentAPI"]
      if (!data.componentAPI?.trim()) validation.missingFields.push("componentAPI")
      break

    case 5: // Behavior
      validation.requiredFields = ["behavior", "accessibility"]
      if (!data.behavior?.trim()) validation.missingFields.push("behavior")
      if (!data.accessibility || data.accessibility.length === 0) validation.missingFields.push("accessibility")
      break

    case 6: // Implementation
      validation.requiredFields = ["fileLocation"]
      if (!data.fileLocation?.trim()) validation.missingFields.push("fileLocation")
      break

    case 7: // Review
      validation.requiredFields = []
      break
  }

  validation.isComplete = validation.missingFields.length === 0

  return validation
}

export function validateAllSteps(data: ComponentData): {
  allComplete: boolean
  completedSteps: number[]
  incompleteSteps: number[]
} {
  const completedSteps: number[] = []
  const incompleteSteps: number[] = []

  for (let i = 1; i <= 6; i++) {
    const validation = validateStep(i, data)
    if (validation.isComplete) {
      completedSteps.push(i)
    } else {
      incompleteSteps.push(i)
    }
  }

  return {
    allComplete: incompleteSteps.length === 0,
    completedSteps,
    incompleteSteps,
  }
}
