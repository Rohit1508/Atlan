import Editor from "react-simple-code-editor"
import { highlight, languages } from "prismjs/components/prism-core"
import "prismjs/components/prism-clike"
import "prismjs/components/prism-javascript"
import "prismjs/themes/prism.css" //Example style, you can use another
import { useEffect } from "react"
import { format } from "sql-formatter"
import tableIcon from "../../../db-table.svg"
import dbIcon from "../../../icons/database-svgrepo-com.svg"
import styles from "./QueryEditor.module.css"
import { Button } from "antd"
import {
  CaretRightOutlined,
  CloudDownloadOutlined,
  OpenAIOutlined,
  PlayCircleOutlined,
  SaveOutlined,
} from "@ant-design/icons"
const DEFAULT_QUERY = `select * from`

const QueryEditor = ({
  schema,
  selectedDb,
  query,
  updateQuery,
  runQuery,
  updateQueryModal,
  isQueryLoading,
  updateSaveModal,
  isSaveButtonDisabled,
  queryResponse,
  updateSaveButtonStatus,
}): any => {
  useEffect(() => {
    if (schema) {
      updateQuery(format(`${DEFAULT_QUERY} ${schema.name}`))
      //runQuery()
    } else {
      updateQuery(format(`${DEFAULT_QUERY}`))
    }
  }, [schema])

  const handleQueryModal = () => {
    updateQueryModal(true)
  }

  const handleSaveQuery = () => {
    updateSaveModal(true)
  }

  const handleExport = () => {
    const csvRows = []
    const headers = Object.keys(queryResponse.table[0])
    csvRows.push(headers.join(","))
    queryResponse.table.forEach(row => {
      const values = Object.values(row).join(",")
      csvRows.push(values)
    })
    const parsedData = csvRows.join("\n")
    const blob = new Blob([parsedData], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.setAttribute("href", url)
    a.setAttribute("download", "download.csv")
    a.click()
  }

  const handleUpdateQuery = (query: string) => {
    updateQuery(query)
    updateSaveButtonStatus(false)
  }

  return schema ? (
    <div>
      <div className={styles["schema"]}>
        <img src={tableIcon} className={styles["schema-icon"]}></img>
        <div className={styles.schemaName}>{schema?.name.toUpperCase()}</div>
      </div>
      <div className={styles.actionRow}>
        <div className={styles["schema"]}>
          <img src={dbIcon} className={styles["schema-icon"]}></img>
          <div className={styles.dbName}>{selectedDb?.name}</div>
        </div>
        <div className={styles.actionButton}>
          <Button onClick={() => updateQuery(format(query))}>Beautify</Button>
          <Button
            style={{
              background: "rgb(2 133 247)",
              color: "white",
            }}
            onClick={runQuery}
            disabled={!schema}
            loading={isQueryLoading}
            icon={<CaretRightOutlined />}
            type="primary"
          >
            Run
          </Button>
          <Button
            style={{ background: "fffff", color: "black", width: "100px" }}
            onClick={handleQueryModal}
            disabled={!schema}
            icon={<OpenAIOutlined />}
            color={"green"}
          >
            AI Query
          </Button>
          <Button
            style={{ background: "fffff", color: "black", width: "100px" }}
            onClick={handleSaveQuery}
            disabled={isSaveButtonDisabled}
            icon={<SaveOutlined />}
          >
            Save
          </Button>
          <Button
            style={{ background: "fffff", color: "black", width: "100px" }}
            onClick={handleExport}
            icon={<CloudDownloadOutlined />}
            disabled={!queryResponse}
          >
            Export
          </Button>
        </div>
      </div>

      <Editor
        value={query}
        onValueChange={query => handleUpdateQuery(query)}
        highlight={code => highlight(code, languages.js)}
        padding={20}
        preClassName={styles.textareaClassName}
        autoFocus={false}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 14,
          border: "none",
          fontWeight: "800px",
        }}
      />
    </div>
  ) : (
    <div>
      <PlayCircleOutlined />
      <div>No data found</div>
    </div>
  )
}

export default QueryEditor
