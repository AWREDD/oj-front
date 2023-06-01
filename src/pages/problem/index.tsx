// @ts-ignore

import React, {useEffect, useState} from 'react';
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
import {MinusCircleOutlined, PlusOutlined, UploadOutlined} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
const { Step } = Steps;

import { request } from '@/utils/request';


// upload

interface DataType {
    id: number;
    title: string;
    time_limit: number;
    year: number;
    difficulty: number;
    derivation: string;
    content: string;
}

function RangePicker() {
  return null;
}

export default function ProblemBank(){


  console.log("user", localStorage.getItem("userInfo"));


  const [data, setData] = useState([]);

  const [newProblemID, setNewProblemID] = useState(0);

  const [zipID, setZipID] = useState(0);

  useEffect(() => {
    request.get("/problem/?page=1&limit=1000")
        .then(function (response) {
          console.log(response.data);
          setData(response.data);
          return response;
        })
  }, []);

  const onFinish1 = async (values: any) => {
    console.log('Success:', {
      title: values.title,
      time_limit: values.time_limit,
      year: values.year,
      difficulty: values.difficulty,
      derivation: values.derivation,
      content: JSON.stringify({
        description: values.description,
        example: values.example,
        solution: values.solution,
        notice: values.notice,
      })
    });
    let res = await request(`/problem/create`, {
      method: 'POST',
      data: {
        title: values.title,
        time_limit: values.time_limit,
        year: values.year,
        difficulty: values.difficulty,
        derivation: values.derivation,
        content: JSON.stringify({
            description: values.description,
            example: values.example,
            solution: values.solution,
            notice: values.notice,
        })
      }
    });
    console.log("F1", res);
    setNewProblemID(res);
  };

  const onFinish2 = async () => {
    console.log('onFinish2', zipID, newProblemID);

    let res = await request(`/upload/zip`, {
        method: 'POST',
        data: {
          oss_id: zipID,
          problem_id: newProblemID,
        }
    })
    console.log("onF2", res);
  };

  const onSuccess = async (res: any) => {

    if (typeof(res.file.response) !== "undefined") {
      setZipID(res.file.response);
      console.log("onSu", res.file.response);
    }
  }


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
            onFinish={onFinish1}
        >
          <Form.Item label="Title" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="Derivation" name="derivation">
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
                options={[{ value: 'easy', label: 'easy' }, { value: 'medium', label: 'midium' }, { value: 'hard', label: 'hard' },]}
            />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Solution" name="solution">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Notice" name="notice">
            <TextArea rows={4} />
          </Form.Item>
          <Form.List label="Example" name="example">
            {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                      <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item
                            {...restField}
                            name={[name, 'input']}
                            rules={[{ required: true, message: 'Missing first name' }]}
                        >
                          <Input placeholder="Input" />
                        </Form.Item>
                        <Form.Item
                            {...restField}
                            name={[name, 'output']}
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
            <Button type="primary" htmlType="submit" onClick={onFinish1}>
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
        <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ maxWidth: 500 }}
            onFinish={onFinish2}
        >
          <Form.Item>
            <Upload
                action="http://10.26.106.209:5001/upload/upload_zip"
                listType="zip"
                maxCount={1}
                onChange={onSuccess}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={onFinish2}>submit</Button>
          </Form.Item>
        </Form>

      </div>,
    },
  ];

  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  const [current, setCurrent] = useState(0);

  const onChangeStep = (value: number) => {
    console.log('onChange:', value);
    setCurrent(value);
  };

  const columns: ColumnsType<DataType> = [
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
      render: (id) => <a href={`/problem/${id}`}>进入</a>,
    }
  ];

  return (
      <div>
          <Row gutter={[24, 24]}>
            <Col span={12} offset={6}>
              <Card style={{ height: 800, width: 800}}>
                <>
                  <Button disabled={JSON.parse(localStorage.getItem("userInfo") as string).level === 1} block onClick={showModal}>
                    Add Problem
                  </Button>
                  <Modal
                      title="添加题目"
                      open={open}
                      onOk={handleCancel}
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

                </>
              </Card>

            </Col>
          </Row>

      </div>
      )

}
  