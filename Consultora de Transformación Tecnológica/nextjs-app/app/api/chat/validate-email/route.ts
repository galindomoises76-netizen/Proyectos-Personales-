import { NextRequest, NextResponse } from 'next/server'

const EMAIL_PATTERN = /^[A-Za-z0-9+_.-]+@(.+)$/

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { valid: false },
        { status: 400 }
      )
    }

    const isValid = EMAIL_PATTERN.test(email)

    return NextResponse.json({ valid: isValid })
  } catch (error) {
    console.error('Email validation error:', error)
    return NextResponse.json(
      { valid: false },
      { status: 500 }
    )
  }
}
