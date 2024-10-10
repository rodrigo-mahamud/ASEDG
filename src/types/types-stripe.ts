export interface StripeField {
  halfWidth: boolean
  fieldName: string
  fieldLabel: string
  fieldType: string
}

export interface StripeFormProps {
  blockId: string
  stripeInfo: {
    stripefields: StripeField[]
  }
}
