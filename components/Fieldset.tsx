import type { ChangeEvent } from 'react'

type TProps = {
  name: string
  type: string
  label: string
  value?: string | number
  readOnly?: boolean
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const FieldSet = ({ name, type, label, value, readOnly, onChange }: TProps) => {
  return (
    <fieldset className="flex flex-col w-full justify-center items-center">
      <label htmlFor={name} className="w-full text-start py-2 text-lg text-accent font-semibold tracking-wide">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        readOnly={readOnly}
        value={value || ''}
        placeholder={label}
        onChange={onChange}
        autoComplete="off"
        className="p-3 rounded-sm outline-none text-lg w-full font-semibold tracking-wide"
      />
    </fieldset>
  )
}

export default FieldSet
