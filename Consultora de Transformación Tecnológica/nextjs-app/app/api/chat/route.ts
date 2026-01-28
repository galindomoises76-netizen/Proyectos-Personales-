import { NextRequest, NextResponse } from 'next/server'
import { saveChatMessage } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { sessionId, message, userEmail } = await request.json()

    if (!message || !sessionId) {
      return NextResponse.json(
        { error: 'Message and sessionId are required' },
        { status: 400 }
      )
    }

    // Save user message
    await saveChatMessage({
      sessionId,
      message,
      sender: 'user',
      userEmail: userEmail || undefined,
    })

    // Generate bot response
    const botResponse = generateResponse(message.toLowerCase(), userEmail)

    // Save bot response
    await saveChatMessage({
      sessionId,
      message: botResponse,
      sender: 'bot',
    })

    return NextResponse.json({
      sessionId,
      message: botResponse,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function generateResponse(message: string, userEmail: string | null): string {
  // Check if email is needed
  if (!userEmail) {
    if (message.includes('email') || message.includes('contact') ||
      message.includes('details') || message.includes('more')) {
      return "I'd be happy to provide more detailed information! " +
        "Could you please provide your email address so we can continue our conversation?"
    }
  }

  // Service-related queries
  if (message.includes('service') || message.includes('offer') ||
    message.includes('what do you') || message.includes('qué ofrecen')) {
    return "We offer three main services:\n\n" +
      "1. **AI Training & Education**: Comprehensive training programs to help your team understand and leverage AI technologies.\n" +
      "2. **Process Automation**: Automate repetitive tasks and workflows to increase efficiency and reduce costs.\n" +
      "3. **Custom AI Solutions**: Tailored AI applications designed specifically for your business needs.\n\n" +
      "Would you like more details about any specific service?"
  }

  // How AI can help
  if (message.includes('how can ai help') || message.includes('cómo puede ayudar') ||
    message.includes('benefit') || message.includes('beneficio')) {
    return "AI can transform your business in several ways:\n\n" +
      "• **Automate repetitive tasks** - Free up your team for strategic work\n" +
      "• **Improve decision-making** - Data-driven insights for better choices\n" +
      "• **Enhance customer experience** - Personalized interactions and faster responses\n" +
      "• **Reduce costs** - Optimize operations and eliminate inefficiencies\n" +
      "• **Competitive advantage** - Stay ahead with cutting-edge technology\n\n" +
      "Would you like to discuss how AI could specifically benefit your industry?"
  }

  // Timeline queries
  if (message.includes('timeline') || message.includes('time') ||
    message.includes('how long') || message.includes('cuánto tiempo') ||
    message.includes('duración')) {
    return "Project timelines vary based on complexity:\n\n" +
      "• **AI Training Programs**: 2-4 weeks\n" +
      "• **Process Automation**: 4-12 weeks\n" +
      "• **Custom AI Solutions**: 8-24 weeks\n\n" +
      "We provide detailed timelines after understanding your specific requirements. " +
      "Would you like to schedule a consultation to discuss your project?"
  }

  // Pricing queries
  if (message.includes('price') || message.includes('cost') ||
    message.includes('pricing') || message.includes('precio') ||
    message.includes('costo')) {
    return "Our pricing is customized based on your specific needs and project scope. " +
      "We offer:\n\n" +
      "• **Transparent pricing** - No hidden fees\n" +
      "• **Flexible packages** - From training to full implementation\n" +
      "• **ROI-focused** - We ensure your investment delivers measurable results\n\n" +
      "To get an accurate quote, please fill out our quote request form or provide your email " +
      "and we'll send you a detailed pricing guide."
  }

  // Greeting
  if (message.includes('hello') || message.includes('hi') ||
    message.includes('hola') || message.includes('buenos días')) {
    return "Hello! I'm here to help you learn about our AI automation services. " +
      "How can I assist you today? You can ask about our services, how AI can help your business, " +
      "project timelines, or pricing."
  }

  // Default response
  return "Thank you for your question! I can help you with information about:\n\n" +
    "• Our services (AI Training, Process Automation, Custom Solutions)\n" +
    "• How AI can benefit your business\n" +
    "• Project timelines\n" +
    "• Pricing information\n\n" +
    "Feel free to ask me anything, or you can request a personalized quote through our form!"
}
