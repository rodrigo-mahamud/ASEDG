import { Field } from 'payload/types'
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
