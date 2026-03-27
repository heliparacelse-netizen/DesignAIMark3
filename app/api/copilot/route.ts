import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://designaimark3-backend-1.onrender.com'
    const token = req.headers.get('authorization') || ''
    
    const res = await fetch(`${API_URL}/api/chat`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({ messages })
    })
    const data = await res.json()
    return NextResponse.json({ reply: data.reply || 'Please try again.' })
  } catch {
    return NextResponse.json({ reply: 'Service temporarily unavailable.' })
  }
}
