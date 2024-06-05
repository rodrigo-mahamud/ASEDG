import { Field } from 'payload/types'
import IconSelector from './Component' // Ajusta la ruta según la ubicación de tu componente

const IconField: Field = {
  name: 'icon',
  label: 'Icono',
  type: 'text',
  admin: {
    components: {
      Field: IconSelector,
    },
  },
}

export default IconField
