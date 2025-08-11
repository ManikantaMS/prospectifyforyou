import { NextRequest, NextResponse } from 'next/server'
import { DemographicService } from '@/lib/demographic-service'

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'

interface GeminiRequest {
  message: string
  includeDataContext?: boolean
  cityContext?: string
  countryContext?: string
  isHomepage?: boolean
  conversationSummary?: string
  userName?: string
  userRole?: 'admin' | 'user'
  userCompany?: string
  actionType?: string
  enhanced?: boolean
  contextualPrompt?: string
}

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string
      }>
    }
  }>
}

export async function POST(request: NextRequest) {
  try {
    const { 
      message, 
      includeDataContext = true, 
      cityContext, 
      countryContext, 
      isHomepage = false,
      conversationSummary,
      userName,
      userRole = 'user',
      userCompany,
      actionType,
      enhanced = false,
      contextualPrompt
    }: GeminiRequest = await request.json()
    
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    // Trim input length to save tokens
    const trimmedMessage = message.slice(0, 300)

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'Gemini API key not configured' }, { status: 500 })
    }

    let contextData = ''
    
    // Fetch live demographic data if requested
    if (includeDataContext) {
      try {
        const demographicService = DemographicService.getInstance()
        
        // Get some sample cities or specific city data
        if (cityContext && countryContext) {
          const cityData = await demographicService.getCityDemographics(cityContext, countryContext)
          if (cityData) {
            contextData = `\n\nLive demographic data for ${cityContext}, ${countryContext}:
Population: ${cityData.data.population}
Median Income: €${cityData.data.income.median}
Employment Rate: ${cityData.data.employment.rate}%
Education Levels: ${JSON.stringify(cityData.data.education)}
Age Groups: ${JSON.stringify(cityData.data.ageGroups)}`
          }
        } else {
          // Provide general context about available data
          contextData = `\n\nI have access to live demographic data from Eurostat for European cities including:
- Population statistics
- Income and employment data
- Age group distributions
- Education levels
- Economic indicators

I can provide specific data for cities if you mention them.`
        }
      } catch (error) {
        console.error('Error fetching demographic data:', error)
        contextData = '\n\n(Note: Live demographic data temporarily unavailable)'
      }
    }

    // Create optimized system prompt based on context
    let systemPrompt = ''

    // Use contextual prompt if provided (for truly AI-powered responses)
    if (contextualPrompt) {
      systemPrompt = `${contextualPrompt}

${userName ? `The user's name is ${userName}${userCompany ? ` from ${userCompany}` : ''}.` : ''}
${userRole === 'admin' ? 'The user has administrative access to system-level insights.' : 'Focus on business growth and marketing insights.'}

Context: ${conversationSummary || 'Direct request for analysis'}
${contextData}

User Request: ${trimmedMessage}

Provide detailed, professional analysis with specific recommendations and actionable insights.`
    } else if (isHomepage) {
      // Short, focused prompt for homepage visitors
      systemPrompt = `You are Prospectify's homepage assistant. Keep responses SHORT (1-2 sentences max). Be polite and friendly.
${userName ? `The user's name is ${userName}, address them personally and politely when appropriate.` : ''}

Response guide:
- About: "Prospectify helps SMBs find optimal European cities for marketing campaigns using live demographic data. We provide city recommendations, event discovery, and campaign analytics to help your business succeed."
- Contact: "You can reach us at support@prospectify.com or visit our contact page. We're always happy to help with any questions you may have!"

For other questions, provide helpful, polite and concise answers related to Prospectify's services.
Always be courteous and use the user's name when responding.

Context summary: ${conversationSummary || 'New conversation'}
User: ${trimmedMessage}

Be helpful, polite, and concise.`
    } else {
      // Enhanced dashboard assistant prompt
      if (enhanced) {
        systemPrompt = `You are Prospectify's Enhanced AI Assistant for ${userRole === 'admin' ? 'administrators' : 'business users'}. 
${userName ? `The user's name is ${userName}${userCompany ? ` from ${userCompany}` : ''}.` : ''}

${userRole === 'admin' ? `
ADMIN CAPABILITIES - You have full system access:
• System monitoring and performance analysis
• User management and analytics 
• Database operations and data quality
• Advanced configuration and troubleshooting
• Security and compliance oversight
` : `
USER CAPABILITIES - Focus on business intelligence:
• City recommendations and demographic analysis
• Market trends and opportunity identification  
• Report generation and data export
• Business insights and strategic planning
• ROI analysis and performance metrics
`}

RESPONSE STYLE:
• Be professional, insightful, and action-oriented
• Use structured formatting with headers and bullet points
• Include specific metrics and data when relevant
• Provide actionable recommendations
• Use emojis sparingly but effectively for visual organization

${actionType ? `Current action: ${actionType}` : ''}
${contextData}

Context summary: ${conversationSummary || 'New conversation'}
User: ${trimmedMessage}

Always provide comprehensive, valuable insights that help users make informed business decisions.`
      } else {
        // Standard dashboard prompt
        systemPrompt = `You are Prospectify's AI assistant for dashboard users. 
${userName ? `The user's name is ${userName}, address them personally.` : ''}

You help with:
• Finding optimal European cities for business expansion
• Analyzing demographic data and market trends  
• Generating reports and insights
• Discovering business opportunities

${contextData}

Context summary: ${conversationSummary || 'New conversation'}
User: ${trimmedMessage}

Be helpful, professional, and provide actionable insights.`
      }
    }

    // Call Gemini API
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: systemPrompt
          }]
        }],
        generationConfig: {
          temperature: 0.3,        // Lower for more focused responses
          topK: 10,               // Reduced for homepage brevity
          topP: 0.7,              // More focused
          maxOutputTokens: isHomepage ? 100 : 300, // Much shorter for homepage
          stopSequences: ["\n\n", "---", "END_RESPONSE"] // Stop early
        }
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Gemini API error:', errorText)
      return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 })
    }

    const data: GeminiResponse = await response.json()
    
    if (!data.candidates || data.candidates.length === 0) {
      return NextResponse.json({ error: 'No response generated' }, { status: 500 })
    }

    const generatedText = data.candidates[0].content.parts[0].text

    return NextResponse.json({ 
      response: generatedText,
      hasDataContext: includeDataContext && contextData.length > 0
    })

  } catch (error) {
    console.error('Error in Gemini API route:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
