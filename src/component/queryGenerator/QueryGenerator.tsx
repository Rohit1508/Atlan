import { Button, Input, Select, Space } from "antd"
import { TableOutlined } from "@ant-design/icons"
import { useEffect, useRef, useState } from "react"

const QueryGenerator = ({
  tableList,
  selectedSchema,
  suggestedQuery,
  setSuggestedQuery,
}: any) => {
  const [isGenButtonLoading, setIsGenButtonLoading] = useState(false)
  const [selectedAISchemas, setSelectedAISchemas] = useState([
    selectedSchema.name,
  ])
  const inputRef = useRef("")
  const handleChange = (value: string[]) => {
    setSelectedAISchemas([...value])
  }

  useEffect(() => {
    setSelectedAISchemas(selectedSchema.name)
  }, [selectedSchema])

  const options = [
    {
      key: selectedSchema.id,
      value: selectedSchema.name,
      desc: selectedSchema.name,
      emoji: <TableOutlined />,
    },
  ]
  const handleQueryGenerate = async () => {
    if (!inputRef.current?.resizableTextArea.textArea.value) {
      return
    }
    setIsGenButtonLoading(true)
    try {
      fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer`,
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            {
              role: "user",
              content: `${inputRef.current?.resizableTextArea.textArea.value}, selected table = ${selectedAISchemas} and its columns are= ${Object.keys(selectedSchema.table[0])}`,
            },
          ],
        }),
      })
        .then(response => response.json())
        .then(data => {
          setSuggestedQuery(data.choices[0].message.content)
          console.log(data)
          setIsGenButtonLoading(false)
        })
    } catch (error) {
      console.error(error)
      setIsGenButtonLoading(false)
    }
  }

  return (
    <div>
      <h3>Describe what you want to query in English</h3>
      <Input.TextArea
        placeholder="input search text"
        size="large"
        ref={inputRef}
      />
      <h3>Choose Tables</h3>
      <Select
        mode="multiple"
        style={{ width: "100%" }}
        placeholder="select one country"
        defaultValue={[selectedSchema]}
        onChange={handleChange}
        options={options}
        value={selectedAISchemas}
        optionRender={option => (
          <Space>
            <span role="img" aria-label={option.data.label}>
              {option.data.emoji}
            </span>
            {option.data.desc}
          </Space>
        )}
      />
      {suggestedQuery ? (
        <div>
          <Input.TextArea
            placeholder="input search text"
            size="large"
            value={suggestedQuery}
            styles={{ textarea: { marginTop: "10px", height: "100px" } }}
          />
        </div>
      ) : null}
      <Button
        type="primary"
        loading={isGenButtonLoading}
        onClick={handleQueryGenerate}
        style={{ marginTop: "20px" }}
        disabled
      >
        {isGenButtonLoading ? "Generating" : "Generate"}
      </Button>
    </div>
  )
}

export default QueryGenerator