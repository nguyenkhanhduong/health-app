import { BrowserUseClient } from 'browser-use-sdk'
import ExcelJS from 'exceljs'
import { useEffect, useRef, useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { ScrollArea } from '#/components/ui/scroll-area'
import { cn } from '#/lib/utils'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}
const client = new BrowserUseClient({
  apiKey: 'bu_vp_zzw7bOJiTpuWCngv6acwm-F8TYJrk8jfuwkFnzaI', // Optional if BROWSER_USE_API_KEY is set
})

export const DemoCrawl = () => {
  // Load messages from localStorage or use default welcome message
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const savedMessages = localStorage.getItem('crawl-messages')
      if (savedMessages) {
        const parsed = JSON.parse(savedMessages)
        // Convert timestamp strings back to Date objects
        return parsed.map((msg: Message) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }))
      }
    } catch (error) {
      console.error('Error loading messages from localStorage:', error)
    }
    // Default welcome message
    return [
      {
        id: '1',
        role: 'assistant',
        content:
          "Hello! I'm your Web Crawling AI Assistant. I can help you extract data from websites, scrape content, analyze web pages, and more. What would you like to crawl today?",
        timestamp: new Date(),
      },
    ]
  })
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [crawledData, setCrawledData] = useState<Record<string, unknown>[] | null>(null)
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Save messages to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('crawl-messages', JSON.stringify(messages))
    } catch (error) {
      console.error('Error saving messages to localStorage:', error)
    }
  }, [messages])

  // Auto scroll to bottom when new message arrives
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // Function to export data to Excel
  const exportToExcel = async (
    data: Record<string, unknown>[],
    filename: string = 'crawled-data',
  ) => {
    try {
      console.log('Exporting data to Excel:', data)
      
      const workbook = new ExcelJS.Workbook()
      const worksheet = workbook.addWorksheet('Data')

      if (data.length === 0) {
        console.error('No data to export')
        return false
      }

      // Ensure data is properly structured
      if (!Array.isArray(data)) {
        console.error('Data is not an array:', data)
        return false
      }

      if (!data[0] || typeof data[0] !== 'object') {
        console.error('First item is not a valid object:', data[0])
        return false
      }

      // Get headers from first object
      const headers = Object.keys(data[0])
      console.log('Excel headers:', headers)

      // Add headers
      worksheet.addRow(headers)

      // Style headers
      worksheet.getRow(1).font = { bold: true, size: 12 }
      worksheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF4472C4' },
      }
      worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } }

      // Add data rows
      data.forEach((item, idx) => {
        const row = headers.map(header => item[header])
        console.log(`Row ${idx + 1}:`, row)
        worksheet.addRow(row)
      })

      // Auto-fit columns
      worksheet.columns.forEach(column => {
        let maxLength = 0
        column.eachCell?.({ includeEmpty: true }, cell => {
          const columnLength = cell.value ? cell.value.toString().length : 10
          if (columnLength > maxLength) {
            maxLength = columnLength
          }
        })
        column.width = maxLength < 10 ? 10 : maxLength + 2
      })

      // Generate buffer
      const buffer = await workbook.xlsx.writeBuffer()

      // Create blob and download
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${filename}-${new Date().getTime()}.xlsx`
      link.click()
      window.URL.revokeObjectURL(url)

      console.log('✅ Excel exported successfully')
      return true
    } catch (error) {
      console.error('Error exporting to Excel:', error)
      return false
    }
  }

  const handleSendMessage = async () => {
    if (!input.trim()) {
      return
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMessage])

    const userRequest = input
    setInput('')
    setIsTyping(true)

    try {
      // Create crawl task with detailed prompt
      const task = await client.tasks.createTask({
        llm: 'browser-use-llm',
        task: `Extract data for: "${input}"

🚨 ABSOLUTE REQUIREMENT - NO EXCEPTIONS 🚨
Your response MUST end with a JSON code block. This is MANDATORY.
If you don't include the JSON block, the task FAILS.

