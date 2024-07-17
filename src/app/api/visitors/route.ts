import { NextRequest, NextResponse } from 'next/server'

const API_URL = process.env.SECRET_GYM_DASHBOARD_API_URL
const API_TOKEN = process.env.SECRET_GYM_DASHBOARD_API_TOKEN

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    console.log(searchParams)

    const url = `${API_URL}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
    console.log(url)

    const response = await fetch(url, {
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
