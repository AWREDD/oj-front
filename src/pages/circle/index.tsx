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
          title="新建Topic"
          okText="Create"
          cancelText="Cancel"
          style={{ maxWidth: 800 }}
          onCancel={onCancel}
          onOk={() => {
            form
                .validateFields()
                .then((values) => {
                  console.log('Validate Failed:', values);
                  request("/comment/create_topic", {
                    method: 'POST',
                    data: {
                      title: values.title,
                      description: values.description,
                      contributor: JSON.parse(localStorage.getItem("userInfo") as string).username,

                    }
                  }).then(res => {
                    console.log(res);
                  })
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
    title: "Create Time",
    dataIndex: "create_at",
    key: "create_at",
  },
  {
    title: "Author",
    dataIndex: "contributor",
    key: "contributor",
  },
  {
    title: "Action",
    dataIndex: "id",
    key: "id",
    render: (id) => <a href={`/circle/${id}`}>进入</a>,
  },
];



export default () => {

  const [circlesData, setCirclesData] = useState([]);


  // TODO
  useEffect(() => {
    request("/comment/topic")
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
