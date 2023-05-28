import React, { useState } from 'react';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  InputNumber,
  message,
  Modal,
  Row,
  Steps,
  Switch,
  Upload,
  Form,
  Cascader, Input, Radio, Checkbox, Select, DatePickerProps
} from 'antd';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { history} from 'umi';
import request from 'umi-request';
import {MinusCircleOutlined, PlusOutlined, UploadOutlined} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
const { Step } = Steps;
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

const { Dragger } = Upload;

// upload



interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

function RangePicker() {
  return null;
}

export default () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
    // setNewProblem(JSON.stringify(values));
  };

  const steps = [
    {
      title: 'First',
      content: <div>
        <Divider></Divider>
        <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ maxWidth: 500 }}
            onFinish={onFinish}
        >
          <Form.Item label="Title" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="Time Limit" name="time_limit">
            <InputNumber/>
          </Form.Item>
          <Form.Item label="Year" name="year">
            <InputNumber/>
          </Form.Item>
          <Form.Item label="Difficulty" name="difficulty">
            <Select
                style={{ width: 120 }}
                options={[
                  { value: 'easy', label: 'easy' },
                  { value: 'midium', label: 'midium' },
                  { value: 'hard', label: 'hard' },
                ]}
            />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <TextArea rows={4} />
          </Form.Item>
          <Form.List label="Example" name="example">
            {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                      <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item
                            {...restField}
                            name={[name, 'first']}
                            rules={[{ required: true, message: 'Missing first name' }]}
                        >
                          <Input placeholder="Input" />
                        </Form.Item>
                        <Form.Item
                            {...restField}
                            name={[name, 'last']}
                            rules={[{ required: true, message: 'Missing last name' }]}
                        >
                          <Input placeholder="Output" />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Add field
                    </Button>
                  </Form.Item>
                </>
            )}
          </Form.List>
          <Form.Item >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>,
    },
    {
      title: 'Second',
      content: <div>
        <Divider></Divider>
        <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture"
            maxCount={1}
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </div>,
    },
  ];

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  const [current, setCurrent] = useState(0);

  const [newProblem, setNewProblem] = useState();

  const onChangeStep = (value: number) => {
    console.log('onChange:', value);
    setCurrent(value);
  };

  const createProblem = async () => {

  };

  const getProblemDetail = async (id: number) => {
    let res = await request(`/problem/${id}`, {
        method: 'GET',
    });
    console.log(res);
  };

  const submitCode = async (user_id: number, language: string, code: string) => {
    let res = await request(`/problem/submit`, {
        method: 'POST',
        data: {
          language: language,
          code: code,
        }
    });
    console.log(res);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <a key={status}>{status}</a>,
    },
    {
      title: '题目',
      dataIndex: 'title',
      key: 'title',
      render: (title) => <a key={title}>{title}</a>,
    },
    {
      title: '年份',
      dataIndex: 'year',
      key: 'year',
      render: (year) => <Tag color={'green'} key={year}>{year}</Tag>
    },
    {
      title: '难度',
      dataIndex: 'difficulty',
      key: 'difficulty',
      render: (difficulty) => <Tag color={
        difficulty === "easy"
            ? "green"
            : difficulty === "medium"
                ? "yellow"
                : "red"
      } key={difficulty}>{difficulty}</Tag>
    },
    {
      title: '出处',
      dataIndex: 'derivation',
      key: 'derivation',
      render: (derivation) => <Tag color={'blue'} key={derivation}>{derivation}</Tag>
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      render: (id) => <a href={id}>进入</a>,
    }
  ];

  const data: any = [
    {
      id: '1',
      status: '1',
      title: '两数相加1',
      year: '2021',
      difficulty: 'easy',
      derivation: 'noip'
    },
    {
      id: '2',
      status: '0',
      title: '两数相加2',
      year: '2021',
      difficulty: 'easy',
      derivation: 'noip'
    },
    {
      id: '3',
      status: '1',
      title: '两数相加3',
      year: '2021',
      difficulty: 'medium',
      derivation: 'noi'
    },
    {
      id: '4',
      status: '0',
      title: '两数相加4',
      year: '2022',
      difficulty: 'hard',
      derivation: 'acm'
    },
  ];

  const goProblemDetail = (id: number) => {
    history.push(`/problem/${id}`);
  };
  return (
      <div>
          <Row gutter={[24, 24]}>
            <Col span={12} offset={6}>
              <Card style={{ height: 800 }}>
                <>
                  <Button block onClick={showModal}>
                    Add Problem
                  </Button>
                  <Modal
                      title="添加题目"
                      open={open}
                      onOk={handleOk}
                      confirmLoading={confirmLoading}
                      onCancel={handleCancel}
                      width={700}
                      okButtonProps={{ disabled: current === 0 }}
                  >
                    <>
                      <Steps current={current} onChange={onChangeStep}>
                        {steps.map((item) => (
                            <Step key={item.title} title={item.title} />
                        ))}
                      </Steps>
                      <div className="steps-content">{steps[current].content}</div>
                    </>
                  </Modal>
                </>
                <Divider />
                <>
                  <Table pagination={false} columns={columns} dataSource={data}  />
                  <div>{newProblem}</div>
                </>



              </Card>

            </Col>
          </Row>

      </div>
      )

}
  