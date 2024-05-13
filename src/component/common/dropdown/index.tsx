import type React from "react";
import { useEffect, useState } from "react"
import "./index.css"

interface Option {
  icon: string;
  value: string | number
  label: string
}

interface Props {
  options: Option[]
  onSelect: (option: Option) => void
  value: any
}

const Dropdown: React.FC<Props> = ({ options, onSelect, value }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(value);
  useEffect(() => {
    setSelectedOption(value)
  }, [value])


  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleSelect = (option: Option) => {
    setSelectedOption(option)
    onSelect(option)
    setIsOpen(false)
  }

  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={handleToggle}>
        {selectedOption ? (
          <div className="selectedOption">
            <img src={options[0].icon} className="icon" />
            <span>{selectedOption.label}</span>
          </div>
        ) : (
          "Select datasource..."
        )}
        <span className={`arrow ${isOpen ? "open" : ""}`}></span>
      </div>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map(option => (
            <li key={option.value} onClick={() => handleSelect(option)}>
              <img src={option.icon} className="icon" />
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
