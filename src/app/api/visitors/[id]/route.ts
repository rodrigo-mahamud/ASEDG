import { NextResponse } from 'next/server'

const API_URL = process.env.SECRET_GYM_DASHBOARD_API_URL
const API_TOKEN = process.env.SECRET_GYM_DASHBOARD_API_TOKEN

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const response = await fetch(`${API_URL}/${params.id}`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch visitor' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const response = await fetch(`${API_URL}/${params.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update visitor' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const response = await fetch(`${API_URL}/${params.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete visitor' }, { status: 500 })
  }
}
