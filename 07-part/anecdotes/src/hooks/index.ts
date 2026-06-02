import { useState } from 'react'

interface InputProps {
  type: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

interface UseFieldReturn {
  inputProps: InputProps
  reset: () => void
}

export const useField = (type: string): UseFieldReturn => {
  const [value, setValue] = useState('')

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  const inputProps: InputProps = { type, value, onChange }

  return { inputProps, reset }
}