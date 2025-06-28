"use client"

import { useRef, useEffect, useState } from "react"
import Editor from "@monaco-editor/react"
import { useTheme } from "next-themes"

interface CodeEditorProps {
  defaultLanguage?: string
  defaultValue?: string
  onChange?: (value: string) => void
  height?: string
  readOnly?: boolean
}

export function CodeEditor({ 
  defaultLanguage = "javascript", 
  defaultValue = "", 
  onChange,
  height = "400px",
  readOnly = false
}: CodeEditorProps) {
  const editorRef = useRef<any>(null)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor
    
    // Configure editor options
    editor.updateOptions({
      fontSize: 14,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      tabSize: 2,
      insertSpaces: true,
      wordWrap: 'on',
      lineNumbers: 'on',
      glyphMargin: false,
      folding: false,
      lineDecorationsWidth: 10,
      lineNumbersMinChars: 3,
      readOnly: readOnly
    })

    // Set up auto-completion and IntelliSense
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true)
    monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true)
  }

  function handleEditorChange(value: string | undefined) {
    if (onChange && value !== undefined) {
      onChange(value)
    }
  }

  if (!mounted) {
    return (
      <div 
        className="w-full border rounded-md bg-muted flex items-center justify-center"
        style={{ height }}
      >
        <div className="text-muted-foreground">Loading editor...</div>
      </div>
    )
  }

  return (
    <div className="w-full border rounded-md overflow-hidden">
      <Editor
        height={height}
        defaultLanguage={defaultLanguage}
        defaultValue={defaultValue}
        theme={theme === 'dark' ? 'vs-dark' : 'light'}
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          insertSpaces: true,
          wordWrap: 'on',
          lineNumbers: 'on',
          glyphMargin: false,
          folding: false,
          lineDecorationsWidth: 10,
          lineNumbersMinChars: 3,
          readOnly: readOnly,
          contextmenu: false,
          selectOnLineNumbers: true,
          roundedSelection: false,
          cursorStyle: 'line',
          automaticLayout: true,
        }}
      />
    </div>
  )
}