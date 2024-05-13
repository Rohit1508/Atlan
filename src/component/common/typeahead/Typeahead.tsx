import type React from "react";
import { useState } from "react"
import styles from "./Typeahead.module.css"

interface Option {
  value: string
  label: string
}

interface Props {
  value: string
  options: Option[]
  onChange: (value: string) => void
  onSelect: (option: Option) => void
}

export const Typeahead: React.FC<Props> = ({
  value,
  options,
  onChange,
  onSelect,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDropdownOpen(true)
    onChange(e.target.value)
  }

  const handleOptionClick = (option: Option) => {
    onSelect(option)
    setIsDropdownOpen(false)
  }

  return (
    <div className={styles.typeahead}>
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder="Type to search..."
      />
      {isDropdownOpen && (
        <ul className={styles.options}>
          {options.map(option => (
            <li key={option.value} onClick={() => handleOptionClick(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
