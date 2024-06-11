import { CollectionConfig } from 'payload/types'

const Categorias: CollectionConfig = {
  slug: 'cat',
  labels: {
    singular: 'Categoria',
    plural: 'Categorias',
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      label: 'Nombre',
      type: 'text',
      required: true,
    },
  ],
}

export default Categorias
