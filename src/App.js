import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import Navbar from "./components/globleComponents/Navbar";
import Sidebar from "./components/globleComponents/Sidebar";
import ProductDetails from "./pages/ProductDetails";
import CompareProducts from "./pages/CompareProducts";
import { DarkModeProvider, useDarkMode } from "./hooks/DarkModeContext";

const { Content, Sider } = Layout;

const AppContent = () => {
  const { darkMode } = useDarkMode();

  return (
    <Layout
      style={{
        minHeight: "100vh",
        backgroundColor: darkMode ? "#1d1d1d" : "#fff",
      }}
    >
      <Navbar />
      <Layout>
        <Sider
          style={{
            backgroundColor: darkMode ? "#333" : "#fff",
            color: darkMode ? "#fff" : "#000",
          }}
          width={200}
        >
          <Sidebar />
        </Sider>
        <Layout
          style={{
            padding: "0 24px",
            minHeight: 280,
            backgroundColor: darkMode ? "#1d1d1d" : "#fff",
          }}
        >
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              backgroundColor: darkMode ? "#1d1d1d" : "#fff",
              color: darkMode ? "#fff" : "#000",
            }}
          >
            <Routes>
              <Route path="/product-details" element={<ProductDetails />} />
              <Route path="/compare-products" element={<CompareProducts />} />
              <Route
                path="/compare-products/:id"
                element={<CompareProducts />}
              />
              <Route path="/" element={<ProductDetails />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

function App() {
  return (
    <Router>
      <DarkModeProvider>
        <AppContent />
      </DarkModeProvider>
    </Router>
  );
}

export default App;
