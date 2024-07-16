import { NextResponse } from 'next/server'

const API_URL = process.env.SECRET_GYM_DASHBOARD_API_URL
const API_TOKEN = process.env.SECRET_GYM_DASHBOARD_API_TOKEN

export async function GET() {
  try {
    const response = await fetch(`${API_URL}`, {
      headers: {
        Authorization: `${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch visitors' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        Authorization: `${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create visitor' }, { status: 500 })
  }
}
