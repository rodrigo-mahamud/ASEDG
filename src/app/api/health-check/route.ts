import { NextRequest, NextResponse } from 'next/server'

const API_URL = process.env.SECRET_GYM_REGISTER_API_URL
const API_TOKEN = process.env.SECRET_GYM_REGISTER_API_TOKEN

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(`${API_URL}?page_size=1`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${API_TOKEN}`,
      },
    })

    if (response.ok) {
      const data = await response.json()
      if (data && Array.isArray(data.data) && data.data.length > 0) {
        return NextResponse.json({ status: 200 })
      } else {
        return NextResponse.json({ status: 503 })
      }
    } else {
      return NextResponse.json({ status: 503 })
    }
  } catch (error) {
    console.error('Error al verificar el sistema de reservas:', error)
    return NextResponse.json({ status: 500 })
  }
}
