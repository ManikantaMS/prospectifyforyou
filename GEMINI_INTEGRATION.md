# Gemini AI Chatbot Integration

## Overview
The Prospectify chatbot has been upgraded from a static, scripted conversation flow to an AI-powered assistant using Google's Gemini API. The new chatbot can provide dynamic responses and leverage live demographic data from Eurostat.

## Files Added/Modified

### New Files:
- `app/api/gemini/route.ts` - Backend API route for Gemini integration
- `components/gemini-chat-widget.tsx` - New AI-powered chat widget
- `GEMINI_INTEGRATION.md` - This documentation file

### Modified Files:
- `app/layout.tsx` - Updated to use new Gemini chat widget
- `.env.local` - Added Gemini API key configuration

## Configuration

### Environment Variables
Add your Gemini API key to `.env.local`:
```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

Get your API key from: https://makersuite.google.com/app/apikey

### API Route (`/api/gemini`)
- Accepts POST requests with user messages
- Optionally includes live demographic data context
- Securely calls Gemini API with system prompts
- Returns AI-generated responses

### Features
- **Dynamic Responses**: AI-generated responses instead of scripted flows
- **Live Data Integration**: Includes real demographic data from Eurostat
- **Context Awareness**: Understands Prospectify's features and purpose
- **Security**: API key never exposed to frontend
- **Error Handling**: Graceful fallbacks for API failures
- **Typing Indicators**: Visual feedback during response generation

## Usage

The chatbot automatically appears in the bottom-right corner of all pages. Users can:
- Ask questions about European cities and demographics
- Get personalized city recommendations
- Learn about events and marketing opportunities
- Receive ROI analysis and campaign suggestions

## System Prompt
The AI assistant is configured to:
- Act as a Prospectify expert
- Help with city recommendations and demographic insights
- Guide users through platform features
- Provide data-driven marketing advice
- Suggest actionable next steps

## Error Handling
- Displays helpful error messages if API fails
- Falls back gracefully when demographic data is unavailable
- Provides clear feedback about API key configuration issues

## Development Notes
- Built with Next.js 15 App Router
- Uses React hooks for state management
- Responsive design works on mobile and desktop
- TypeScript for type safety
- Follows existing UI/UX patterns from the app

## Testing
1. Ensure Gemini API key is set in `.env.local`
2. Start the development server: `npm run dev`
3. Open the chatbot and test various queries
4. Verify live data integration works
5. Test error scenarios (invalid API key, network issues)
