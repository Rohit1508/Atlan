import React, { useState } from "react"
import Tabel from "antd/lib/table"
import type { TableProps } from "antd"

const Table = React.memo(({ data, isLoading }: any) => {
  const [rowData, setRowData] = useState<any[]>(
    data?.table.map((row, index) => {
      return { ...row, key: index }
    }),
  )

  const getColumnDefinition: any = () => {
    return (
      data &&
      Object.entries(data.table[0]).map(([key, values]) => {
        return {
          title: key,
          dataIndex: key,
          filterSearch: true,
          sorter: (a, b) => a[key] - b[key],
        }
      })
    )
  }

  React.useEffect(() => {
    setRowData(
      data?.table.map((row, index) => {
        return { ...row, key: index }
      }),
    )
  }, [data?.table])

  interface DataType {
    key: React.Key
    name: string
    age: number
    address: string
  }
  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra,
  ) => {
    console.log("params", pagination, filters, sorter, extra)
  }

  return (
    <div style={{}}>
      <Tabel
        columns={getColumnDefinition()}
        dataSource={rowData}
        onChange={onChange}
        scroll={{ x: "calc(600px + 50%)", y: "38vh" }}
        loading={isLoading}
      />
    </div>
  )
})

export default Table
