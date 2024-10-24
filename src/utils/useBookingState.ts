import { create } from 'zustand'
import { BookingFormTypes } from './bookingValidations'

type FormState = 'empty' | 'data' | 'payment' | 'success' | 'error'

interface FormStore {
  formState: FormState
  formData: Partial<BookingFormTypes> & {
    daysAmount?: number | null
  }
  isLoading: boolean
  price: number
  errorDetails: string | null
  successMessage: string | null
  clientSecret: string | null
  isStripeValid: boolean
  selectedPeriodId: string | null
  setFormState: (newState: FormState) => void
  setEmptyState: () => void
  setDataState: () => void
  setPaymentState: () => void
  setSuccessState: () => void
  setErrorState: () => void
  updateFormData: (newData: Partial<BookingFormTypes>) => void
  resetForm: () => void
  setLoading: (loading: boolean) => void
  setPrice: (price: number) => void
  setErrorDetails: (details: string | null) => void
  setSuccessMessage: (message: string | null) => void
  setClientSecret: (secret: string | null) => void
  setStripeValid: (valid: boolean) => void
  setSelectedPeriodId: (id: string | null) => void
}

const useBookingState = create<FormStore>((set) => ({
  formState: 'empty',
  formData: {},
  isLoading: false,
  price: 0,
  errorDetails: null,
  successMessage: null,
  clientSecret: null,
  isStripeValid: false,
  selectedPeriodId: null,

  setFormState: (newState) => set({ formState: newState }),
  setEmptyState: () => set({ formState: 'empty' }),
  setDataState: () => set({ formState: 'data' }),
  setPaymentState: () => set({ formState: 'payment' }),
  setSuccessState: () => set({ formState: 'success' }),
  setErrorState: () => set({ formState: 'error' }),

  updateFormData: (newData) => set((state) => ({ formData: { ...state.formData, ...newData } })),
  resetForm: () =>
    set({
      formState: 'empty',
      formData: {},
      isLoading: false,
      price: 0,
      errorDetails: null,
      successMessage: null,
      clientSecret: null,
      isStripeValid: false,
      selectedPeriodId: null,
    }),
  setLoading: (loading) => set({ isLoading: loading }),
  setPrice: (price) => set({ price }),
  setErrorDetails: (details) => set({ errorDetails: details }),
  setSuccessMessage: (message) => set({ successMessage: message }),
  setClientSecret: (secret) => set({ clientSecret: secret }),
  setStripeValid: (valid) => set({ isStripeValid: valid }),
  setSelectedPeriodId: (id) => set({ selectedPeriodId: id }),
}))

export default useBookingState
