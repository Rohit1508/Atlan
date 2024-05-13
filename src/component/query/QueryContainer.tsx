import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { getSelectedTab, setSavedQueries } from "../explorer/explorerSlice"
import { lazy, Suspense } from "react"
import styles from "./Query.module.css"
import { useState, useRef } from "react"
import { processQuery } from "./queryApi"
import { Modal } from "antd"
import ConsoleSqlOutlined from "@ant-design/icons/ConsoleSqlOutlined"
import { Input } from "antd"
import { PlayCircleOutlined } from "@ant-design/icons"
import { message } from "antd"
const Table = lazy(() => import("../common/table/Table"))
const QueryEditor = lazy(() => import("./queryEditor/QueryEditor"))
const QueryGenerator = lazy(() => import("../queryGenerator/QueryGenerator"))

const QueryContainer = () => {
  const selectedTab = useAppSelector(getSelectedTab)
  const { selectedDb, selectedSchema } = selectedTab || {}
  const [query, updateQuery] = useState("")
  const [queryResponse, updateQueryResponse] = useState(null)
  const [queryLoading, updateQueryLoading] = useState(false)
  const [isQueryModalOpen, updateQueryModal] = useState(false)
  const [isSaveModalOpen, updateSaveModal] = useState(false)
  const [isSaveButtonDisabled, updateSaveButtonStatus] = useState(false)
  const [suggestedQuery, setSuggestedQuery] = useState("")
  const dispatch = useAppDispatch()
  const saveQueryName = useRef("")
  const [messageApi, contextHolder] = message.useMessage()

  const handleCancel = (modalName: string) => {
    if (modalName === "save") {
      updateSaveModal(false)
    } else {
      updateQueryModal(false)
    }
  }

  const runQuery = () => {
    updateQueryLoading(true)
    processQuery(query, selectedSchema).then(res => {
      updateQueryResponse(res)
      updateQueryLoading(false)
    })
  }
  const copyToClipboard = () => {
    navigator.clipboard.writeText(suggestedQuery)
    messageApi.info("Copy to clipboard")
  }

  const saveQuery = (queryName: string) => {
    dispatch(setSavedQueries({ queryName, tabId: selectedTab.tabId }))
    updateSaveButtonStatus(true)
    updateSaveModal(false)
  }

  return selectedSchema ? (
    <div className={styles.queryContainer}>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <QueryEditor
            schema={selectedSchema}
            selectedDb={selectedDb}
            query={query}
            updateQuery={updateQuery}
            runQuery={runQuery}
            updateQueryModal={updateQueryModal}
            updateSaveModal={updateSaveModal}
            isQueryLoading={queryLoading}
            isSaveButtonDisabled={isSaveButtonDisabled}
            updateSaveButtonStatus={updateSaveButtonStatus}
            queryResponse={queryResponse}
          />
        </Suspense>
      </div>
      {contextHolder}
      <Modal
        title="Generate SQL Query"
        open={isQueryModalOpen}
        onCancel={() => handleCancel("AI")}
        width={1000}
        okText="Copy"
        onOk={copyToClipboard}
      >
        <QueryGenerator
          tableList={selectedDb?.schema}
          selectedSchema={selectedSchema}
          suggestedQuery={suggestedQuery}
          setSuggestedQuery={setSuggestedQuery}
        />
      </Modal>
      <Modal
        title="Save SQL Query"
        open={isSaveModalOpen}
        onCancel={() => handleCancel("save")}
        width={400}
        onOk={() => saveQuery(saveQueryName.current?.input?.value)}
        okText={"Save"}
      >
        <Input placeholder="Query name" ref={saveQueryName} />
      </Modal>

      {!queryResponse ? (
        <div className={styles.run}>
          <PlayCircleOutlined
            style={{ fontSize: "50px", color: "blue" }}
            onClick={runQuery}
          />
          <div>Please run the Query</div>
        </div>
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <div>
            <Table data={queryResponse} isLoading={queryLoading} />
          </div>
        </Suspense>
      )}
    </div>
  ) : (
    <div className={styles["ant-tabs-content-holder"]}>
      <ConsoleSqlOutlined style={{ fontSize: "120px", color: "blue" }} />{" "}
      <h1>Please select schema</h1>
    </div>
  )
}
export default QueryContainer
