import { CollectionConfig } from 'payload'
import slug from '../fields/slug'
import { calculateTotalDays } from '@/utils/bookingDateFormat'
import {
  createHolidayGroup,
  createSchedule,
  deleteSchedule,
  editHolidayGroup,
  editSchedule,
} from '@/utils/dashboard/actions'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import Icon from '../fields/Icons'

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
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Título',
          required: true,
        },
        {
          name: 'facilitieType',
          label: 'Tipo de instalacción',
          type: 'select',
          options: [
            {
              label: 'Gimnasio Municipal',
              value: 'gym',
            },
            {
              label: 'Polideportivo',
              value: 'sportsCenter',
            },
            {
              label: 'Pista de padel',
              value: 'padelField',
            },
          ],
          defaultValue: 'gym',
          required: true,
          validate: async (value: any) => {
            const payload = await getPayloadHMR({ config: configPromise })

            const existingPage = await payload.find({
              collection: 'pages',
              where: {
                'header.pagetype': {
                  equals: 'newsPage',
                },
              },
            })

            if (existingPage.totalDocs > 1 && value === 'gym') {
              return `Ya existe una instalacion de tipo gimnasio, solo puede haber una instalaccion de este tipo.`
            }
            if (existingPage.totalDocs > 1 && value === 'sportsCenter') {
              return `Ya existe una instalacion de tipo polideportivo, solo puede haber una instalaccion de este tipo.`
            }
            if (existingPage.totalDocs > 1 && value === 'padelField') {
              return `Ya existe una instalacion de tipo padel, solo puede haber una instalaccion de este tipo.`
            }

            return true
          },
        },
      ],
    },
    {
      type: 'group',
      name: 'facilitieImages',
      label: 'Imágnes de la instalacción',
      fields: [
        {
          name: 'facilitieImage1',
          type: 'upload',
          label: '',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'facilitieImage2',
          type: 'upload',
          label: '',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'facilitieImage3',
          type: 'upload',
          label: '',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'facilitieImage4',
          type: 'upload',
          label: '',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'facilitieImage5',
          type: 'upload',
          label: '',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descripción',
      required: true,
    },
    {
      name: 'richtxtcontent',
      label: ' ',
      type: 'richText',
    },
    {
      name: 'facilitiesRelated',
      label: 'Instalacciones similares',
      type: 'relationship',
      relationTo: 'facilities',
      hasMany: true,
      maxRows: 4,
    },
    {
      name: 'location',
      label: 'Ubicación de la instalacción',
      type: 'text',
      required: true,
      admin: {
        description:
          'Para asegurar que la ubicación es correcta debes indicar la población al final',
      },
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
          type: 'row',
          fields: [
            Icon,
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
          ],
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
            readOnly: false,
          },
          type: 'text',
        },
        {
          name: 'holidayGroupID',
          label: 'ID del horario de vacaciones',
          admin: {
            readOnly: false,
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
              const allDays = value.flatMap((item: any) => item.days || [])
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
                  validate: (value, { siblingData }: any) => {
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
          name: 'schedule',
          interfaceName: 'Horario de Vacaciones',
          label: ' ',
          type: 'array',
          maxRows: 2,
          validate: (value) => {
            if (Array.isArray(value)) {
              const allDays = value.flatMap((item: any) => item.days || [])
              const uniqueDays = new Set(allDays)
              if (allDays.length !== uniqueDays.size) {
                return 'No puedes asignar 2 horarios al mismo dia de la semana.'
              }
            }
            return true
          },
          fields: [
            {
              name: 'holydayRepeat',
              type: 'checkbox',
              label: '¿Repetir todos los años?',
              defaultValue: false,
            },
            {
              name: 'holydayName',
              label: 'Nombre',
              type: 'text',
              required: true,
            },
            {
              type: 'row',
              fields: [
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
          ],
        },
      ],
    },
    slug,
    {
      name: 'termsFile',
      type: 'upload',
      label: 'Archivo',
      relationTo: 'media',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        if (
          operation === 'create' &&
          req.payload.config.collections.some((collection) => collection.slug === 'facilities')
        ) {
          if (data.regularSchedule) {
            data.regularSchedule.scheduleID = null
            data.regularSchedule.holidayGroupID = null
          }
          return data
        }

        // Calcular daysAmount para bookingOptions
        if (data.bookingOptions) {
          data.bookingOptions = data.bookingOptions.map((option: any) => ({
            ...option,
            daysAmount: calculateTotalDays(option.periodType, option.periodLength),
          }))
        }
        const hasRegularSchedule =
          data.regularSchedule &&
          data.regularSchedule.schedule &&
          data.regularSchedule.schedule.length > 0
        const hasHolidaySchedule =
          data.holidayschedule &&
          data.holidayschedule.schedule &&
          data.holidayschedule.schedule.length > 0

        try {
          let holidayGroupId = data.regularSchedule.holidayGroupID
          let scheduleId = data.regularSchedule.scheduleID

          // Manejar el Holiday Group
          if (hasHolidaySchedule) {
            if (holidayGroupId) {
              const holidayGroupResult = await editHolidayGroup(data, holidayGroupId)
              if (!holidayGroupResult.success) {
                throw new Error(holidayGroupResult.message)
              }
            } else {
              const holidayGroupResult = await createHolidayGroup(data)
              if (!holidayGroupResult.success) {
                throw new Error(holidayGroupResult.message)
              }
              holidayGroupId = holidayGroupResult.data.id
            }
          } else if (holidayGroupId) {
            holidayGroupId = null
          }

          // Manejar el Schedule
          if (hasRegularSchedule) {
            if (scheduleId) {
              const scheduleResult = await editSchedule(data, scheduleId, holidayGroupId)
              if (!scheduleResult.success) {
                throw new Error(scheduleResult.message)
              }
            } else {
              const scheduleResult = await createSchedule(data, holidayGroupId)
              if (!scheduleResult.success) {
                throw new Error(scheduleResult.message)
              }
              scheduleId = scheduleResult.data.id
            }
          } else if (scheduleId) {
            const deleteResult = await deleteSchedule(scheduleId)
            if (!deleteResult.success) {
              throw new Error(deleteResult.message)
            }
            scheduleId = null
          }

          // Actualizar los campos en el documento solo si es necesario
          if (!data.regularSchedule.scheduleID || scheduleId === null || holidayGroupId === null) {
            data.regularSchedule = {
              ...data.regularSchedule,
              scheduleID: scheduleId,
              holidayGroupID: holidayGroupId,
            }
          }

          console.log('Schedule and Holiday Group operations completed successfully')
        } catch (error) {
          console.error('Error in beforeChange hook:', error)
          throw error
        }

        return data
      },
    ],
  },
}

export default Facilities
