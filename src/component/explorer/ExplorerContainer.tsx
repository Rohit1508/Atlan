import { useEffect, useState } from "react"
import { getDBList } from "../../mock"
import Dropdown from "../common/dropdown"
import { SearchSchema } from "../searchSchema/SearchSchema"
import styles from "./Explorer.module.css"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  setCurrentDb,
  setCurrentSchema,
  getSelectedTab,
  getSavedQueries,
  setCurrentTab,
} from "./explorerSlice"
import { SchemaList } from "../schemaList/SchemaList"
import dbIcon from "../../icons/database-svgrepo-com.svg"
import { HolderOutlined } from "@ant-design/icons"

const ExplorerContainer = () => {
  const dbList = getDBList()
  const selectedTab = useAppSelector(getSelectedTab)
  const savedQueries = useAppSelector(getSavedQueries)
  const { tabId } = selectedTab || {}
  const [selectedDbOption, setSelectedDbOption] = useState(null)
  const [selectedSchema, setSelectedSchema] = useState(null)
  const dispatch = useAppDispatch()

  useEffect(() => {
    selectedTab?.selectedDb && setSelectedDbOption(selectedTab.selectedDb)
  }, [selectedTab])

  const dbOptions = dbList.map(item => {
    return {
      value: item.id,
      label: item.name,
      icon: dbIcon,
    }
  })

  const getSelectedDb = option => {
    return dbList.filter(db => db.id == option?.value)[0]
  }
  const handleSelectDb = option => {
    const selectedDb = getSelectedDb(option)
    setSelectedDbOption(selectedDb)
    dispatch(setCurrentDb({ selectedDb, tabId }))
  }

  const handleSelectTable = option => {
    setSelectedSchema(option)
    dispatch(setCurrentSchema({ selectedSchema: option, tabId }))
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  return (
    <div className={styles.explorerContainer}>
      <Dropdown
        options={dbOptions}
        onSelect={handleSelectDb}
        value={
          selectedTab?.selectedDb
            ? {
                value: selectedTab?.selectedDb?.id,
                label: selectedTab?.selectedDb?.name,
                icon: dbIcon,
              }
            : null
        }
      />
      <div className={styles.schema}>
        <SearchSchema
          schemas={selectedDbOption?.schema}
          onSelect={handleSelectTable}
          value={selectedSchema?.name}
        />
        {selectedDbOption && (
          <SchemaList
            schemas={selectedDbOption.schema}
            onSelect={handleSelectTable}
            selectedSchema={selectedTab.selectedSchema}
          />
        )}
      </div>
      {savedQueries.length ? (
        <div className={styles.savedQueries}>
          <div className={styles.savedQueriesTitle}>Saved queries</div>
          {savedQueries.map(query => {
            return (
              <div className={styles.queryList} onClick={() => dispatch(setCurrentTab({tabId: query.tabId}))}>
                <HolderOutlined />
                <div>{capitalizeFirstLetter(query.queryName)}</div>
              </div>
            )
          })}
        </div>
      ): null}
    </div>
  )
}

export default ExplorerContainer