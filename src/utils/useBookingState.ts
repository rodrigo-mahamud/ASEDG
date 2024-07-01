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
      console.log('State changed to:', newState)
      return { formState: newState }
    }),

  setEmptyState: () =>
    set((state) => {
      console.log('State changed to: empty')
      return { formState: 'empty' }
    }),
  setDataState: () =>
    set((state) => {
      console.log('State changed to: data')
      return { formState: 'data' }
    }),
  setPaymentState: () =>
    set((state) => {
      console.log('State changed to: payment')
      return { formState: 'payment' }
    }),
  setSuccessState: () =>
    set((state) => {
      console.log('State changed to: success')
      return { formState: 'success' }
    }),
  setErrorState: () =>
    set((state) => {
      console.log('State changed to: error')
      return { formState: 'error' }
    }),

  updateFormData: (newData) =>
    set((state) => {
      const updatedFormData = { ...state.formData, ...newData }
      console.log('Form data updated:', updatedFormData)
      return { formData: updatedFormData }
    }),

  resetForm: () =>
    set(() => {
      console.log('Form reset. State changed to: empty')
      return { formState: 'empty', formData: {}, isLoading: false }
    }),

  setLoading: (loading) =>
    set(() => {
      console.log('Loading state changed to:', loading)
      return { isLoading: loading }
    }),
}))

export default useFormStore
