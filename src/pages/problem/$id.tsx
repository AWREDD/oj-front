import React, {useEffect} from "react";
import { useState } from "react";

import { Select, Card, Button } from "antd";
import { Col, Row } from "antd";
import { Tag, Space } from "antd";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

import { Typography } from "antd";
const { Title, Paragraph, Text } = Typography;

import { Tabs } from "antd";
import type { TabsProps } from "antd";

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import {request} from "@/utils/request";
import {history} from "umi";

interface RecordType {
  key: React.Key;
  time: string;
  status: string;
  memory: string;
  timecost: string;
  language: string;
}

const record_col: ColumnsType<RecordType> = [
  { title: "Time", dataIndex: "create_time", key: "create_time" },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (text: string) => (
      <Tag
        color={
          text === "Accepted"
            ? "green"
            : text === "Wrong Answer"
            ? "red"
            : "orange"
        }
      >
        {text}
      </Tag>
    ),
  },
  { title: "Message", dataIndex: "returned", key: "returned" },
  { title: "Language", dataIndex: "language", key: "language" },
];

const ProblemDetail: React.FC = () => {

  const [submitStatus, setSubmitStatus] = useState(0);

  const changeSubmitStatus = () => {
    if (submitStatus === 0) {
      setSubmitStatus(1);
    } else {
      setSubmitStatus(0);
    }
  }

  const [submitData, setSubmitData] = useState([])

  const [language, setLanguage] = useState("c");

  const [code, setCode] = useState("function onLoad(editor) {\n" +
      "     console.log(\"i've loaded\");\n" +
      "}");

  useEffect(() => {
    let userInfo = JSON.parse(localStorage.getItem("userInfo") as string);
    let user_id = userInfo.user_id;
    request.get("/submit/histories/user/problem?user_id=" + user_id + "&problem_id=" + problem_id + "&page=1&limit=1000")
        .then(function (response) {
          console.log(response.data);
          setSubmitData(response.data);
          return response;
        })
  }, [submitStatus]);

  const problem_id =  location.pathname.split("/")[2]
  console.log(problem_id)

  const [problemDetailData, setProblemDetailData] = useState({
    id: "1",
    title: "测试标题",
    time_limit: "10",
    year: "2000",
    difficulty: "hard",
    derivation: "NOIP",
    content: {
        description: "这个是介绍",
        example: [
          {input: "1", output: "2"},
        ],
        notice: "提示",
        solution: "这个是解析"
    }
  });

  useEffect(() => {
    console.log("useEffect")
    request.get("/problem/detail?id=" + problem_id).then(
        (response) => {
          console.log(response.data.problem)
          const data_content = JSON.parse(response.data.problem.content)
          setProblemDetailData({
            id: response.data.problem.id,
            title: response.data.problem.title,
            time_limit: response.data.problem.time_limit,
            year: response.data.problem.year,
            difficulty: response.data.problem.difficulty,
            derivation: response.data.problem.derivation,
            content: {
                description: data_content.description,
                example: data_content.example,
                notice: data_content.notice,
                solution: data_content.solution
            }
          })

        }
    )
    console.log("fetchData")

  }, []);


  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Description`,
      children: (
        <div>
          <Typography>
            <Title level={4}>description</Title>
            <Paragraph>{problemDetailData.content.description}</Paragraph>
            <Title level={4}>Example</Title>
            <Paragraph type="secondary">
              {problemDetailData.content.example.map((e, i) => (
                <div key={i}>
                  <div>
                    <Typography.Title level={5}>Input</Typography.Title>
                    <Typography.Text key={i} code>
                      {e.input}
                    </Typography.Text>
                  </div>

                  <div>
                    <Typography.Title level={5}>Output</Typography.Title>
                    <Typography.Text key={i} code>
                      {e.output}
                    </Typography.Text>
                  </div>

                </div>
              ))}
            </Paragraph>
            <Title level={4}>Notice</Title>
            <Paragraph>
              {problemDetailData.content.notice}
            </Paragraph>
          </Typography>
        </div>
      ),
    },
    {
      key: "2",
      label: `Solution`,
      children: (
        <div>
          <Typography>
            <Title level={4}>Solution</Title>
            <Paragraph>{problemDetailData.content.solution}</Paragraph>
          </Typography>
        </div>
      ),
    },
    {
      key: "3",
      label: `Record`,
      children: <Table pagination={false} dataSource={submitData} columns={record_col} />,
    },
  ];

  const onChange_tab = (key: string) => {
    console.log(key);
  };

  function onChange_text(newValue:any) {
    console.log("change", newValue);
    setCode(newValue);
    console.log("code", code);
  }

  const onChange_select = (value: string) => {
    console.log(`selected ${value}`);
    setLanguage(value);
  };

  const submitCode = async () => {
    let userInfo = JSON.parse(localStorage.getItem("userInfo") as string)
    await request("/submit/submit",{
      method: 'POST',
      data: {
        user_id: userInfo.user_id,
        problem_id: problem_id,
        code: code,
        language: language,
      }
    })
        .then(res => {
            console.log(res)
            changeSubmitStatus()
        })
  };

  return (
    <div>
      <Row>
        <Col span={12}>
          <div>
            <Card title = {problemDetailData.title} style={{ height: 1000 }}>
              <Space wrap>
                <Tag color="magenta">{problemDetailData.year}</Tag>
                <Tag color="red">{problemDetailData.difficulty}</Tag>
                <Tag color="volcano">{problemDetailData.derivation}</Tag>
              </Space>
              <Tabs
                defaultActiveKey="1"
                items={items}
                onChange={onChange_tab}
              />
            </Card>
          </div>
        </Col>
        <Col span={12}>
          <div>
            <Card
              title="Coding Area"
              extra={
                <Space>
                  <Select
                    placeholder="选择语言"
                    onChange={onChange_select}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={[
                      { value: "c++", label: "c++" },
                      { value: "c", label: "c" },
                    ]}
                  />
                  <Button key={1} type="primary" onClick={submitCode}>
                    Submit
                  </Button>
                </Space>
              }
              style={{ height: 1000 }}
            >
              <AceEditor
                placeholder="Placeholder Text"
                mode="typescript"
                theme="github"
                name="blah2"
                onChange={onChange_text}
                fontSize={14}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={code}
                setOptions={{
                  enableBasicAutocompletion: false,
                  enableLiveAutocompletion: false,
                  enableSnippets: false,
                  showLineNumbers: true,
                  tabSize: 2,
                }}
              />
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProblemDetail;
