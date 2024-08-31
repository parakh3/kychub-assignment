import React from "react";
import { Layout, Avatar, Typography, Switch } from "antd";
import { UserOutlined, BulbOutlined } from "@ant-design/icons";
import { useDarkMode } from "../../hooks/DarkModeContext";

const { Header } = Layout;
const { Title } = Typography;

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <Header
      style={{
        position: "fixed",
        zIndex: 1,
        width: "100%",
        background: darkMode ? "#333" : "#001529",
        color: "#fff",
      }}
    >
      <div style={{ float: "left", color: "#fff" }}>
        <Title level={3} style={{ color: "#fff" }}>
          Product Comparison
        </Title>
      </div>
      <div style={{ float: "right" }}>
        <Avatar icon={<UserOutlined />} />
        <Switch
          checked={darkMode}
          onChange={toggleDarkMode}
          checkedChildren={<BulbOutlined />}
          unCheckedChildren={<BulbOutlined />}
          style={{ marginLeft: "16px" }}
        />
      </div>
    </Header>
  );
};

export default Navbar;
