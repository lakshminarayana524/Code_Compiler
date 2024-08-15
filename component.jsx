/**
 * v0 by Vercel.
 * @see https://v0.dev/t/JX2v3kBZL9y
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState } from "react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function Component() {
  const [theme, setTheme] = useState("light")
  const [code, setCode] = useState("")
  const [output, setOutput] = useState("")
  const [errors, setErrors] = useState("")
  const handleThemeChange = (value) => {
    setTheme(value)
  }
  const handleCodeChange = (value) => {
    setCode(value)
  }
  const handleCompile = () => {
    setTimeout(() => {
      setOutput("Compilation successful!\nOutput: Hello, World!")
      setErrors("Error: Undefined variable 'x'\nLine 12, Column 5")
    }, 2000)
  }
  return (
    <div className={`flex h-screen w-full ${theme === "dark" ? "dark" : ""}`}>
      <div className="flex-1 bg-background p-6">
        <div className="flex h-full flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Compiler</h1>
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <CodeIcon className="h-4 w-4" />
                    <span>C++</span>
                    <ChevronDownIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuItem>C</DropdownMenuItem>
                  <DropdownMenuItem>C++</DropdownMenuItem>
                  <DropdownMenuItem>Java</DropdownMenuItem>
                  <DropdownMenuItem>Python</DropdownMenuItem>
                  <DropdownMenuItem>Rust</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <SlidersVerticalIcon className="h-4 w-4" />
                    <span>Optimization</span>
                    <ChevronDownIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuItem>None</DropdownMenuItem>
                  <DropdownMenuItem>Low</DropdownMenuItem>
                  <DropdownMenuItem>Medium</DropdownMenuItem>
                  <DropdownMenuItem>High</DropdownMenuItem>
                  <DropdownMenuItem>Aggressive</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <SunMoonIcon className="h-4 w-4" />
                    <span>{theme === "light" ? "Light" : "Dark"}</span>
                    <ChevronDownIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuItem onSelect={() => handleThemeChange("light")}>Light</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => handleThemeChange("dark")}>Dark</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button onClick={handleCompile}>Compile</Button>
            </div>
          </div>
          <Textarea
            placeholder="Enter your code here..."
            className={`h-full resize-none rounded-md border border-input bg-background p-4 text-sm focus:outline-none focus:ring-1 ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
            value={code}
            onChange={(e) => handleCodeChange(e.target.value)}
          />
          <div className="flex gap-4">
            <div className="flex-1 rounded-md border border-input bg-background p-4">
              <h2 className="mb-2 text-lg font-bold">Output</h2>
              <pre
                className={`whitespace-pre-wrap break-words text-sm ${
                  theme === "dark" ? "text-green-400" : "text-green-800"
                }`}
              >
                {output}
              </pre>
            </div>
            <div className="flex-1 rounded-md border border-input bg-background p-4">
              <h2 className="mb-2 text-lg font-bold">Errors</h2>
              <pre
                className={`whitespace-pre-wrap break-words text-sm ${
                  theme === "dark" ? "text-red-400" : "text-red-800"
                }`}
              >
                {errors}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}


function CodeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}


function SlidersVerticalIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="4" y1="21" y2="14" />
      <line x1="4" x2="4" y1="10" y2="3" />
      <line x1="12" x2="12" y1="21" y2="12" />
      <line x1="12" x2="12" y1="8" y2="3" />
      <line x1="20" x2="20" y1="21" y2="16" />
      <line x1="20" x2="20" y1="12" y2="3" />
      <line x1="2" x2="6" y1="14" y2="14" />
      <line x1="10" x2="14" y1="8" y2="8" />
      <line x1="18" x2="22" y1="16" y2="16" />
    </svg>
  )
}


function SunIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  )
}


function SunMoonIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 8a2.83 2.83 0 0 0 4 4 4 4 0 1 1-4-4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.9 4.9 1.4 1.4" />
      <path d="m17.7 17.7 1.4 1.4" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.3 17.7-1.4 1.4" />
      <path d="m19.1 4.9-1.4 1.4" />
    </svg>
  )
}