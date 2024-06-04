import { Field } from 'payload/types'
import { Icons } from './Component'

export const IconsField: Field = {
  name: 'customSelectField',
  type: 'text',
  admin: {
    components: {
      Field: Icons,
    },
  },
}
