import { useEffect, useState } from "react"
import { Typeahead } from "../common/typeahead/Typeahead"
import styles from "./Search.module.css"

const options = [
  { value: "1", label: "Apple" },
  { value: "2", label: "Banana" },
  { value: "3", label: "Orange" },
  { value: "4", label: "Grape" },
  { value: "5", label: "Pineapple" },
]

const createOptions = schemas => {
  if (!schemas) {
    return []
  }
  return schemas.map(schema => {
    return {
      value: schema.id,
      label: schema.name,
    }
  })
}

export const SearchSchema = ({ schemas, onSelect, value }) => {
  const [inputValue, setInputValue] = useState(value)
  const [selectedOption, setSelectedOption] = useState<any | null>(null)
  useEffect(() => {
    setInputValue("")
  }, [value])
  const handleInputChange = (value: string) => {
    setInputValue(value)
  }

  const handleSelectOption = (option: any) => {
    //setSelectedOption(option);
    setInputValue(option.label)
    onSelect(schemas.filter(schema => schema.id === option.value)[0])
  }

  return (
    <div className={styles.searchSchema}>
      <Typeahead
        value={inputValue}
        options={createOptions(schemas)}
        onChange={handleInputChange}
        onSelect={handleSelectOption}
      />
      {selectedOption && <p>Selected: {selectedOption.label}</p>}
    </div>
  )
}
