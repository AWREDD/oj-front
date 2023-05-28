import React from "react";
import { history } from "umi";
import {Divider, Typography} from "antd";
import { Card } from "antd";
import { Col, Row } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, message, Upload } from "antd";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Statistic } from "antd";
import type { CountdownProps } from "antd";

const { Title, Paragraph, Text } = Typography;

const props: UploadProps = {
  beforeUpload: (file) => {
    const isPNG = file.type === "image/png";
    if (!isPNG) {
      message.error(`${file.name} is not a png file`);
    }
    return isPNG || Upload.LIST_IGNORE;
  },
  onChange: (info) => {
    console.log(info.fileList);
  },
};

export default () => {

  console.log(history.location);


  const description = {
    title: "CS233 Assignment 1",
    create_date: "2020-09-01",
    due_date: "2020-09-08",
    content:
      "This is the first assignment of CS233. Please submit your assignment before the due date.",
    assignment_url: "http://www.baidu.com/xxx.png",
    code_id: [1, 2, 3],
  };

  const { Countdown } = Statistic;
  const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Dayjs is also OK

  interface DataType {
    key: string;
    title: string;
    difficulty: string;
    time_limit: number;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "difficulty",
      dataIndex: "difficulty",
      key: "difficulty",
      render: (difficulty) => {
        let color =
          difficulty === "easy"
            ? "green"
            : difficulty === "medium"
            ? "yellow"
            : "red";
        return (
          <Tag color={color} key={difficulty}>
            {difficulty.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "time_limit",
      dataIndex: "time_limit",
      key: "time_limit",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>go</a>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      title: "quiz1",
      difficulty: "easy",
      time_limit: 1000,
    },
    {
      key: "2",
      title: "quiz2",
      difficulty: "easy",
      time_limit: 1000,
    },
    {
      key: "3",
      title: "quiz3",
      difficulty: "medium",
      time_limit: 1000,
    },
    {
      key: "4",
      title: "quiz4",
      difficulty: "hard",
      time_limit: 1000,
    },
  ];

  const backward = {
    grade: 100,
    comment: "good job",
  };

  console.log(history.location);
  return (
    <>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <Card style={{ height: 800 }}>
            <div>
              <Typography>
                <Title level={1}>{description.title}</Title>
                <Title level={5}>
                  {description.create_date} - {description.due_date}
                </Title>
                <div>
                    <Countdown
                      value={deadline}
                      format="D 天 H 时 m 分 s 秒"
                    />
                  </div>
                <Divider />
                <Paragraph>{description.content}</Paragraph>
              </Typography>
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card style={{ height: 800 }}>
            <div>
              <Typography>
                <Title level={1}>Submit</Title>
                <Title level={5}>Upload PDF part</Title>
                <Upload {...props}>
                  <Button icon={<UploadOutlined />}>Upload png only</Button>
                </Upload>
                <Title level={5}>Code Quiz</Title>
                <Table pagination={false} columns={columns} dataSource={data} />
              </Typography>
            </div>
            <div>
              <Divider />
              <Typography>
                <Title level={1}>Backward</Title>
                <Title level={5}>grade: {backward.grade}</Title>
                <Title level={5}>Comment</Title>
                <Paragraph>{backward.comment}</Paragraph>
              </Typography>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};
