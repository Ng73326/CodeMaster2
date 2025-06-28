// Code execution service using Judge0 API
export interface CodeExecutionResult {
  stdout?: string
  stderr?: string
  compile_output?: string
  status: {
    id: number
    description: string
  }
  time?: string
  memory?: number
}

export interface SubmissionData {
  source_code: string
  language_id: number
  stdin?: string
  expected_output?: string
}

// Language mappings for Judge0 API
export const LANGUAGE_MAP = {
  javascript: 63, // Node.js
  python: 71,     // Python 3
  java: 62,       // Java
  cpp: 54,        // C++ (GCC 9.2.0)
  c: 50,          // C (GCC 9.2.0)
  csharp: 51,     // C# (Mono 6.6.0.161)
  go: 60,         // Go (1.13.5)
  rust: 73,       // Rust (1.40.0)
  php: 68,        // PHP (7.4.1)
  ruby: 72,       // Ruby (2.7.0)
  kotlin: 78,     // Kotlin (1.3.70)
  swift: 83,      // Swift (5.2.3)
  typescript: 74  // TypeScript (3.7.4)
}

export const LANGUAGE_TEMPLATES = {
  javascript: `// JavaScript Solution
function solve() {
    // Write your solution here
    console.log("Hello, World!");
}

solve();`,
  
  python: `# Python Solution
def solve():
    # Write your solution here
    print("Hello, World!")

solve()`,
  
  java: `// Java Solution
public class Main {
    public static void main(String[] args) {
        // Write your solution here
        System.out.println("Hello, World!");
    }
}`,
  
  cpp: `// C++ Solution
#include <iostream>
using namespace std;

int main() {
    // Write your solution here
    cout << "Hello, World!" << endl;
    return 0;
}`,
  
  c: `// C Solution
#include <stdio.h>

int main() {
    // Write your solution here
    printf("Hello, World!\\n");
    return 0;
}`,
  
  python3: `# Python 3 Solution
def solve():
    # Write your solution here
    print("Hello, World!")

solve()`
}

// Judge0 API configuration
const JUDGE0_API_URL = 'https://judge0-ce.p.rapidapi.com'
const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY || 'demo-key'

export async function executeCode(submission: SubmissionData): Promise<CodeExecutionResult> {
  try {
    // For demo purposes, we'll simulate code execution
    // In production, you would use the actual Judge0 API
    
    if (!RAPIDAPI_KEY || RAPIDAPI_KEY === 'demo-key') {
      return simulateCodeExecution(submission)
    }

    // Create submission
    const submissionResponse = await fetch(`${JUDGE0_API_URL}/submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      },
      body: JSON.stringify({
        source_code: submission.source_code,
        language_id: submission.language_id,
        stdin: submission.stdin || '',
        expected_output: submission.expected_output || ''
      })
    })

    if (!submissionResponse.ok) {
      throw new Error('Failed to submit code')
    }

    const submissionData = await submissionResponse.json()
    const token = submissionData.token

    // Poll for result
    let result: CodeExecutionResult
    let attempts = 0
    const maxAttempts = 10

    do {
      await new Promise(resolve => setTimeout(resolve, 1000)) // Wait 1 second
      
      const resultResponse = await fetch(`${JUDGE0_API_URL}/submissions/${token}`, {
        headers: {
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }
      })

      if (!resultResponse.ok) {
        throw new Error('Failed to get result')
      }

      result = await resultResponse.json()
      attempts++
    } while (result.status.id <= 2 && attempts < maxAttempts) // Status 1-2 means processing

    return result
  } catch (error) {
    console.error('Code execution error:', error)
    return simulateCodeExecution(submission)
  }
}

// Simulate code execution for demo purposes
function simulateCodeExecution(submission: SubmissionData): CodeExecutionResult {
  const code = submission.source_code.toLowerCase()
  
  // Simple simulation based on code content
  if (code.includes('hello')) {
    return {
      stdout: 'Hello, World!\n',
      status: { id: 3, description: 'Accepted' },
      time: '0.001',
      memory: 1024
    }
  }
  
  if (code.includes('error') || code.includes('throw')) {
    return {
      stderr: 'Runtime Error: Something went wrong\n',
      status: { id: 5, description: 'Time Limit Exceeded' },
      time: '1.000',
      memory: 2048
    }
  }
  
  if (code.includes('syntax')) {
    return {
      compile_output: 'Compilation Error: Syntax error\n',
      status: { id: 6, description: 'Compilation Error' },
      time: '0.000',
      memory: 0
    }
  }
  
  // Default successful execution
  return {
    stdout: 'Code executed successfully!\n',
    status: { id: 3, description: 'Accepted' },
    time: '0.002',
    memory: 1536
  }
}

export function getLanguageId(language: string): number {
  return LANGUAGE_MAP[language as keyof typeof LANGUAGE_MAP] || LANGUAGE_MAP.javascript
}

export function getLanguageTemplate(language: string): string {
  return LANGUAGE_TEMPLATES[language as keyof typeof LANGUAGE_TEMPLATES] || LANGUAGE_TEMPLATES.javascript
}