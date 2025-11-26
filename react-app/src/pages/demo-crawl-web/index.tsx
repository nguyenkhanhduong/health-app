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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content:
        "Hello! I'm your Web Crawling AI Assistant. I can help you extract data from websites, scrape content, analyze web pages, and more. What would you like to crawl today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [crawledData, setCrawledData] = useState<Record<string, unknown>[] | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

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
      const workbook = new ExcelJS.Workbook()
      const worksheet = workbook.addWorksheet('Data')

      if (data.length === 0) {
        return false
      }

      // Get headers from first object
      const headers = Object.keys(data[0])

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
      data.forEach(item => {
        const row = headers.map(header => item[header])
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
        task: `You are a professional web data extraction specialist. Today is November 26, 2025.

USER REQUEST: "${input}"

CRITICAL REQUIREMENT: Extract REAL-TIME, COMPLETE, and DETAILED data with FULL context.

STEP 1: UNDERSTAND WHAT USER REALLY WANTS
Analyze the request to determine:
- DOMAIN: What category? (prices, news, weather, products, stocks, sports, etc.)
- TIME SENSITIVITY: Do they need LATEST/CURRENT data? (default: YES for most queries)
- LOCATION: What region/country? (infer from language/context if not stated)
- COMPLETENESS: What details make the data USEFUL and ACTIONABLE?

STEP 2: FIND THE MOST CURRENT & RELIABLE SOURCE
- For prices/market data: Use official sources, update within the last FEW HOURS
- For news: Use major news sites, published within last 24 hours
- For products: Use verified sellers with real-time inventory
- VERIFY the data timestamp on the source website
- Look for "Last updated" or "As of [time]" indicators

STEP 3: EXTRACT COMPLETE DETAILS - NO SHORTCUTS

MANDATORY FIELDS FOR ALL DATA:
✓ Exact timestamp with hours:minutes (e.g., "2025-11-26T14:30:00+07:00")
✓ Clear descriptions/names (be SPECIFIC - don't just say "Gold", say "SJC Gold Ring 24K")
✓ Full location/region info
✓ Source URL or source name
✓ All relevant categories/types/variants

DOMAIN-SPECIFIC REQUIREMENTS:

For PRICES (gold, stocks, currency, commodities):
✓ Item TYPE/CATEGORY (e.g., "SJC Gold Bar 1 Tael", "Gold Ring 24K", "Gold Necklace 18K")
✓ UNIT/SIZE (gram, tael, ounce, piece, kilogram)
✓ BUY and SELL prices (both if available)
✓ Currency clearly stated
✓ Company/Store name
✓ City/Location (not just "Vietnam" - be specific: "Hanoi", "HCMC")
✓ EXACT update time (with hour and minute)
✓ Previous price or change% if available
✓ Market trend (increasing/decreasing/stable)

For PRODUCTS/E-COMMERCE:
✓ Full product name with model/variant
✓ Brand and seller name
✓ ALL price tiers (regular price, sale price, member price)
✓ Stock status (in stock, low stock, out of stock, quantity)
✓ Shipping info (free shipping, days to deliver)
✓ Ratings and review count
✓ Product variants (color, size, capacity)
✓ Warranty info

For NEWS/ARTICLES:
✓ Full headline
✓ Category and subcategory
✓ Publication name and author
✓ EXACT publish timestamp (with time)
✓ Article summary (2-3 sentences)
✓ View count, engagement metrics
✓ Tags/keywords
✓ Article URL

For WEATHER:
✓ Specific location (city + district if possible)
✓ Current conditions + hourly forecast
✓ Temperature (both Celsius and Fahrenheit)
✓ "Feels like" temperature
✓ Humidity, wind speed, UV index
✓ Rain probability
✓ Air quality index
✓ Timestamp of forecast

For SPORTS/EVENTS:
✓ Event name and league/competition
✓ Teams/players involved
✓ Exact date and time (with timezone)
✓ Location/venue
✓ Current score or result
✓ Status (live, upcoming, finished)
✓ Statistics if available

STEP 4: STRUCTURE DATA WITH MAXIMUM DETAIL

Property naming rules:
- Be DESCRIPTIVE: "sjcGoldBar1TaelBuyPrice" not just "price"
- Include UNITS: "pricePerGramVND", "temperatureCelsius"
- Include CONTEXT: "lastUpdatedAt", "publishedDateTime", "asOfTime"
- Use camelCase consistently

Example for GOLD PRICES (what user expects):
[
  {
    "goldType": "SJC Gold Bar",
    "unit": "1 Tael (37.5g)",
    "company": "SJC - Saigon Jewelry Company",
    "location": "Hanoi",
    "region": "Vietnam",
    "buyPriceVND": 85500000,
    "sellPriceVND": 86000000,
    "pricePerGramVND": 2280000,
    "previousDayBuyPriceVND": 85200000,
    "changeVND": 300000,
    "changePercentage": 0.35,
    "trend": "increasing",
    "lastUpdatedAt": "2025-11-26T14:30:00+07:00",
    "updateFrequency": "Hourly",
    "dataSource": "SJC Official Website",
    "sourceUrl": "https://sjc.com.vn",
    "isOfficialPrice": true,
    "notes": "Prices may vary by location"
  },
  {
    "goldType": "Gold Ring 24K",
    "unit": "1 Chi (3.75g)",
    "company": "PNJ - Phu Nhuan Jewelry",
    "location": "Ho Chi Minh City",
    "region": "Vietnam",
    "buyPriceVND": 8400000,
    "sellPriceVND": 8500000,
    "pricePerGramVND": 2240000,
    "lastUpdatedAt": "2025-11-26T14:15:00+07:00",
    "dataSource": "PNJ Official Website",
    "isOfficialPrice": true
  }
]

STEP 5: QUALITY CHECKS BEFORE RETURNING

Ask yourself:
1. Is the timestamp RECENT and SPECIFIC (with hours:minutes)?
2. Are ALL categories/types/variants included?
3. Is location SPECIFIC (city/store level, not just country)?
4. Are prices/numbers CURRENT (not from weeks ago)?
5. Is the data COMPLETE (no major missing fields)?
6. Would I be satisfied with this data if I asked the question?
7. Can the user take ACTION with this data?

❌ BAD DATA:
- Generic timestamp "2025-11-26T00:00:00Z" (no time!)
- Vague names "Gold Bar" (which type? which size?)
- Only country "Vietnam" (which city? which store?)
- Missing prices or incomplete info

✅ GOOD DATA:
- Specific time "2025-11-26T14:30:00+07:00"
- Clear name "SJC Gold Bar 1 Tael 99.99%"
- Full location "Hanoi, Vietnam - SJC Main Branch"
- Complete prices with context

STEP 6: FINAL OUTPUT

Provide a brief summary explaining what you found, then:

\`\`\`json
[
  { your detailed, complete, up-to-date data here }
]
\`\`\`

REMEMBER: 
- User wants CURRENT data (with recent timestamps)
- User wants COMPLETE details (all variants, all locations)
- User wants ACTIONABLE info (enough detail to make decisions)
- Generic or incomplete data is USELESS
- When in doubt, include MORE detail, not less`,
      })

      // Wait for task completion and get result
      const result = await task.complete()
      console.log('result', result.output)

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
          // First, try to extract JSON from code blocks
          const jsonCodeBlockMatch = result.output.match(/```json\s*([\s\S]*?)\s*```/)
          if (jsonCodeBlockMatch) {
            extractedData = JSON.parse(jsonCodeBlockMatch[1])
          } else {
            // Try to find any JSON array in the output
            const jsonMatch = result.output.match(/\[[\s\S]*\]/)
            if (jsonMatch) {
              extractedData = JSON.parse(jsonMatch[0])
            } else {
              // Try to parse CSV data
              const csvData = result.output.trim()
              if (csvData.includes(',') && csvData.includes('\n')) {
                const lines = csvData.split('\n')
                if (lines.length > 1) {
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
                }
              }
            }
          }
        } else if (Array.isArray(result.output)) {
          extractedData = result.output
        }
      } catch (parseError) {
        console.error('Error parsing result:', parseError)
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
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
            {messages.map(message => (
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

                    {/* Export button for assistant messages with data */}
                    {message.role === 'assistant' && crawledData && crawledData.length > 0 && (
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
