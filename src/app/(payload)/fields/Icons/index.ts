import { Field } from 'payload'
import IconField from './Component'

const Icon: Field = {
  name: 'icon',
  label: 'Icono',
  type: 'text',
  admin: {
    components: {
      Field: IconField,
    },
  },
}

export default Icon
