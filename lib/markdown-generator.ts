import type { ComponentData } from "./types"

export function generateMarkdown(data: ComponentData): string {
  const componentName = data.componentName || "[Component Name]"

  return `# Create ${componentName} Component for Tobati App

## Context
I need to implement the ${componentName} component for the Tobati app following our established design system.

## Design System References
Before implementing, review these files:
- \`style_guides/STYLE_GUIDE.md\` - Master style guide and design principles
- \`lib/core/design_system/app_colors.dart\` - Color tokens
- \`lib/core/design_system/app_typography.dart\` - Typography system
- \`lib/core/design_system/app_dimensions.dart\` - Spacing and sizing
- \`lib/core/design_system/app_animations.dart\` - Animation standards
- \`lib/core/design_system/app_icons.dart\` - Icon system
- \`lib/core/design_system/app_theme.dart\` - Theme configuration
- \`lib/core/design_system/theme_provider.dart\` - Theme state management

## Component Specification

### Component Name
\`${componentName}\`

### Component Type
${data.componentType.map((type) => `- [x] ${type}`).join("\n") || "- [ ] Not specified"}

### Description
${data.description || "[Brief description of what this component does and where it's used in the app]"}

### Visual Reference
${data.visualReference || "[Describe the component or provide Figma link/screenshot]"}

### Variants/States
List all variants this component needs to support:
${data.variants.map((variant) => `- [x] ${variant}`).join("\n") || "- [ ] Default"}

### Design Specifications

#### Colors
Specify which colors from \`app_colors.dart\` to use for each element:
- Background: ${data.colors.background || "AppColors.surface"}
- Text: ${data.colors.text || "AppColors.onSurface"}
- Border: ${data.colors.border || "AppColors.outline"}
- Icons: ${data.colors.icons || "AppColors.primary"}
- State colors: ${data.colors.stateColors || "specify from design system"}

Note: Must work in both light and dark themes

#### Typography
Specify which text styles from \`app_typography.dart\`:
- Primary text: ${data.typography.primaryText || "AppTypography.[style]"}
- Secondary text: ${data.typography.secondaryText || "AppTypography.[style]"}
- Labels: ${data.typography.labels || "AppTypography.[style]"}
- Other: ${data.typography.other || "specify"}

#### Dimensions & Spacing
Specify dimensions from \`app_dimensions.dart\`:
- Height: ${data.dimensions.height || "AppDimensions.[size] or specific value"}
- Width: ${data.dimensions.width || "full-width, fixed, or wrap-content"}
- Padding: ${data.dimensions.padding || "AppDimensions.[padding]"}
- Margin: ${data.dimensions.margin || "AppDimensions.[margin]"}
- Border radius: ${data.dimensions.borderRadius || "AppDimensions.[radius]"}
- Border width: ${data.dimensions.borderWidth || "AppDimensions.[borderWidth]"}
- Icon size: ${data.dimensions.iconSize || "AppDimensions.[iconSize]"}

#### Icons
${
  data.icons.iconName
    ? `- Icon name: ${data.icons.iconName}
- Icon position: ${data.icons.iconPosition}
- Icon color: ${data.icons.iconColor}`
    : "If using icons, specify from `app_icons.dart`"
}

#### Animations
${
  data.animations.animationType
    ? `- Animation type: ${data.animations.animationType}
- Duration: ${data.animations.duration}
- Curve: ${data.animations.curve}
- Trigger: ${data.animations.trigger}`
    : "If component has animations, specify from `app_animations.dart`"
}

### Component Props/Parameters
Define the component API:
\`\`\`dart
${
  data.componentAPI ||
  `class ${componentName} extends StatelessWidget {
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
}`
}
\`\`\`

### Behavior & Interactions
${data.behavior || "Describe how the component should behave:\n- What happens on tap/press?\n- How does it respond to user input?\n- Does it have internal state or is it stateless?\n- Any validation logic?\n- Keyboard interactions?\n- Gesture support (if mobile)?"}

### Responsive Behavior
${data.responsiveBehavior || "- Does size adapt to screen size?\n- Different layouts for different breakpoints?\n- Text overflow handling?"}

### Accessibility Requirements
${data.accessibility.map((req) => `- ${req}`).join("\n") || "- Semantic labels for screen readers\n- Minimum touch target size (48x48dp for mobile)\n- Focus indicators\n- Color contrast requirements (WCAG AA minimum)\n- Keyboard navigation support\n- Screen reader announcements for state changes"}

### State Management
- Does this component need a RIVERPOD provider? ${data.stateManagement.needsProvider ? "Yes" : "No"}
${
  data.stateManagement.needsProvider
    ? `- Provider structure: ${data.stateManagement.providerStructure || "Specify the provider structure"}
- Consumes existing providers: ${data.stateManagement.consumesProviders || "List providers"}`
    : ""
}

### Validation (if applicable)
${
  data.validation.rules
    ? `- Validation rules: ${data.validation.rules}
- When validation occurs: ${data.validation.timing}
- Error message handling: ${data.validation.errorHandling}
- Success state handling: ${data.validation.successHandling}`
    : "- Not applicable"
}

## Implementation Requirements

### File Location
Create the component at:
\`\`\`
${data.fileLocation || "lib/core/design_system/components/[category]/[component_name].dart"}
\`\`\`

Where \`[category]\` is one of: buttons, inputs, cards, navigation, overlays, feedback, etc.

### Code Structure
The implementation should include:
1. **Component class** - Main widget implementation
2. **Documentation** - Comprehensive dartdoc comments
3. **Const constructor** - For performance
4. **Proper typing** - Strong typing for all parameters
5. **Theme awareness** - Use \`Theme.of(context)\` to access colors
6. **Null safety** - Handle nullable parameters properly

### Code Quality Standards
- Follow Flutter best practices
- Use composition over inheritance
- Make components reusable and flexible
- Avoid hardcoded values (use design system tokens)
- Keep components focused (single responsibility)
- Add const constructors where possible
- Properly dispose controllers/listeners

### Documentation
Add dartdoc comments including:
\`\`\`dart
/// Brief description of the component
///
/// Longer description explaining when and how to use this component.
///
/// Example:
/// \`\`\`dart
/// ${componentName}(
///   param1: 'value',
///   onTap: () => print('tapped'),
/// )
/// \`\`\`
///
/// See also:
///  * [RelatedComponent], which does something related
class ${componentName} extends StatelessWidget {
  /// Description of this parameter
  final String param1;
  
  // ... rest of the component
}
\`\`\`

## Deliverables

Please provide:
1. ✅ Complete component implementation dart file
2. ✅ Detailed md file with all component description understandable for AI AGENTS
3. ✅ Dartdoc documentation
4. ✅ Usage example (code snippet)

## Validation Checklist

After implementation, verify:
${data.validationChecklist.map((item) => `- [x] ${item}`).join("\n") || "- [ ] Uses ONLY colors from `app_colors.dart` (no hardcoded colors)\n- [ ] Uses ONLY typography from `app_typography.dart` (no hardcoded text styles)\n- [ ] Uses ONLY dimensions from `app_dimensions.dart` (no magic numbers)\n- [ ] Uses icons from `app_icons.dart` if applicable\n- [ ] Uses animations from `app_animations.dart` if applicable\n- [ ] Works correctly in both light and dark themes\n- [ ] Follows naming conventions from STYLE_GUIDE.md\n- [ ] Meets accessibility standards\n- [ ] Has comprehensive dartdoc comments\n- [ ] Includes usage example\n- [ ] Handles all specified states/variants\n- [ ] Is properly typed with null safety\n- [ ] Uses const constructors where possible\n- [ ] No hardcoded strings (if text should be localized)"}

## Additional Notes
${data.additionalNotes || "[Any additional context, edge cases, or special requirements]"}

---

**Implementation Instructions:**
1. Read and understand the STYLE_GUIDE.md thoroughly
2. Review all design system files to understand available tokens
3. Implement the component following ALL specifications above
4. Ensure the component is flexible and reusable
5. Test in both light and dark themes
6. Provide clear usage examples`
}
