import type { ComponentData } from "./types"

export interface ComponentParameter {
  id: string
  name: string
  type: string
  isRequired: boolean
  isNullable: boolean
  defaultValue: string
  description: string
}

export function generateDartClass(componentName: string, parameters: ComponentParameter[]): string {
  if (!componentName || parameters.length === 0) {
    return generateDefaultTemplate(componentName || "ComponentName")
  }

  const className = componentName || "ComponentName"
  const requiredParams = parameters.filter((p) => p.isRequired)
  const optionalParams = parameters.filter((p) => !p.isRequired)

  // Generate field declarations
  const fieldDeclarations: string[] = []

  if (requiredParams.length > 0) {
    fieldDeclarations.push("  // Required parameters")
    requiredParams.forEach((param) => {
      const nullableSuffix = param.isNullable ? "?" : ""
      const comment = param.description ? `  // ${param.description}` : ""
      fieldDeclarations.push(`  final ${param.type}${nullableSuffix} ${param.name};${comment}`)
    })
  }

  if (optionalParams.length > 0) {
    if (fieldDeclarations.length > 0) fieldDeclarations.push("")
    fieldDeclarations.push("  // Optional parameters")
    optionalParams.forEach((param) => {
      const nullableSuffix = param.isNullable ? "?" : ""
      const comment = param.description ? `  // ${param.description}` : ""
      fieldDeclarations.push(`  final ${param.type}${nullableSuffix} ${param.name};${comment}`)
    })
  }

  // Generate constructor parameters
  const constructorParams: string[] = ["    Key? key"]

  requiredParams.forEach((param) => {
    constructorParams.push(`    required this.${param.name}`)
  })

  optionalParams.forEach((param) => {
    if (param.defaultValue) {
      constructorParams.push(`    this.${param.name} = ${param.defaultValue}`)
    } else {
      constructorParams.push(`    this.${param.name}`)
    }
  })

  const constructorParamsStr = constructorParams.join(",\n")

  // Build the complete class
  return `class ${className} extends StatelessWidget {
${fieldDeclarations.join("\n")}

  const ${className}({
${constructorParamsStr},
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      // TODO: Implement widget tree
    );
  }
}`
}

function generateDefaultTemplate(componentName: string): string {
  return `class ${componentName} extends StatelessWidget {
  // Required parameters
  final String requiredParam1;
  final VoidCallback? onTap;

  // Optional parameters
  final String? optionalParam;
  final bool enabled;

  const ${componentName}({
    Key? key,
    required this.requiredParam1,
    this.onTap,
    this.optionalParam,
    this.enabled = true,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      // TODO: Implement widget tree
    );
  }
}`
}

export const DART_TYPES = [
  "String",
  "int",
  "double",
  "bool",
  "Widget",
  "VoidCallback",
  "Function",
  "Color",
  "EdgeInsets",
  "TextStyle",
  "IconData",
  "List<String>",
  "List<Widget>",
  "Map<String, dynamic>",
]
