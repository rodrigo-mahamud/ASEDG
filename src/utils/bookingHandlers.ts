import { BookingFormTypes } from './bookingValidations'
import useBookingState from './useBookingState'
import { createPaymentIntent } from './stripeUtils'
import { useCallback, useRef } from 'react'

export const useBookingHandlers = () => {
  const {
    formState,
    formData,
    price,
    clientSecret,
    setDataState,
    setPaymentState,
    setSuccessState,
    setErrorState,
    updateFormData,
    setLoading,
    setErrorDetails,
    setSuccessMessage,
    setClientSecret,
  } = useBookingState()

  // Usar useRef para almacenar el último error sin causar re-renderizados
  const lastErrorRef = useRef<string | null>(null)

  const setError = useCallback(
    (error: string | null) => {
      if (error !== lastErrorRef.current) {
        lastErrorRef.current = error
        setErrorDetails(error)
        if (error) {
          setErrorState()
        }
      }
    },
    [setErrorDetails, setErrorState],
  )

  const checkUnifiApi = useCallback(async () => {
    try {
      const response = await fetch('/api/health-check', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const data = await response.json()
        if (data && data.status == 200) {
          setError(null)
          return true
        } else {
          setError('El sistema de reservas no está funcionando correctamente')
          return false
        }
      } else {
        setError('El sistema de reservas no está respondiendo correctamente')
        return false
      }
    } catch (error) {
      console.error('Error al verificar el sistema de reservas:', error)
      setError('Error al verificar el sistema de reservas')
      return false
    }
  }, [setError])

  const initializePayment = useCallback(async () => {
    if (
      formState === 'payment' &&
      !clientSecret &&
      price &&
      formData.email &&
      formData.nombre &&
      formData.apellidos
    ) {
      try {
        setLoading(true)
        const isAvailable = await checkUnifiApi()
        if (!isAvailable) {
          return
        }

        const secret = await createPaymentIntent(
          price,
          formData.nombre,
          formData.apellidos,
          formData.email,
        )

        setClientSecret(secret)
      } catch (error) {
        console.error('Error creating payment intent:', error)
        setError('Error al preparar el pago. Por favor, inténtelo de nuevo.')
        setDataState()
      } finally {
        setLoading(false)
      }
    }
  }, [
    formState,
    clientSecret,
    checkUnifiApi,
    formData.nombre,
    formData.apellidos,
    formData.email,
    price,
    setLoading,
    setDataState,
    setClientSecret,
    setError,
  ])

  const handleFormSubmit = useCallback(
    (data: BookingFormTypes) => {
      updateFormData(data)
      setPaymentState()
    },
    [updateFormData, setPaymentState],
  )

  const handlePaymentComplete = useCallback(async () => {
    try {
      setLoading(true)
      const result = await createBooking({ ...formData, price } as BookingFormTypes)
      console.log('Reserva completada con éxito:', result)
      setSuccessMessage('Tu reserva se ha completado correctamente')
      setSuccessState()
    } catch (error) {
      console.error('Error en handlePaymentComplete:', error)
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('Error desconocido al procesar la reserva.')
      }
    } finally {
      setLoading(false)
    }
  }, [formData, price, setLoading, setSuccessMessage, setSuccessState, setError])

  const handleGoBack = useCallback(() => {
    if (formState === 'payment') {
      setDataState()
    }
    setSuccessMessage(null)
    setClientSecret(null)
    setError(null)
  }, [formState, setDataState, setSuccessMessage, setClientSecret, setError])

  const handleError = useCallback(
    (error: string) => {
      setError(error)
    },
    [setError],
  )

  const handleDataSubmit = useCallback(() => {
    setPaymentState()
  }, [setPaymentState])

  const handlePaymentSubmit = useCallback(() => {
    const stripeForm = document.getElementById('stripe-form') as HTMLFormElement
    if (stripeForm) {
      stripeForm.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
    }
  }, [])

  const createBooking = async (formData: BookingFormTypes) => {
    const response = await fetch('/api/create-booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const result = await response.json()

    if (!result.success) {
      throw new Error(result.message)
    }

    return result
  }

  return {
    initializePayment,
    handleFormSubmit,
    handlePaymentComplete,
    handleGoBack,
    handleError,
    handleDataSubmit,
    handlePaymentSubmit,
    checkUnifiApi,
  }
}
