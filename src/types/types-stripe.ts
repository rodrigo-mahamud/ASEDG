export interface StripeField {
  halfWidth: boolean
  fieldName: string
  fieldLabel: string
  fieldType: string
}

export interface StripeFormProps {
  stripeInfo: {
    stripefields: StripeField[]
    price: number
  }
}
