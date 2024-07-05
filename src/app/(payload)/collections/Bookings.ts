import { CollectionConfig } from 'payload'
import payload from 'payload' // Importa Payload
const Bookings: CollectionConfig = {
  slug: 'bookings',
  labels: {
    singular: 'Reserva',
    plural: 'Reservas',
  },
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'nombre',
      type: 'text',
      required: true,
    },
    {
      name: 'apellidos',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'telefono',
      type: 'text',
      required: true,
    },
    {
      name: 'edad',
      type: 'number',
      required: true,
    },
    {
      name: 'dni',
      type: 'text',
      required: true,
    },
    {
      name: 'periodo',
      type: 'number',
      required: true,
    },
    {
      name: 'fechaInicio',
      type: 'date',
      required: true,
    },
    {
      name: 'fechaFin',
      type: 'date',
      required: true,
    },
    {
      name: 'pinCode',
      type: 'text',
      required: true,
    },
    {
      name: 'terminos',
      type: 'checkbox',
      required: true,
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        if (operation === 'create') {
          const { email, nombre, apellidos, telefono, fechaInicio, fechaFin, pinCode } = doc

          await req.payload.sendEmail({
            to: email,
            subject: 'Registro exitoso en el gimnasio',
            html: `
              <h1>¡Bienvenido, ${nombre} ${apellidos}!</h1>
              <p>Te has registrado exitosamente en nuestro gimnasio.</p>
              <p>Detalles de tu registro:</p>
              <ul>
                <li>Nombre: ${nombre} ${apellidos}</li>
                <li>Teléfono móvil: ${telefono}</li>
                <li>Correo electrónico: ${email}</li>
                <li>Hora de inicio: ${new Date(fechaInicio).toLocaleString()}</li>
                <li>Hora de finalización: ${new Date(fechaFin).toLocaleString()}</li>
                <li>Código PIN: ${pinCode}</li>
              </ul>
              <p>¡Gracias por unirte a nuestro gimnasio!</p>
            `,
          })
        }
      },
    ],
  },
}

export default Bookings
