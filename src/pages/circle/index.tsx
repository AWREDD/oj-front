import React from "react";
import { Col, Row } from "antd";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

interface DataType {
    title: string,
    date: string,
    content: string,
    author: string,
}

const columns: ColumnsType<DataType> = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Author",
    dataIndex: "author",
    key: "author",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    title: "CS333 Main Topic",
    date: "2020-09-01",
    content: "what is the name of the CS3333 Main Topic?",
    author: "John Jhhanson",
  },
  {
    title: "CS333 Main Topic",
    date: "2020-09-01",
    content: "what is the name of the CS3333 Main Topic?",
    author: "John Jhhanson",
  },
  {
    title: "CS333 Main Topic",
    date: "2020-09-01",
    content: "what is the name of the CS3333 Main Topic?",
    author: "John Jhhanson",
  },
  {
    title: "CS333 Main Topic",
    date: "2020-09-01",
    content: "what is the name of the CS3333 Main Topic?",
    author: "John Jhhanson",
  }
];

export default () => {
  return (
    <>
      <Row>
        <Col span={12} offset={6}>
          col-12 col-offset-6
        </Col>
      </Row>
      <Row>
        <Col span={12} offset={6}>
          <Table columns={columns} dataSource={data} />
        </Col>
      </Row>
    </>
  );
};
