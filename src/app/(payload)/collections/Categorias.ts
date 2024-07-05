import { CollectionConfig } from 'payload'

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