📋 RESPONSE STRUCTURE (FOLLOW EXACTLY):

Step 1: Brief description (1-2 sentences)
Step 2: ALWAYS add this JSON block with triple backticks:

[Your JSON array here]

❌ THESE RESPONSES ARE INVALID AND REJECTED:
- "Found 5 retailers from NRF Top 100 List..." (stops without JSON)
- Returning only text description
- Returning summary/statistics instead of specific items

✅ VALID RESPONSE EXAMPLE:
"Found 5 retailers from NRF Top 100 List, ranked by worldwide retail sales for 2024.

[JSON ARRAY WITH 5 SPECIFIC RETAILERS HERE]"

🎯 CRITICAL RULES:
1. If user asks "Top 5" → Return EXACTLY 5 items (not 1 summary)
2. Return SPECIFIC items (companies/products), NOT statistics/forecasts
3. EVERY response MUST include JSON code block with triple backticks
4. JSON must be VALID (use double quotes, proper syntax)

📝 FIELD NAMING STANDARDS:
- rank → "rank": 1
- Company name → "companyName": "Walmart"
- Sales/Revenue → "salesBillion": 568.70 or "revenueMillions": 1200
- Year → "year": 2025
- Date → "date": "2025-11-26" or "lastUpdatedAt": "2025-11-26T14:30:00+07:00"
- Location → "location": "Hanoi, Vietnam"
- Price → "priceVND": 85500000
- Growth → "salesGrowthPercent": 3.5

📚 COMPLETE EXAMPLES:

Query: "Top 5 retailers 2025"
Your response must be:

Found 5 retailers from NRF Top 100 List, ranked by worldwide retail sales for 2024.

JSON BLOCK (with triple backticks and "json" keyword):
[
  {"rank": 1, "companyName": "Walmart", "year": 2024, "usaRetailSalesBillion": 568.70, "worldwideRetailSalesBillion": 675.58},
  {"rank": 2, "companyName": "Amazon.com", "year": 2024, "usaRetailSalesBillion": 273.66, "worldwideRetailSalesBillion": 391.40},
  {"rank": 3, "companyName": "Costco Wholesale", "year": 2024, "usaRetailSalesBillion": 183.05, "worldwideRetailSalesBillion": 244.89},
  {"rank": 4, "companyName": "The Kroger Co.", "year": 2024, "usaRetailSalesBillion": 150.79, "worldwideRetailSalesBillion": 150.79},
  {"rank": 5, "companyName": "The Home Depot", "year": 2024, "usaRetailSalesBillion": 148.21, "worldwideRetailSalesBillion": 157.57}
]

Query: "Gold price today"
Your response must be:

Found 3 gold products from SJC with latest prices.

JSON BLOCK:
[
  {"goldType": "SJC Gold Bar 1 Tael", "buyPriceVND": 85500000, "sellPriceVND": 86000000, "location": "Hanoi", "lastUpdatedAt": "2025-11-26T14:30:00+07:00"},
  {"goldType": "SJC Gold Ring 24K", "buyPriceVND": 8400000, "sellPriceVND": 8500000, "location": "HCMC", "lastUpdatedAt": "2025-11-26T14:30:00+07:00"},
  {"goldType": "PNJ Gold Bar", "buyPriceVND": 85200000, "sellPriceVND": 85800000, "location": "Hanoi", "lastUpdatedAt": "2025-11-26T14:15:00+07:00"}
]

NOW EXTRACT FOR: "${input}"

