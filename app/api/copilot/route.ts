import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ reply: 'Add OPENAI_API_KEY to Vercel environment variables to enable the Design Copilot.' })
    }
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        max_tokens: 300,
        messages: [
          { role: 'system', content: 'You are Design Copilot, an expert AI interior design assistant. Help users choose styles, write prompts, and get design advice. Be concise and inspiring.' },
          ...messages.map((m: any) => ({ role: m.role, content: m.content }))
        ]
      })
    })
    const data = await response.json()
    return NextResponse.json({ reply: data.choices?.[0]?.message?.content || 'Please try again.' })
  } catch {
    return NextResponse.json({ reply: 'Service temporarily unavailable.' }, { status: 500 })
  }
}
