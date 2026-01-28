import { promises as fs } from 'fs'
import { join } from 'path'

const dataDir = join(process.cwd(), 'data')
const chatFile = join(dataDir, 'chat.json')
const quotesFile = join(dataDir, 'quotes.json')

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.mkdir(dataDir, { recursive: true })
  } catch (error) {
    // Directory already exists or other error
  }
}

// Initialize data files
async function initFiles() {
  await ensureDataDir()
  
  try {
    await fs.access(chatFile)
  } catch {
    await fs.writeFile(chatFile, JSON.stringify([], null, 2))
  }
  
  try {
    await fs.access(quotesFile)
  } catch {
    await fs.writeFile(quotesFile, JSON.stringify([], null, 2))
  }
}

// Initialize on import
initFiles().catch(console.error)

interface ChatMessage {
  id: number
  sessionId: string
  message: string
  sender: 'user' | 'bot'
  timestamp: string
  userEmail?: string
}

interface QuoteRequest {
  id: number
  name: string
  company: string
  email: string
  phone: string
  industry?: string
  serviceType: string
  projectDescription: string
  budgetRange?: string
  createdAt: string
  processed: boolean
}

// Chat messages functions
export async function saveChatMessage(data: Omit<ChatMessage, 'id' | 'timestamp'>) {
  await ensureDataDir()
  const messages = await getChatMessages()
  const newMessage: ChatMessage = {
    id: messages.length > 0 ? Math.max(...messages.map(m => m.id)) + 1 : 1,
    ...data,
    timestamp: new Date().toISOString(),
  }
  messages.push(newMessage)
  await fs.writeFile(chatFile, JSON.stringify(messages, null, 2))
  return newMessage
}

export async function getChatMessages(sessionId?: string): Promise<ChatMessage[]> {
  await ensureDataDir()
  try {
    const content = await fs.readFile(chatFile, 'utf-8')
    const messages: ChatMessage[] = JSON.parse(content)
    if (sessionId) {
      return messages.filter(m => m.sessionId === sessionId).sort((a, b) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      )
    }
    return messages
  } catch {
    return []
  }
}

// Quote requests functions
export async function saveQuoteRequest(data: Omit<QuoteRequest, 'id' | 'createdAt' | 'processed'>) {
  await ensureDataDir()
  const quotes = await getQuoteRequests()
  const newQuote: QuoteRequest = {
    id: quotes.length > 0 ? Math.max(...quotes.map(q => q.id)) + 1 : 1,
    ...data,
    createdAt: new Date().toISOString(),
    processed: false,
  }
  quotes.push(newQuote)
  await fs.writeFile(quotesFile, JSON.stringify(quotes, null, 2))
  return newQuote
}

export async function getQuoteRequests(): Promise<QuoteRequest[]> {
  await ensureDataDir()
  try {
    const content = await fs.readFile(quotesFile, 'utf-8')
    return JSON.parse(content)
  } catch {
    return []
  }
}

export async function getQuoteRequest(id: number): Promise<QuoteRequest | null> {
  const quotes = await getQuoteRequests()
  return quotes.find(q => q.id === id) || null
}

// Database-like interface for compatibility
const db = {
  prepare: (query: string) => {
    return {
      run: async (...args: any[]) => {
        // Simple query parser for INSERT statements
        if (query.includes('INSERT INTO chat_messages')) {
          const sessionId = args[0]
          const message = args[1]
          const sender = args[2]
          const userEmail = args[3] || null
          await saveChatMessage({ sessionId, message, sender: sender as 'user' | 'bot', userEmail })
          return { lastInsertRowid: 1 }
        }
        if (query.includes('INSERT INTO quote_requests')) {
          const quote = await saveQuoteRequest({
            name: args[0],
            company: args[1],
            email: args[2],
            phone: args[3],
            industry: args[4] || undefined,
            serviceType: args[5],
            projectDescription: args[6],
            budgetRange: args[7] || undefined,
          })
          return { lastInsertRowid: quote.id }
        }
        return { lastInsertRowid: 0 }
      },
    }
  },
  exec: async () => {
    // Schema initialization - files are created on import
    await initFiles()
  },
}

export default db
