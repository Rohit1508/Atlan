import type React from "react"
import { lazy, useEffect, useRef, useState } from "react"
import { Tabs } from "antd"
const QueryContainer = lazy(() => import("../QueryContainer"))
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { getSelectedTab, setCurrentTab } from "../../explorer/explorerSlice"

type TargetKey = React.MouseEvent | React.KeyboardEvent | string

const initialItems = [
  { label: "untitled", children: <QueryContainer />, key: "0" },
]

export const QueryTab: React.FC = () => {
  const selectedTab = useAppSelector(getSelectedTab)
  const [activeKey, setActiveKey] = useState(initialItems[0].key)
  const [items, setItems] = useState(initialItems)
  const newTabIndex = useRef(1)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setCurrentTab({ tabId: Number(activeKey) }))
  }, [activeKey])

  useEffect(() => {
    const { selectedDb, tabId } = selectedTab || {}
    const result = items.map(item => {
      if (Number(item.key) === tabId) {
        return {
          ...item,
          label: selectedDb?.name,
        }
      }
      return item
    })
    selectedDb && setItems(result)
  }, [selectedTab])

  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey)
  }

  const add = () => {
    const newActiveKey = `${newTabIndex.current++}`
    const newPanes = [...items]
    newPanes.push({
      label: "untitled",
      children: <QueryContainer />,
      key: newActiveKey,
    })
    setItems(newPanes)
    setActiveKey(newActiveKey)
  }

  const remove = (targetKey: TargetKey) => {
    if (items.length === 1) {
      return
    }
    let newActiveKey = activeKey
    let lastIndex = -1
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1
      }
    })
    const newPanes = items
      .filter(item => item.key !== targetKey)
      .map((item, index) => {
        return { ...item, key: `${item.key}` }
      })
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key
      } else {
        newActiveKey = newPanes[0].key
      }
    }
    setItems(newPanes)
    setActiveKey(newActiveKey)
  }

  const onEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: "add" | "remove",
  ) => {
    if (action === "add") {
      add()
    } else {
      remove(targetKey)
    }
  }

  return (
    <Tabs
      type="editable-card"
      onChange={onChange}
      activeKey={activeKey}
      onEdit={onEdit}
      items={items}
    />
  )
}
