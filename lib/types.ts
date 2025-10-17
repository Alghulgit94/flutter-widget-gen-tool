export interface ComponentData {
  componentName: string
  componentType: string[]
  description: string
  visualReference: string
  variants: string[]
  colors: {
    background: string
    text: string
    border: string
    icons: string
    stateColors: string
  }
  typography: {
    primaryText: string
    secondaryText: string
    labels: string
    other: string
  }
  dimensions: {
    height: string
    width: string
    padding: string
    margin: string
    borderRadius: string
    borderWidth: string
    iconSize: string
  }
  icons: {
    iconName: string
    iconPosition: string
    iconColor: string
  }
  animations: {
    animationType: string
    duration: string
    curve: string
    trigger: string
  }
  componentAPI: string
  behavior: string
  responsiveBehavior: string
  accessibility: string[]
  stateManagement: {
    needsProvider: boolean
    providerStructure: string
    consumesProviders: string
  }
  validation: {
    rules: string
    timing: string
    errorHandling: string
    successHandling: string
  }
  fileLocation: string
  additionalNotes: string
  validationChecklist: string[]
}
