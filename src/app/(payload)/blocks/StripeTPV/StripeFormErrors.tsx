import { FieldValues, UseFormReturn } from 'react-hook-form'
import { Alert, AlertTitle, AlertDescription } from '@/components/lib/alert'
import { IconAlertCircle } from '@tabler/icons-react'

interface FormErrorsProps<T extends FieldValues> {
  form: UseFormReturn<T>
}

export default function StripeFormErrors<T extends FieldValues>({ form }: FormErrorsProps<T>) {
  const {
    formState: { errors },
  } = form
  const errorList = Object.entries(errors)

  if (errorList.length === 0) return null

  return (
    <Alert variant="default" className="mb-6 bg-red-50 border-red-500">
      <AlertTitle className="text-lg text-red-600 flex items-center gap-1">
        <IconAlertCircle size={18}></IconAlertCircle>
        <span className="leading-[0]">Revisa el formulario</span>
      </AlertTitle>
      <AlertDescription>
        <div className="max-h-52 overflow-y-auto rounded-md mt-2">
          <ul className="list-decimal pl-0 text-sm text-red-600">
            {errorList.map(([key, error]) => (
              <li key={key}>{error?.message as string}</li>
            ))}
          </ul>
        </div>
      </AlertDescription>
    </Alert>
  )
}
