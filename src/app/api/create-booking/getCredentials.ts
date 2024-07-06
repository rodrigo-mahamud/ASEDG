import { NextResponse } from 'next/server'

export async function getCredentials() {
  try {
    console.log('Iniciando solicitud de credenciales del gimnasio...')
    const response = await fetch(process.env.SECRET_GYM_CREDENTIALS_API_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.SECRET_GYM_CREDENTIALS_API_TOKEN!,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log('Credenciales del gimnasio obtenidas con éxito')
    return data.data
  } catch (error) {
    console.error('Error fetching gym credentials:', error)
    throw new Error('Failed to fetch gym credentials')
  }
}
