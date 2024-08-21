import { Field } from 'payload'

const Icon: Field = {
  name: 'icon',
  label: 'Icono',
  type: 'text',
  admin: {
    components: {
      Field: '@/app/(payload)/fields/Icons/Component',
    },
  },
}

export default Icon
