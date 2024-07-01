import { create } from 'zustand'
import { BookingFormData } from './bookingValidations'

type FormState = 'empty' | 'data' | 'payment' | 'success' | 'error'

interface FormStore {
  formState: FormState
  formData: Partial<BookingFormData>
  isLoading: boolean
  setFormState: (newState: FormState) => void
  setEmptyState: () => void
  setDataState: () => void
  setPaymentState: () => void
  setSuccessState: () => void
  setErrorState: () => void
  updateFormData: (newData: Partial<BookingFormData>) => void
  resetForm: () => void
  setLoading: (loading: boolean) => void
}

const useFormStore = create<FormStore>((set) => ({
  formState: 'empty',
  formData: {},
  isLoading: false,

  setFormState: (newState) =>
    set((state) => {
      return { formState: newState }
    }),

  setEmptyState: () =>
    set((state) => {
      return { formState: 'empty' }
    }),
  setDataState: () =>
    set((state) => {
      return { formState: 'data' }
    }),
  setPaymentState: () =>
    set((state) => {
      return { formState: 'payment' }
    }),
  setSuccessState: () =>
    set((state) => {
      return { formState: 'success' }
    }),
  setErrorState: () =>
    set((state) => {
      return { formState: 'error' }
    }),

  updateFormData: (newData) =>
    set((state) => {
      const updatedFormData = { ...state.formData, ...newData }
      return { formData: updatedFormData }
    }),

  resetForm: () =>
    set(() => {
      return { formState: 'empty', formData: {}, isLoading: false }
    }),

  setLoading: (loading) =>
    set(() => {
      return { isLoading: loading }
    }),
}))

export default useFormStore
