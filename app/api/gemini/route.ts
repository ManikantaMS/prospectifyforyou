import { NextRequest, NextResponse } from 'next/server'
import { DemographicService } from '@/lib/demographic-service'

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'

interface GeminiRequest {
  message: string
  includeDataContext?: boolean
  cityContext?: string
  countryContext?: string
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
    const { message, includeDataContext = true, cityContext, countryContext }: GeminiRequest = await request.json()
    
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

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

    // Create concise system prompt to save tokens
    const systemPrompt = `You are Prospectify's AI assistant. Help SMBs find optimal European cities for marketing campaigns using demographic data.

Key features: City recommendations, event discovery, campaign analytics, ROI tracking.

${contextData}

User: ${message}

Provide a concise, actionable response (max 3 paragraphs).`

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
          temperature: 0.7,
          topK: 20,           // Reduced from 40 to save tokens
          topP: 0.85,         // Reduced from 0.95 for more focused responses
          maxOutputTokens: 512, // Reduced from 1024 to save free tier tokens
          stopSequences: ["\n\n---", "END_RESPONSE"] // Stop sequences to prevent rambling
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
