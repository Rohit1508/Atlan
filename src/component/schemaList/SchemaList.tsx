import styles from "./SchemaList.module.css"
import tableIcon from "../../icons/db-table-svgrepo-com.svg"

export const SchemaList = ({ schemas, onSelect, selectedSchema }) => {
  const handleOptionClick = schema => {
    onSelect(schema)
  }

  return (
    <div className="schema-list">
      {schemas.map(schema => (
        <div key={schema.id} className={styles["schema-item"]}>
          <img src={tableIcon} className={styles["schema-icon"]}></img>
          <div
            className={`${styles["schema-name"]} ${selectedSchema?.id === schema.id && styles.active}`}
            onClick={() => handleOptionClick(schema)}
          >
            {schema.name.toUpperCase()}
          </div>
        </div>
      ))}
    </div>
  )
}
