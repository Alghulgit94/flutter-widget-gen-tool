"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { generateMarkdown } from "@/lib/markdown-generator"
import type { ComponentData } from "@/lib/types"
import { FileText, Copy, Check } from "lucide-react"
import { useState, useEffect } from "react"

interface MarkdownPreviewProps {
  data: ComponentData | null
  allStepsComplete: boolean
  translations: any
}

export function MarkdownPreview({ data, allStepsComplete, translations }: MarkdownPreviewProps) {
  const markdown = data ? generateMarkdown(data) : ""
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!allStepsComplete) return

    try {
      await navigator.clipboard.writeText(markdown)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("[v0] Failed to copy:", err)
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!allStepsComplete && (e.ctrlKey || e.metaKey) && e.key === "c") {
        const selection = window.getSelection()
        const previewElement = document.getElementById("markdown-preview-content")
        if (selection && previewElement && previewElement.contains(selection.anchorNode)) {
          e.preventDefault()
          e.stopPropagation()
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown, true)
    return () => document.removeEventListener("keydown", handleKeyDown, true)
  }, [allStepsComplete])

  return (
    <Card className="p-6 bg-card border-border sticky top-6 max-h-[calc(100vh-8rem)] overflow-hidden flex flex-col">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground">{translations.preview.title}</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          disabled={!allStepsComplete}
          className="gap-2 bg-transparent"
          title={!allStepsComplete ? translations.preview.completeStepsToCopy : translations.preview.copyToClipboard}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              {translations.preview.copied}
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              {translations.preview.copy}
            </>
          )}
        </Button>
      </div>

      {!allStepsComplete && markdown && (
        <div className="mb-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
          <p className="text-xs text-amber-600 dark:text-amber-500">{translations.preview.completeStepsWarning}</p>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        <pre
          id="markdown-preview-content"
          className={`text-xs font-mono text-foreground whitespace-pre-wrap break-words bg-muted/30 p-4 rounded-lg ${
            !allStepsComplete ? "select-none" : ""
          }`}
        >
          {markdown || translations.preview.placeholder}
        </pre>
      </div>
    </Card>
  )
}
