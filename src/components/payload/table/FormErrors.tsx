import { FieldValues, UseFormReturn } from 'react-hook-form'
import { Alert, AlertTitle, AlertDescription } from '@/components/lib/alert'

interface FormErrorsProps<T extends FieldValues> {
  form: UseFormReturn<T>
}

export function FormErrors<T extends FieldValues>({ form }: FormErrorsProps<T>) {
  const {
    formState: { errors },
  } = form
  const errorList = Object.entries(errors)

  if (errorList.length === 0) return null

  return (
    <Alert variant="destructive" className="mb-6">
      <AlertTitle>Hay errores en el formulario:</AlertTitle>
      <AlertDescription>
        <div className="h-[100px] rounded-md border p-4">
          <ul className="list-disc pl-4">
            {errorList.map(([key, error]) => (
              <li key={key}>{error?.message as string}</li>
            ))}
          </ul>
        </div>
      </AlertDescription>
    </Alert>
  )
}
