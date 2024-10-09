export interface StripeField {
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
