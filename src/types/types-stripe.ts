export interface StripeField {
  halfWidth: boolean
  fieldName: string
  fieldLabel: string
  fieldType: string
}

export interface StripeFormProps {
  blockId: string
  stripeInfo: {
    price: number
    expirationDate: string
    stripefields: StripeField[]
  }
}