⚠️ FINAL REMINDER:
- Your response MUST end with JSON code block using triple backticks
- If "Top X" requested, return EXACTLY X specific items
- Return SPECIFIC data (companies/products), NOT summaries/forecasts
- Use proper JSON syntax (double quotes, commas)
- Format: Description text, then JSON block with triple backticks`,
      })

      // Save task ID for stopping
      setCurrentTaskId(task.id)

      // Wait for task completion and get result
      const result = await task.complete()
      console.log('result', result.output)

      // Clear task ID after completion
      setCurrentTaskId(null)

      // Parse the output data from result
      let extractedData: Record<string, unknown>[] = []

      //   // Handle output files if available and download them
      //   if (result.outputFiles.length > 0) {
      //     for (const file of result.outputFiles) {
      //       try {
      //         // Get presigned URL for the file
      //         const fileResponse = await client.files.getTaskOutputFilePresignedUrl({
      //           task_id: task.id,
      //           file_id: file.id,
      //         })

      //         console.log('fileResponse:', fileResponse)

      //         // Download the file using the presigned URL
      //         // eslint-disable-next-line @typescript-eslint/no-explicit-any
      //         const fileUrl = fileResponse.downloadUrl
      //         if (fileUrl) {
      //           const response = await fetch(fileUrl)
      //           const blob = await response.blob()

      //           // Create download link
      //           const url = window.URL.createObjectURL(blob)
      //           const link = document.createElement('a')
      //           link.href = url
      //           link.download = file.fileName
      //           link.click()
      //           window.URL.revokeObjectURL(url)
      //         }
      //       } catch (fileError) {
      //         console.error('Error downloading file:', fileError)
      //       }
      //     }

      //     // Show message about downloaded files
      //     const fileMessage: Message = {
      //       id: Date.now().toString(),
      //       role: 'assistant',
      //       content: `📁 Downloaded ${result.outputFiles.length} file(s): ${result.outputFiles.map(f => f.fileName).join(', ')}`,
      //       timestamp: new Date(),
      //     }
      //     setMessages(prev => [...prev, fileMessage])
      //   }

      try {
        // Try to parse JSON from result.output
        if (result.output && typeof result.output === 'string') {
          let output = result.output

          // Replace escaped newlines and tabs with actual characters
          output = output.replace(/\\n/g, '\n').replace(/\\t/g, '\t')

          // Method 1: Extract JSON from ```json code blocks
          const jsonCodeBlockMatch = output.match(/```json\s*([\s\S]*?)\s*```/)
          if (jsonCodeBlockMatch) {
            try {
              let jsonContent = jsonCodeBlockMatch[1].trim()
              // Remove escape backslashes from quotes
              jsonContent = jsonContent.replace(/\\"/g, '"')
              extractedData = JSON.parse(jsonContent)
              console.log('Method 1: Extracted from ```json block')
            } catch (e) {
              console.error('Failed to parse JSON code block:', e)
            }
          }

          // Method 2: Extract JSON from ``` code blocks (without json keyword)
          if (extractedData.length === 0) {
            const codeBlockMatch = output.match(/```\s*([\s\S]*?)\s*```/)
            if (codeBlockMatch) {
              try {
                let content = codeBlockMatch[1].trim()
                if (content.startsWith('[') || content.startsWith('{')) {
                  // Remove escape backslashes from quotes
                  content = content.replace(/\\"/g, '"')
                  extractedData = JSON.parse(content)
                  console.log('Method 2: Extracted from ``` block')
                }
              } catch (e) {
                console.error('Failed to parse code block:', e)
              }
            }
          }

          // Method 3: Find any JSON array in the output (greedy match)
          if (extractedData.length === 0) {
            // Find the first [ and last ] to get the full array
            const firstBracket = output.indexOf('[')
            const lastBracket = output.lastIndexOf(']')
            if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
              try {
                let jsonStr = output.substring(firstBracket, lastBracket + 1)
                // Remove escape backslashes from quotes
                jsonStr = jsonStr.replace(/\\"/g, '"')
                extractedData = JSON.parse(jsonStr)
                console.log('Method 3: Extracted from bracket match')
              } catch (e) {
                console.error('Failed to parse JSON array:', e)
              }
            }
          }

          // Method 4: Try to parse CSV data
          if (extractedData.length === 0) {
            const csvData = output.trim()
            if (csvData.includes(',') && csvData.includes('\n')) {
              const lines = csvData.split('\n')
              if (lines.length > 1) {
                try {
                  // Get headers from first line
                  const headers = lines[0].split(',').map(h =>
                    h
                      .trim()
                      .replace(/[^a-zA-Z0-9\s]/g, '') // Remove special chars
                      .split(/\s+/)
                      .map((word, idx) =>
                        idx === 0
                          ? word.toLowerCase()
                          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
                      )
                      .join(''),
                  )

                  // Parse data rows
                  extractedData = lines
                    .slice(1)
                    .filter(line => line.trim())
                    .map(line => {
                      const values = line.split(',').map(v => {
                        const cleaned = v.trim().replace(/,/g, '')
                        // Try to convert to number if possible
                        const num = parseFloat(cleaned)
                        return isNaN(num) ? cleaned : num
                      })

                      const obj: Record<string, unknown> = {}
                      headers.forEach((header, idx) => {
                        if (idx < values.length) {
                          obj[header] = values[idx]
                        }
                      })
                      return obj
                    })
                  console.log('Method 4: Extracted from CSV')
                } catch (e) {
                  console.error('Failed to parse CSV:', e)
                }
              }
            }
          }
        } else if (Array.isArray(result.output)) {
          extractedData = result.output
          console.log('Output is already an array')
        }
      } catch (parseError) {
        console.error('Error parsing result:', parseError)
      }

      // Log extracted data for debugging
      if (extractedData.length > 0) {
        console.log('Successfully extracted data:', extractedData)
      } else {
        console.log('No data extracted from output:', result.output)
        
        // Fallback: If AI only returned text without JSON, create a simple object
        if (result.output && typeof result.output === 'string' && result.output.length > 0) {
          const fallbackData: Record<string, unknown> = {
            rawOutput: result.output,
            query: userRequest,
            extractedAt: new Date().toISOString(),
            note: 'AI did not return structured JSON. This is the raw text response.',
          }
          extractedData = [fallbackData]
          console.log('Created fallback data object')
        }
      }

      // Store the crawled data
      setCrawledData(extractedData.length > 0 ? extractedData : null)

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          extractedData.length > 0
            ? `✅ Task completed successfully! 

I've extracted ${extractedData.length} items from: "${userRequest}"

Data preview:
${JSON.stringify(extractedData.slice(0, 3), null, 2)}${extractedData.length > 3 ? '\n... and more' : ''}

Task ID: ${task.id || 'pending'}

Click the "Export to Excel" button below to download the data.`
            : `✅ Task completed! 

Result: ${result.output || 'No structured data found'}

Task ID: ${task.id || 'pending'}`,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    } catch (error) {
      console.error('Error creating task:', error)
      setCurrentTaskId(null) // Clear task ID on error
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `❌ Sorry, I encountered an error while processing your request. Please try again or rephrase your question.

Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorMessage])
      setIsTyping(false)
    }
  }

  const handleStopTask = async () => {
    if (!currentTaskId) {
      return
    }

    try {
      await client.tasks.updateTask({ task_id: currentTaskId, action: 'stop' })
      setCurrentTaskId(null)
      setIsTyping(false)

      const stopMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: '⏹️ Task stopped by user.',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, stopMessage])
    } catch (error) {
      console.error('Error stopping task:', error)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleClearChat = () => {
    const confirmClear = window.confirm('Are you sure you want to clear all messages?')
    if (confirmClear) {
      const defaultMessage: Message = {
        id: '1',
        role: 'assistant',
        content:
          "Hello! I'm your Web Crawling AI Assistant. I can help you extract data from websites, scrape content, analyze web pages, and more. What would you like to crawl today?",
        timestamp: new Date(),
      }
      setMessages([defaultMessage])
      setCrawledData(null)
      localStorage.removeItem('crawl-messages')
    }
  }

  return (
    <div className='flex h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950'>
      {/* Sidebar */}
      <div className='flex w-64 flex-col border-r border-slate-200 bg-white/50 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/50'>
        <div className='border-b border-slate-200 p-4 dark:border-slate-800'>
          <Button className='w-full justify-start gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg hover:from-blue-700 hover:to-cyan-700'>
            <svg
              className='h-5 w-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 4v16m8-8H4'
              />
            </svg>
            New Crawl Session
          </Button>
        </div>

        <ScrollArea className='flex-1 p-2'>
          <div className='space-y-1'>
            {[{ title: 'Crawld data', time: 'Today' }].map((chat, idx) => (
              <div
                key={idx}
                className={cn(
                  'cursor-pointer rounded-lg px-3 py-2.5 transition-all duration-200',
                  'hover:bg-slate-100 dark:hover:bg-slate-800',
                  idx === 0 && 'bg-slate-100 dark:bg-slate-800',
                )}
              >
                <div className='flex items-start gap-2'>
                  <svg
                    className='mt-0.5 h-4 w-4 flex-shrink-0 text-slate-500 dark:text-slate-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
                    />
                  </svg>
                  <div className='min-w-0 flex-1'>
                    <p className='truncate text-sm font-medium text-slate-900 dark:text-slate-100'>
                      {chat.title}
                    </p>
                    <p className='text-xs text-slate-500 dark:text-slate-400'>{chat.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className='space-y-2 border-t border-slate-200 p-4 dark:border-slate-800'>
          <div className='flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-slate-100 dark:hover:bg-slate-800'>
            <Avatar className='h-8 w-8 ring-2 ring-slate-200 dark:ring-slate-700'>
              <AvatarImage src='https://github.com/shadcn.png' />
              <AvatarFallback className='bg-gradient-to-br from-blue-500 to-cyan-500 text-sm text-white'>
                U
              </AvatarFallback>
            </Avatar>
            <div className='min-w-0 flex-1'>
              <p className='truncate text-sm font-medium text-slate-900 dark:text-slate-100'>
                User Name
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className='flex flex-1 flex-col'>
        {/* Header */}
        <div className='flex h-14 items-center justify-between border-b border-slate-200 bg-white/80 px-6 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80'>
          <div className='flex items-center gap-3'>
            <div className='h-2 w-2 animate-pulse rounded-full bg-green-500'></div>
            <h1 className='bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-lg font-semibold text-transparent dark:from-white dark:to-slate-300'>
              Web Crawler AI
            </h1>
          </div>
          <div className='flex items-center gap-2'>
            <Button
              onClick={handleClearChat}
              variant='ghost'
              size='sm'
              className='hover:bg-slate-100 dark:hover:bg-slate-800 text-sm'
              title='Clear chat history'
            >
              <svg
                className='h-4 w-4 mr-1'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                />
              </svg>
              Clear
            </Button>
            <Button
              variant='ghost'
              size='icon'
              className='hover:bg-slate-100 dark:hover:bg-slate-800'
            >
              <svg
                className='h-5 w-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z'
                />
              </svg>
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className='flex-1'>
          <div className='mx-auto max-w-4xl space-y-6 px-6 py-8'>
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={cn(
                  'animate-in fade-in slide-in-from-bottom-4 flex gap-4 duration-500',
                  message.role === 'user' ? 'justify-end' : 'justify-start',
                )}
              >
                {message.role === 'assistant' && (
                  <Avatar className='mt-1 h-10 w-10 ring-2 ring-blue-100 dark:ring-blue-900'>
                    <AvatarFallback className='bg-gradient-to-br from-blue-600 to-cyan-600 text-white'>
                      <svg
                        className='h-5 w-5'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path d='M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' />
                      </svg>
                    </AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={cn(
                    'flex max-w-[85%] flex-col gap-2',
                    message.role === 'user' && 'items-end',
                  )}
                >
                  <div
                    className={cn(
                      'rounded-2xl px-5 py-3 shadow-sm',
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-blue-500/20'
                        : 'border border-slate-200 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100',
                    )}
                  >
                    <p className='text-[15px] leading-relaxed whitespace-pre-wrap'>
                      {message.content}
                    </p>

                    {/* Export button - only show for last assistant message with data */}
                    {message.role === 'assistant' &&
                      crawledData &&
                      crawledData.length > 0 &&
                      index === messages.length - 1 && (
                        <Button
                          onClick={async () => {
                            const success = await exportToExcel(crawledData, 'crawled-data')
                            if (success) {
                              const successMsg: Message = {
                                id: Date.now().toString(),
                                role: 'assistant',
                                content: '✅ Excel file downloaded successfully!',
                                timestamp: new Date(),
                              }
                              setMessages(prev => [...prev, successMsg])
                            } else {
                              const errorMsg: Message = {
                                id: Date.now().toString(),
                                role: 'assistant',
                                content: '❌ Failed to export Excel file. Please try again.',
                                timestamp: new Date(),
                              }
                              setMessages(prev => [...prev, errorMsg])
                            }
                          }}
                          className='mt-3 w-full bg-green-600 text-white hover:bg-green-700'
                        >
                          <svg
                            className='mr-2 h-4 w-4'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                            />
                          </svg>
                          Export to Excel ({crawledData.length} items)
                        </Button>
                      )}
                  </div>
                  <span className='px-1 text-xs text-slate-500 dark:text-slate-400'>
                    {message.timestamp.toLocaleTimeString('vi-VN', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>

                {message.role === 'user' && (
                  <Avatar className='mt-1 h-10 w-10 ring-2 ring-slate-200 dark:ring-slate-700'>
                    <AvatarImage src='https://github.com/shadcn.png' />
                    <AvatarFallback className='bg-gradient-to-br from-slate-600 to-slate-800 text-white'>
                      U
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isTyping && (
              <div className='animate-in fade-in slide-in-from-bottom-4 flex gap-4 duration-300'>
                <Avatar className='h-10 w-10 ring-2 ring-blue-100 dark:ring-blue-900'>
                  <AvatarFallback className='bg-gradient-to-br from-blue-600 to-cyan-600 text-white'>
                    <svg
                      className='h-5 w-5'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path d='M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' />
                    </svg>
                  </AvatarFallback>
                </Avatar>
                <div className='rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm dark:border-slate-700 dark:bg-slate-800'>
                  <div className='flex gap-1.5'>
                    <div className='h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]'></div>
                    <div className='h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]'></div>
                    <div className='h-2 w-2 animate-bounce rounded-full bg-slate-400'></div>
                  </div>
                </div>
              </div>
            )}
            {/* Invisible element at the end for auto-scroll */}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className='border-t border-slate-200 bg-white/80 p-6 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80'>
          <div className='mx-auto max-w-4xl'>
            <div className='relative flex items-end gap-3'>
              <div className='relative flex-1'>
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder='Enter URL or describe what you want to crawl...'
                  className='resize-none rounded-2xl border-slate-300 bg-white py-6 pr-12 text-[15px] shadow-sm focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-slate-700 dark:bg-slate-800'
                  disabled={isTyping}
                />
                <Button
                  variant='ghost'
                  size='icon'
                  className='absolute right-2 bottom-2 hover:bg-slate-100 dark:hover:bg-slate-700'
                >
                  <svg
                    className='h-5 w-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13'
                    />
                  </svg>
                </Button>
              </div>

              <Button
                onClick={handleSendMessage}
                disabled={!input.trim() || isTyping}
                size='icon'
                className='h-12 w-12 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg shadow-blue-500/20 hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50'
              >
                <svg
                  className='h-5 w-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
                  />
                </svg>
              </Button>

              {isTyping && currentTaskId && (
                <Button
                  onClick={handleStopTask}
                  size='icon'
                  variant='destructive'
                  className='h-12 w-12 rounded-2xl shadow-lg'
                  title='Stop crawling'
                >
                  <svg
                    className='h-5 w-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </Button>
              )}
            </div>

            <p className='mt-3 text-center text-xs text-slate-500 dark:text-slate-400'>
              Always respect robots.txt and website terms of service when crawling.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
