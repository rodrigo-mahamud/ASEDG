import { Block } from 'payload'

interface FAQGTypes {
  question: string
  answer: string
}

export type Type = {
  title: string
  description: string
  faqsGoup: FAQGTypes[]
}

const Faqs: Block = {
  slug: 'faqs',
  labels: {
    singular: 'Pregunta Frequente',
    plural: 'Preguntas Frequentes',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Título',
        },
        {
          name: 'description',
          type: 'text',
          label: 'Descripción',
        },
      ],
    },
    {
      type: 'array',
      name: 'faqsGoup',
      label: '',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          label: 'Pregunta',
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          label: 'Respuesta',
          required: true,
        },
      ],
    },
  ],
}
export default Faqs
