import type { NextApiRequest, NextApiResponse } from 'next'

const API_URL = process.env.SECRET_GYM_REGISTER_API_URL
const API_TOKEN = process.env.SECRET_GYM_CREDENTIALS_API_TOKEN // Asegúrate de tener este token configurado en tus variables de entorno

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch(`${API_URL}/visitors?page_size=1`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_TOKEN}`,
      },
    })

    if (response.ok) {
      const data = await response.json()
      if (data && Array.isArray(data.data) && data.data.length > 0) {
        res.status(200).json({ status: 'OK', message: 'El sistema de reservas está disponible' })
      } else {
        res
          .status(503)
          .json({
            status: 'ERROR',
            message: 'El sistema de reservas no está devolviendo datos correctamente',
          })
      }
    } else {
      res
        .status(503)
        .json({
          status: 'ERROR',
          message: 'El sistema de reservas no está respondiendo correctamente',
        })
    }
  } catch (error) {
    console.error('Error al verificar el sistema de reservas:', error)
    res.status(500).json({ status: 'ERROR', message: 'Error al verificar el sistema de reservas' })
  }
}
