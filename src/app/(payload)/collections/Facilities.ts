import { CollectionConfig } from 'payload'
import slug from '../fields/slug'
import { calculateTotalDays } from '@/utils/bookingDateFormat'
import { createSchedule } from '@/utils/dashboard/data'

const daysOfWeek = [
  { label: 'Lunes', value: 'monday' },
  { label: 'Martes', value: 'tuesday' },
  { label: 'Miércoles', value: 'wednesday' },
  { label: 'Jueves', value: 'thursday' },
  { label: 'Viernes', value: 'friday' },
  { label: 'Sábado', value: 'saturday' },
  { label: 'Domingo', value: 'sunday' },
]

const Facilities: CollectionConfig = {
  slug: 'facilities',
  labels: {
    singular: 'Instalaciones',
    plural: 'Instalaciones',
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      required: true,
    },
    {
      name: 'summary',
      type: 'textarea',
      label: 'Resumen',
      required: true,
    },
    {
      name: 'images',
      type: 'array',
      label: 'Imágenes cabecera.',
      admin: {
        initCollapsed: true,
      },
      maxRows: 5,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Imagen',
        },
      ],
    },
    {
      name: 'bookingOptions',
      type: 'array',
      label: 'Opciones de reserva',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'periodType',
          type: 'select',
          label: 'Tipo de Reserva',
          options: [
            { label: 'Precio fijo', value: 'fixed' },
            { label: 'Por Horas', value: 'hours' },
            { label: 'Por Días', value: 'days' },
            { label: 'Por Meses', value: 'months' },
          ],
          required: true,
        },
        {
          type: 'row',
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Nombre',
              required: true,
            },
            {
              name: 'periodLength',
              type: 'number',
              label: 'Cantidad',
              required: true,
              admin: {
                condition: (data, siblingData) => siblingData.periodType !== 'fixed',
              },
            },
            {
              name: 'price',
              type: 'number',
              label: 'Precio en €',
              required: true,
            },
          ],
        },
        {
          name: 'daysAmount',
          type: 'number',
          label: 'Días totales',
          admin: {
            readOnly: true,
            hidden: true,
          },
        },
      ],
    },
    {
      name: 'regularSchedule',
      label: 'Horario Regular',
      type: 'group',
      fields: [
        {
          name: 'scheduleID',
          label: 'ID del horario',
          admin: {
            readOnly: true,
          },
          type: 'text',
        },
        {
          name: 'schedule',
          interfaceName: 'Horario',
          label: ' ',
          type: 'array',
          admin: {
            initCollapsed: true,
          },
          maxRows: 2,
          validate: (value) => {
            if (Array.isArray(value)) {
              const allDays = value.flatMap((item) => item.days || [])
              const uniqueDays = new Set(allDays)
              if (allDays.length !== uniqueDays.size) {
                return 'No puedes asignar 2 horarios al mismo dia de la semana.'
              }
            }
            return true
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'open',
                  label: 'Hora de Apertura',
                  type: 'date',
                  admin: {
                    date: {
                      pickerAppearance: 'timeOnly',
                      displayFormat: 'HH:mm',
                      timeIntervals: 15,
                      timeFormat: 'HH:mm',
                    },
                  },
                  required: true,
                },
                {
                  name: 'close',
                  label: 'Hora de Cierre',
                  type: 'date',
                  admin: {
                    date: {
                      pickerAppearance: 'timeOnly',
                      displayFormat: 'HH:mm',
                      timeIntervals: 15,
                      timeFormat: 'HH:mm',
                    },
                  },
                  required: true,
                  validate: (value, { siblingData }) => {
                    if (siblingData.open && value) {
                      const openTime = new Date(siblingData.open)
                      const closeTime = new Date(value)
                      if (closeTime <= openTime) {
                        return 'La hora de cierre debe ser posterior a la hora de apertura'
                      }
                    }
                    return true
                  },
                },
              ],
            },
            {
              name: 'days',
              label: 'Repetir los dias:',
              type: 'select',
              hasMany: true,
              options: daysOfWeek,
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'holidayschedule',
      label: 'Horario Vacaciones',
      type: 'group',
      fields: [
        {
          name: 'scheduleID',
          label: 'ID del horario',
          admin: {
            readOnly: true,
          },
          type: 'text',
        },
        {
          name: 'schedule',
          interfaceName: 'Horario de Vacaciones',
          label: '',
          type: 'array',
          maxRows: 2,
          validate: (value) => {
            if (Array.isArray(value)) {
              const allDays = value.flatMap((item) => item.days || [])
              const uniqueDays = new Set(allDays)
              if (allDays.length !== uniqueDays.size) {
                return 'No puedes asignar 2 horarios al mismo dia de la semana.'
              }
            }
            return true
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'holydayRepeat',
                  type: 'checkbox',
                  label: '¿Repetir todos los años?',
                  defaultValue: false,
                },
                {
                  name: 'holydaySince',
                  label: 'Desde',
                  type: 'date',
                  admin: {
                    date: {
                      pickerAppearance: 'dayAndTime',
                      displayFormat: 'dd/LL/yyyy HH:mm',
                      timeIntervals: 15,
                      timeFormat: 'HH:mm',
                    },
                  },
                  required: true,
                },
                {
                  name: 'holydayUntill',
                  label: 'Hasta',
                  type: 'date',
                  admin: {
                    date: {
                      pickerAppearance: 'dayAndTime',
                      displayFormat: 'dd/LL/yyyy HH:mm',
                      timeIntervals: 15,
                      timeFormat: 'HH:mm',
                    },
                  },
                  required: true,
                },
              ],
            },
            {
              name: 'holydayName',
              label: 'Nombre',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    slug,
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data.bookingOptions) {
          data.bookingOptions = data.bookingOptions.map((option: any) => ({
            ...option,
            daysAmount: calculateTotalDays(option.periodType, option.periodLength),
          }))
        }
        return data
      },
    ],

    afterChange: [
      async ({ doc, req }) => {
        if (doc.facilitieSchedules) {
          try {
            const result = await createSchedule(doc)
            if (result.success) {
              await req.payload.update({
                collection: 'facilities',
                id: doc.id,
                data: {
                  scheduleId: result.data.id,
                },
              })
              console.log('Schedule created successfully with ID:', result.data.id)
            } else {
              console.error('Error creating schedule:', result.message)
            }
          } catch (error) {
            console.error('Error in afterChange hook:', error)
          }
        }
        return doc
      },
    ],
  },
}

export default Facilities
