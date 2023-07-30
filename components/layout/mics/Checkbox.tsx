import React from 'react'

import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'

type TProps = {
  label: string
  value: boolean
  onChange: (arg: boolean) => void
}

const Checkbox: React.FC<TProps> = ({ onChange, value, label }) => {
  return (
    <fieldset className="flex w-full justify-between items-center">
      <label
        onChange={() => onChange(!value)}
        className="w-full text-start py-2 text-lg text-accent font-semibold tracking-wide"
      >
        {label}
      </label>

      {value ? (
        <ImCheckboxChecked onClick={() => onChange(false)} className="w-8 h-8 text-primary" />
      ) : (
        <ImCheckboxUnchecked onClick={() => onChange(true)} className="w-8 h-8 text-primary" />
      )}
    </fieldset>
  )
}

export default Checkbox
