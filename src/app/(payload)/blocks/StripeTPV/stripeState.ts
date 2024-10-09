import { create } from 'zustand'

type FormState = 'closed' | 'open' | 'filled' | 'empty'

interface FormStore {
  formState: FormState
  formData: any
  isLoading: boolean
  setFormState: (newState: FormState) => void
  updateFormData: (newData: any) => void
  setLoading: (loading: boolean) => void
}

const stripeState = create<FormStore>((set) => ({
  formState: 'closed',
  formData: {},
  isLoading: false,

  setFormState: (newState) => set({ formState: newState }),
  updateFormData: (newData) => set((state) => ({ formData: { ...state.formData, ...newData } })),
  setLoading: (loading) => set({ isLoading: loading }),
}))

export default stripeState
