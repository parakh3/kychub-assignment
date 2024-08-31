import React, { useEffect, useState } from "react";
import { notification, ConfigProvider } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../hooks/DarkModeContext";
import ProductTable from "../components/globleComponents/ProductTable";
import { getProductColumns } from "../components/globleComponents/columnsConfig";
import { darkTableTheme } from "../components/assets/style";

const ProductDetails = () => {
  const { darkMode } = useDarkMode(); 
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comparedProducts, setComparedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((response) => {
        setData(response.data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleCompare = (record) => {
    if (comparedProducts.some((item) => item.id === record.id)) {
      notification.info({
        message: "Product Already Compared",
        description: "This product is already in the comparison list.",
      });
    } else {
      const updatedComparedProducts = [...comparedProducts, record];
      setComparedProducts(updatedComparedProducts);
      navigate(`/compare-products/${record.id}`);
      notification.success({
        message: "Product Compared",
        description: "Product has been added to the comparison list.",
      });
    }
  };

  const columns = getProductColumns(comparedProducts, handleCompare);

  return (
    <ConfigProvider theme={darkMode ? darkTableTheme : ""}>
      <div
        style={{
          marginTop: "60px",
          backgroundColor: darkMode ? "#1d1d1d" : "#fff",
          color: darkMode ? "#fff" : "#000",
          minHeight: "calc(100vh - 60px)",
        }}
      >
        <ProductTable
          columns={columns}
          dataSource={data}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 1500 }}
          darkMode={darkMode}
        />
      </div>
    </ConfigProvider>
  );
};

export default ProductDetails;
