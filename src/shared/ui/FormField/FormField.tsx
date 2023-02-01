import { Control, Controller, UseControllerProps } from 'react-hook-form'
import { FormControl } from '../Input'

interface FormField extends UseControllerProps {
  placeholder: string
  password?: boolean
  control: Control<any>
  variant?: 'outline' | 'standard' | 'unstyled'
}

export const FormField = ({
  rules,
  name,
  control,
  placeholder,
  password,
  variant
}: FormField) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <FormControl
          type={password ? 'password' : 'text'}
          placeholder={placeholder}
          variant={variant}
          error={!!error}
          helperText={error?.message}
          {...field}
        />
      )}
    />
  )
}
