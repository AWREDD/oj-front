import React, {useEffect, useState} from "react";
import {Button, Card, Col, DatePicker, Divider, Form, Input, Modal, Row} from "antd";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import {DatePickerProps, RangePickerProps} from "antd/es/date-picker";
import TextArea from "antd/es/input/TextArea";
import {request} from "@/utils/request";

interface DataType {
  id: number;
  title: string;
  date: string;
}

const onChange = (
    value: DatePickerProps['value'] | RangePickerProps['value'],
    dateString: [string, string] | string,
) => {
  console.log('Selected Time: ', value);
  console.log('Formatted Selected Time: ', dateString);
};

const onOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
  console.log('onOk: ', value);
};

interface CollectionCreateFormProps {
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
                                                                     open,
                                                                     onCreate,
                                                                     onCancel,
                                                                   }) => {
  const [form] = Form.useForm();
  return (
      <Modal
          open={open}
          title="新建作业"
          okText="Create"
          cancelText="Cancel"
          style={{ maxWidth: 800 }}
          onCancel={onCancel}
          onOk={() => {
            form
                .validateFields()
                .then((values) => {
                  form.resetFields();
                  onCreate(values);
                })
                .catch((info) => {
                  console.log('Validate Failed:', info);
                });
          }}
      >
        <div>
          <Form form={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 700 }}>
            <Form.Item label="Title" name="title">
              <Input />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <TextArea rows={4} />
            </Form.Item>
          </Form>
        </div>
      </Modal>
  );
};

const circleDateColumns: ColumnsType<DataType> = [
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



export default () => {

  const [circlesData, setCirclesData] = useState([]);
  const [newCircleID, setNewCircleID] = useState(0);

  const circleDataColumns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (id) => <a key={id}>{id}</a>,
    },
    {
      title: '题目',
      dataIndex: 'title',
      key: 'title',
      render: (title) => <a key={title}>{title}</a>,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => <a key={date}>{date}</a>,
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      render: (id) => <a href={`/problem/${id}`}>进入</a>,
    }
  ]

  // TODO
  useEffect(() => {
    request.get("http://127.0.0.1:5000/assignment/")
        .then(function (response) {
          console.log(response.data);
          setCirclesData(response.data);
          return response;
        })
  }, []);

  const [open, setOpen] = useState(false);

  const onCreate = (values: any) => {
    console.log('Received values of form: ', values);
    setOpen(false);
  };

  return (
      <div>

        <Row gutter={[24, 24]}>
          <Col span={12} offset={6}>
            <h2 style={{alignItems: 'center'}}>所有讨论</h2>
            <Card style={{ height: 800, width: 800}}>
              <>
                <div>
                  <Button
                      type="primary"
                      onClick={() => {
                        setOpen(true);
                      }}
                  >
                    New Collection
                  </Button>
                  <CollectionCreateForm
                      open={open}
                      onCreate={onCreate}
                      onCancel={() => {
                        setOpen(false);
                      }}
                  />
                </div>
              </>
              <Divider />
              <>
                <Table pagination={false} columns={circleDateColumns} dataSource={circlesData}  />
              </>
            </Card>
          </Col>
        </Row>
      </div>
  );
};
