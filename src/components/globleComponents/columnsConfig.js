import { Button } from "antd";

export const productColumns = [
  {
    title: "Image",
    dataIndex: "thumbnail",
    key: "thumbnail",
    render: (text) => (
      <img src={text} alt="Product Thumbnail" style={{ width: 100 }} />
    ),
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    width: 300,
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Discount Percentage",
    dataIndex: "discountPercentage",
    key: "discountPercentage",
  },
  {
    title: "Brand",
    dataIndex: "brand",
    key: "brand",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Button
        onClick={() => record.onSelect(record.id)}
        disabled={record.disabled}
      >
        {record.isSelected ? "Remove" : "Add"}
      </Button>
    ),
  },
];

export const addMoreColumns = [
  {
    title: "Select",
    key: "select",
    render: (_, record) => (
      <Button
        onClick={() => record.onSelect(record.id)}
        disabled={record.disabled}
      >
        {record.isSelected ? "Remove" : "Add"}
      </Button>
    ),
  },
  {
    title: "Image",
    dataIndex: "thumbnail",
    key: "thumbnail",
    render: (text) => (
      <img src={text} alt="Product Thumbnail" style={{ width: 100 }} />
    ),
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    width: 300,
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Discount Percentage",
    dataIndex: "discountPercentage",
    key: "discountPercentage",
  },
  {
    title: "Brand",
    dataIndex: "brand",
    key: "brand",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
];

export const getProductColumns = (comparedProducts, handleCompare) => [
  {
    title: "Image",
    dataIndex: "thumbnail",
    key: "thumbnail",
    render: (text) => (
      <img src={text} alt="Product Thumbnail" style={{ width: 100 }} />
    ),
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    sorter: (a, b) => a.title.localeCompare(b.title),
    width: 200,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    width: 300,
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Discount Percentage",
    dataIndex: "discountPercentage",
    key: "discountPercentage",
  },
  {
    title: "Brand",
    dataIndex: "brand",
    key: "brand",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Compare",
    key: "compare",
    render: (_, record) => {
      const isCompared = comparedProducts.some((item) => item.id === record.id);
      return (
        <Button
          type="primary"
          onClick={() => handleCompare(record)}
          disabled={isCompared}
        >
          {isCompared ? "Compared" : "Compare"}
        </Button>
      );
    },
  },
];
