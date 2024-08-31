import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  notification,
  Spin,
  Row,
  ConfigProvider,
} from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDarkMode } from "../hooks/DarkModeContext";
import ProductCard from "../components/globleComponents/ProductCard";
import ProductTable from "../components/globleComponents/ProductTable";
import { addMoreColumns } from "../components/globleComponents/columnsConfig";
import { darkTableTheme } from "../components/assets/style";

const CompareProducts = () => {
  const { id } = useParams();
  const { darkMode } = useDarkMode();
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productValid, setProductValid] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isNaN(id) || !id) {
      setProductValid(false);
      return;
    }

    setLoading(true);
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setCompareList([parseInt(id)]);
        setProductValid(true);
      })
      .catch(() => setProductValid(false))
      .finally(() => setLoading(false));

    axios
      .get("https://dummyjson.com/products")
      .then((response) => setAllProducts(response.data.products || []))
      .catch(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!productValid && id) {
      notification.error({
        message: "Invalid Product",
        description: "The product you are trying to view is not available.",
      });
      navigate("/");
    }
  }, [productValid, navigate, id]);

  const handleAddMore = () => setVisible(true);

  const handleOk = () => {
    if (compareList.length + selectedProducts.length > 4) {
      notification.error({
        message: "Cannot Add More Products",
        description: "You can compare up to 4 products only.",
      });
      return;
    }

    const uniqueSelectedProducts = selectedProducts.filter(
      (id) => !compareList.includes(id)
    );

    if (uniqueSelectedProducts.length === 0) {
      notification.info({
        message: "No New Products",
        description: "You have not selected any new products.",
      });
    } else {
      setCompareList((prev) => [...prev, ...uniqueSelectedProducts]);
      setVisible(false);
      notification.success({
        message: "Products Added",
        description: "Products have been added to the comparison list.",
      });
    }
  };

  const handleCancel = () => {
    setVisible(false);
    setSelectedProducts([]);
  };

  const handleAdd = (idToAdd) => {
    setSelectedProducts((prev) => {
      const isSelected = prev.includes(idToAdd);

      if (!isSelected && compareList.length + prev.length >= 4) {
        notification.error({
          message: "Limit Reached",
          description: "You can compare up to 4 products only.",
        });
        return prev;
      }

      const updatedSelection = isSelected
        ? prev.filter((id) => id !== idToAdd)
        : [...prev, idToAdd];

      notification.success({
        message: isSelected ? "Product Removed" : "Product Added",
        description: isSelected
          ? "Product has been removed from the selection list."
          : "Product has been added to the selection list.",
      });

      return updatedSelection;
    });
  };

  const handleRemove = (idToRemove) => {
    setCompareList((prev) => prev.filter((id) => id !== idToRemove));
    notification.success({
      message: "Product Removed",
      description: "Product has been removed from the comparison list.",
    });
  };

  const addMoreData = allProducts.map((product) => ({
    ...product,
    isSelected: selectedProducts.includes(product.id),
    disabled: compareList.includes(product.id),
    onSelect: handleAdd,
  }));

  console.log("addMoreData:", addMoreData);

  const renderCompareView = () => (
    <Row gutter={16}>
      {compareList.map((productId) => {
        const product = allProducts.find((p) => p.id === productId);
        return (
          <ProductCard
            key={productId}
            product={product}
            onRemove={handleRemove}
            darkMode={darkMode}
          />
        );
      })}
    </Row>
  );

  return (
    <ConfigProvider theme={darkMode ? darkTableTheme : ""}>
      <div
        style={{
          marginTop: "60px",
          padding: "0 20px",
          backgroundColor: darkMode ? "#1d1d1d" : "#fff",
          color: darkMode ? "#fff" : "#000",
          minHeight: "calc(100vh - 60px)",
        }}
      >
        <h2>Compare Products</h2>
        {productValid ? (
          <>
            {compareList.length < 2 ? (
              <p>Please select at least 2 products to compare.</p>
            ) : (
              renderCompareView()
            )}
            <Button
              type="primary"
              onClick={handleAddMore}
              style={{ marginTop: 20 }}
            >
              Add More
            </Button>
          </>
        ) : (
          <>
            <p>The product you are trying to view is not available.</p>
            <Button
              type="primary"
              onClick={() => navigate("/product-details")}
              style={{ marginTop: 20 }}
            >
              Add Product
            </Button>
          </>
        )}
        <Modal
          title="Add More Products"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          width={1000}
          style={{
            backgroundColor: darkMode ? "#1d1d1d" : "#fff",
            color: darkMode ? "#fff" : "#000",
          }}
        >
          {loading ? (
            <Spin
              tip="Loading..."
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 300,
              }}
            />
          ) : (
            <ProductTable
              columns={addMoreColumns}
              dataSource={addMoreData}
              rowKey="id"
              pagination={{ pageSize: 5 }}
              scroll={{ y: 300 }}
              darkMode={darkMode}
            />
          )}
        </Modal>
      </div>
    </ConfigProvider>
  );
};

export default CompareProducts;
