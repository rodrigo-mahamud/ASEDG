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
      <AlertTitle className="text-lg useTw">Revisa los siguientes campos:</AlertTitle>
      <AlertDescription>
        <div className="max-h-52 overflow-y-auto rounded-md pt-2">
          <ul className="list-decimal pl-0 text-base">
            {errorList.map(([key, error]) => (
              <li key={key}>{error?.message as string}</li>
            ))}
          </ul>
        </div>
      </AlertDescription>
    </Alert>
  )
}
