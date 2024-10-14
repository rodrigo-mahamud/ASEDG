export interface StripeField {
  halfWidth: boolean
  fieldName: string
  fieldLabel: string
  fieldType: string
}

export interface StripeFormProps {
  blockId: string
  cardTitle: string
  stripeInfo: {
    price: number
    expirationDate: string
    stripefields: StripeField[]
  }
}
