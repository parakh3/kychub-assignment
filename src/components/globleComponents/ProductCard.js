import React from "react";
import { Col, Card, Button } from "antd";

const ProductCard = ({ product, onRemove, darkMode }) => (
  <Col span={6}>
    <Card
      hoverable
      cover={<img alt={product.title} src={product.thumbnail} />}
      style={{
        backgroundColor: darkMode ? "#333" : "#fff",
        color: darkMode ? "#fff" : "#000",
      }}
    >
      <Card.Meta title={product.title} description={product.description} />
      <p>Price: ${product.price}</p>
      <p>Discount: {product.discountPercentage}%</p>
      <p>Brand: {product.brand}</p>
      <p>Category: {product.category}</p>
      <Button type="link" onClick={() => onRemove(product.id)}>
        Remove
      </Button>
    </Card>
  </Col>
);

export default ProductCard;
