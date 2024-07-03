import { create } from 'zustand'
import { BookingFormData } from './bookingValidations'

type FormState = 'empty' | 'data' | 'payment' | 'success' | 'error'

interface FormStore {
  formState: FormState
  formData: Partial<BookingFormData>
  isLoading: boolean
  price: number
  setFormState: (newState: FormState) => void
  setEmptyState: () => void
  setDataState: () => void
  setPaymentState: () => void
  setSuccessState: () => void
  setErrorState: () => void
  updateFormData: (newData: Partial<BookingFormData>) => void
  resetForm: () => void
  setLoading: (loading: boolean) => void
  setPrice: (price: number) => void
}

const useFormStore = create<FormStore>((set) => ({
  formState: 'empty',
  formData: {},
  isLoading: false,
  price: 0,

  setFormState: (newState) => set({ formState: newState }),
  setEmptyState: () => set({ formState: 'empty' }),
  setDataState: () => set({ formState: 'data' }),
  setPaymentState: () => set({ formState: 'payment' }),
  setSuccessState: () => set({ formState: 'success' }),
  setErrorState: () => set({ formState: 'error' }),

  updateFormData: (newData) => set((state) => ({ formData: { ...state.formData, ...newData } })),
  resetForm: () => set({ formState: 'empty', formData: {}, isLoading: false, price: 0 }),
  setLoading: (loading) => set({ isLoading: loading }),
  setPrice: (price) => set({ price }),
}))

export default useFormStore
