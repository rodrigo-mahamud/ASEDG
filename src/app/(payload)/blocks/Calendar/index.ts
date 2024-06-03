import { Block } from 'payload/types'

const CalendarBlock: Block = {
  slug: 'calendarblock',
  labels: {
    singular: 'Calendar Block',
    plural: 'Calendar Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Event Title',
    },
    {
      name: 'start',
      type: 'date',
      required: true,
      label: 'Start Date and Time',
    },
    {
      name: 'end',
      type: 'date',
      required: true,
      label: 'End Date and Time',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Event Description',
    },
    {
      name: 'location',
      type: 'text',
      required: true,
      label: 'Event Location',
    },
    {
      name: 'img',
      type: 'upload',
      relationTo: 'media', // Assuming you have a media collection for image uploads
      required: true,
      label: 'Event Image',
    },
  ],
}

export default CalendarBlock
