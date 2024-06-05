import { CollectionConfig } from 'payload/types'

const Categorias: CollectionConfig = {
  slug: 'categorias',
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
    {
      name: 'description',
      label: 'Descripción',
      type: 'textarea',
    },
  ],
}

export default Categorias
