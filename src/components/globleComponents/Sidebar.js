import React from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useDarkMode } from "../../hooks/DarkModeContext";

const Sidebar = () => {
  const { darkMode } = useDarkMode();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Menu
      style={{
        width: 200,
        height: "100vh",
        position: "fixed",
        left: 0,
        top: "64px",
        background: darkMode ? "#1d1d1d" : "#fff",
        boxShadow: darkMode
          ? "2px 0 10px rgba(0, 0, 0, 0.5)"
          : "2px 0 10px rgba(0, 0, 0, 0.1)",
        transition: "box-shadow 0.3s ease",
      }}
      mode="inline"
      selectedKeys={[currentPath]}
      theme={darkMode ? "dark" : "light"}
    >
      <Menu.Item key="/product-details">
        <Link
          to="/product-details"
          style={{ color: darkMode ? "#fff" : "#000" }}
        >
          Product Details
        </Link>
      </Menu.Item>
      <Menu.Item key="/compare-products">
        <Link
          to="/compare-products"
          style={{ color: darkMode ? "#fff" : "#000" }}
        >
          Compare Products
        </Link>
      </Menu.Item>
    </Menu>
  );
};

export default Sidebar;
