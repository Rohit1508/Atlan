import { UserOutlined } from "@ant-design/icons"
import { Avatar } from "antd"
import "./styles.css"

export const Header = ({ title, user }) => {
  return (
    <div className="header">
      <div className="left">
        <img
          src="https://avatars.githubusercontent.com/u/47002402?s=280&v=4"
          alt="Logo"
        />
        <div className="title">{title}</div>
      </div>
      <div className="right">
        <Avatar
          style={{ backgroundColor: "#87d068" }}
          icon={<UserOutlined />}
        />
        <p>{user}</p>
      </div>
    </div>
  )
}
