import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

const tokenStore: Record<string, number> = {}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const tokens = tokenStore[session.user.email] ?? 3
  return NextResponse.json({ tokens, plan: (session.user as any).plan || 'free' })
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const email = session.user.email
  const current = tokenStore[email] ?? 3
  if (current <= 0) return NextResponse.json({ error: 'No tokens remaining. Please upgrade your plan.' }, { status: 402 })
  tokenStore[email] = current - 1
  return NextResponse.json({ tokens: tokenStore[email], consumed: 1 })
}
