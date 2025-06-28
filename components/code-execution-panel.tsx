"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CodeEditor } from "@/components/code-editor"
import { executeCode, getLanguageId, getLanguageTemplate, type CodeExecutionResult } from "@/lib/code-execution"
import { Play, Square, Loader2, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface CodeExecutionPanelProps {
  initialCode?: string
  initialLanguage?: string
  problemTitle?: string
  testCases?: Array<{
    input: string
    expectedOutput: string
    description?: string
  }>
}

export function CodeExecutionPanel({ 
  initialCode = "",
  initialLanguage = "javascript",
  problemTitle = "Code Problem",
  testCases = []
}: CodeExecutionPanelProps) {
  const [code, setCode] = useState(initialCode || getLanguageTemplate(initialLanguage))
  const [language, setLanguage] = useState(initialLanguage)
  const [customInput, setCustomInput] = useState("")
  const [isExecuting, setIsExecuting] = useState(false)
  const [executionResult, setExecutionResult] = useState<CodeExecutionResult | null>(null)
  const [testResults, setTestResults] = useState<Array<{
    passed: boolean
    input: string
    expectedOutput: string
    actualOutput: string
    description?: string
  }>>([])

  const languages = [
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
    { value: "c", label: "C" },
  ]

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage)
    setCode(getLanguageTemplate(newLanguage))
    setExecutionResult(null)
    setTestResults([])
  }

  const handleRunCode = async () => {
    if (!code.trim()) return

    setIsExecuting(true)
    setExecutionResult(null)

    try {
      const result = await executeCode({
        source_code: code,
        language_id: getLanguageId(language),
        stdin: customInput
      })

      setExecutionResult(result)
    } catch (error) {
      console.error('Execution error:', error)
      setExecutionResult({
        stderr: 'Failed to execute code. Please try again.',
        status: { id: 13, description: 'Internal Error' }
      })
    } finally {
      setIsExecuting(false)
    }
  }

  const handleRunTests = async () => {
    if (!code.trim() || testCases.length === 0) return

    setIsExecuting(true)
    setTestResults([])

    try {
      const results = []

      for (const testCase of testCases) {
        const result = await executeCode({
          source_code: code,
          language_id: getLanguageId(language),
          stdin: testCase.input,
          expected_output: testCase.expectedOutput
        })

        const actualOutput = result.stdout?.trim() || ''
        const expectedOutput = testCase.expectedOutput.trim()
        const passed = actualOutput === expectedOutput && result.status.id === 3

        results.push({
          passed,
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          actualOutput: actualOutput,
          description: testCase.description
        })
      }

      setTestResults(results)
    } catch (error) {
      console.error('Test execution error:', error)
    } finally {
      setIsExecuting(false)
    }
  }

  const getStatusIcon = (statusId: number) => {
    if (statusId === 3) return <CheckCircle className="h-4 w-4 text-green-500" />
    if (statusId >= 4 && statusId <= 12) return <XCircle className="h-4 w-4 text-red-500" />
    return <AlertCircle className="h-4 w-4 text-yellow-500" />
  }

  const getStatusColor = (statusId: number) => {
    if (statusId === 3) return "success"
    if (statusId >= 4 && statusId <= 12) return "destructive"
    return "secondary"
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{problemTitle}</h2>
        <div className="flex items-center gap-2">
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Code Editor */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Code Editor</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <CodeEditor
            defaultLanguage={language}
            defaultValue={code}
            onChange={setCode}
            height="400px"
          />
        </CardContent>
      </Card>

      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Custom Input</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Enter custom input for your code (optional)"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            rows={4}
          />
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button 
          onClick={handleRunCode} 
          disabled={isExecuting || !code.trim()}
          className="flex items-center gap-2"
        >
          {isExecuting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Play className="h-4 w-4" />
          )}
          Run Code
        </Button>

        {testCases.length > 0 && (
          <Button 
            onClick={handleRunTests} 
            disabled={isExecuting || !code.trim()}
            variant="outline"
            className="flex items-center gap-2"
          >
            {isExecuting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <CheckCircle className="h-4 w-4" />
            )}
            Run Tests ({testCases.length})
          </Button>
        )}
      </div>

      {/* Execution Result */}
      {executionResult && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              {getStatusIcon(executionResult.status.id)}
              Execution Result
              <Badge variant={getStatusColor(executionResult.status.id) as any}>
                {executionResult.status.description}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {executionResult.stdout && (
                <div>
                  <Label className="text-sm font-medium text-green-700 dark:text-green-400">
                    Output:
                  </Label>
                  <pre className="mt-1 p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-md text-sm overflow-x-auto">
                    {executionResult.stdout}
                  </pre>
                </div>
              )}

              {executionResult.stderr && (
                <div>
                  <Label className="text-sm font-medium text-red-700 dark:text-red-400">
                    Error:
                  </Label>
                  <pre className="mt-1 p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-md text-sm overflow-x-auto">
                    {executionResult.stderr}
                  </pre>
                </div>
              )}

              {executionResult.compile_output && (
                <div>
                  <Label className="text-sm font-medium text-yellow-700 dark:text-yellow-400">
                    Compilation Output:
                  </Label>
                  <pre className="mt-1 p-3 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-md text-sm overflow-x-auto">
                    {executionResult.compile_output}
                  </pre>
                </div>
              )}

              {executionResult.time && (
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span>Time: {executionResult.time}s</span>
                  {executionResult.memory && <span>Memory: {executionResult.memory} KB</span>}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Test Results */}
      {testResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Test Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {testResults.map((result, index) => (
                <div key={index} className="border rounded-md p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {result.passed ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    <span className="font-medium">
                      Test Case {index + 1}
                      {result.description && `: ${result.description}`}
                    </span>
                    <Badge variant={result.passed ? "success" : "destructive"}>
                      {result.passed ? "Passed" : "Failed"}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">Input:</Label>
                      <pre className="mt-1 p-2 bg-muted rounded text-xs overflow-x-auto">
                        {result.input || "(empty)"}
                      </pre>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">Expected:</Label>
                      <pre className="mt-1 p-2 bg-muted rounded text-xs overflow-x-auto">
                        {result.expectedOutput}
                      </pre>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">Actual:</Label>
                      <pre className={`mt-1 p-2 rounded text-xs overflow-x-auto ${
                        result.passed 
                          ? 'bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800' 
                          : 'bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800'
                      }`}>
                        {result.actualOutput || "(empty)"}
                      </pre>
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-4 p-3 bg-muted rounded-md">
                <div className="text-sm font-medium">
                  Summary: {testResults.filter(r => r.passed).length} / {testResults.length} tests passed
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}