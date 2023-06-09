import React, {useEffect, useState} from 'react';
import {Button, Space, Row, Col, Modal, Steps, Divider, Table, Card, Form, Input, DatePicker} from 'antd';
import { history } from 'umi';
import assignment from "@/pages/assignment/index";
import {request} from "@/utils/request";
import TextArea from "antd/es/input/TextArea";
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  id: number;
  title: string;
  deadline: string;
}

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface CollectionCreateFormProps {
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const onChangeDDL = (
    value: DatePickerProps['value'] | RangePickerProps['value'],
    dateString: [string, string] | string,
) => {
  console.log('Selected Time: ', value);
  console.log('Formatted Selected Time: ', dateString);
};

const onOkDDL = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
  console.log('onOk: ', value);
};

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
                    console.log('Validate Failed:', values);
                    request("/event/create_assignment", {
                        method: 'POST',
                        data: {
                            title: values.title,
                            description: values.description,
                            start_at: values.start_at,
                            due_at: values.due_at,
                        }
                    }).then(res => {
                        console.log(res);
                    })
                  onCreate(values);
                })
                .catch((info) => {

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
            <Form.Item label="Start Time" name="start_at">
              <DatePicker showTime onChange={onChangeDDL} onOk={onOkDDL} />
            </Form.Item>
              <Form.Item label="End Time" name="due_at">
                  <DatePicker showTime onChange={onChangeDDL} onOk={onOkDDL} />
              </Form.Item>
          </Form>
        </div>
      </Modal>
  );
};

export default ()=>{

  const [assignmentData, setAssignmentData] = useState([]);
  const [newAssignmentID, setNewAssignmentID] = useState(0);

  // TODO
  useEffect(() => {
    request.get("/event/assignment")
        .then(function (response) {
          console.log(response.data);
          setAssignmentData(response.data);
          return response;
        })
  }, []);

  const assignmentDataColumns: ColumnsType<DataType> = [
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
      // TODO: deadline 名字？
    {
      title: 'Start',
      dataIndex: 'start_at',
      key: 'start_at',
      render: (start_at) => <a key={start_at}>{start_at}</a>,
    },
      {
          title: 'End',
          dataIndex: 'due_at',
          key: 'due_at',
          render: (due_at) => <a key={due_at}>{due_at}</a>,
      },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      render: (id) => <a href={`/assignment/${id}`}>进入</a>,
    }
  ]

  const [open, setOpen] = useState(false);

  const onCreate = (values: any) => {
    console.log('Received values of form: ', values);
    setOpen(false);
  };

  return(
    <div>

      <Row gutter={[24, 24]}>
        <Col span={12} offset={6}>
          <h2 style={{alignItems: 'center'}}>所有作业</h2>
          <Card style={{ height: 800, width: 800}}>
            <>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              <div>
                <Button
                    disabled={JSON.parse(localStorage.getItem("userInfo") as string).level === 1}
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
              <Table pagination={false} columns={assignmentDataColumns} dataSource={assignmentData}  />
            </>
          </Card>
        </Col>
      </Row>
    </div>
    
  )
}