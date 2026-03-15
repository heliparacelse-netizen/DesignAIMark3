import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ reply: 'Add OPENAI_API_KEY to Vercel environment variables to enable Lumara AI.' })
    }
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        max_tokens: 400,
        messages: [
          { role: 'system', content: 'You are Lumara AI, an expert interior design assistant. Help users with room analysis, furniture suggestions, design prompts, style advice, and decoration trends. Be concise, inspiring, and practical. Format responses clearly.' },
          ...messages
        ]
      })
    })
    const data = await response.json()
    return NextResponse.json({ reply: data.choices?.[0]?.message?.content || 'Please try again.' })
  } catch {
    return NextResponse.json({ reply: 'Service temporarily unavailable.' }, { status: 500 })
  }
}
