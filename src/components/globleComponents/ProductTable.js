import React from 'react';
import { Table } from 'antd';

const ProductTable = ({ columns, dataSource, rowKey, pagination, scroll, darkMode }) => {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      rowKey={rowKey}
      pagination={pagination}
      scroll={scroll}
      style={{
        backgroundColor: darkMode ? "#1d1d1d" : "#fff",
        color: darkMode ? "#fff" : "#000",
      }}
    />
  );
};

export default ProductTable;
