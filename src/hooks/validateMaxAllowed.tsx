import { FieldHook, PayloadRequest } from 'payload'

interface ValidateMaxAllowedOptions {
  field: string
  max: number
  collectionSlug: string
}

const validateMaxAllowed = (options: ValidateMaxAllowedOptions): FieldHook => {
  return async ({ value, originalDoc, req }) => {
    const { field, max, collectionSlug } = options

    if (value === true) {
      const existingDocs = await req.payload.find({
        collection: collectionSlug,
        where: {
          [field]: {
            equals: true,
          },
        },
      })

      const docs = existingDocs.docs.filter((doc) => doc.id !== originalDoc.id)

      if (docs.length >= max) {
        throw new Error(`Only ${max} documents can have the field "${field}" set to true.`)
      }
    }

    return value
  }
}

export default validateMaxAllowed
