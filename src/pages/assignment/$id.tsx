import React, {useEffect, useState} from "react";
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
import {request} from "@/utils/request";

import {useModel} from "umi";

const { Title, Paragraph, Text } = Typography;

export default () => {

  const [assignmentData, setAssignmentData] = useState({
    id: "1",
    title: "CS233 Assignment 1",
    start_at: "2020-09-01",
    due_at: "2020-09-08",
    description: "This is the first assignment of CS233. Please submit your assignment before the due date.",
  })

  const [backwardsData, setBackwardsData] = useState({
    grade: -1,
    comment: "no comment",
  })

  const assignment_id =  location.pathname.split("/")[2]
  console.log(assignment_id)


  useEffect(() => {
      let userInfo = JSON.parse(localStorage.getItem("userInfo") as string);
      let user_id = userInfo.user_id;
    console.log("assID", assignment_id);
    request("/event/assignment_detail",{
        method: "POST",
        data: {
          event_id: assignment_id,
        }
    })
        .then(function (response) {
          console.log(response.data);
          setAssignmentData(response.data.event);
          return response;
        })
    request("/event/backward",{
      method: "POST",
      data: {
        user_id: user_id,
        event_id: assignment_id,
      }
    })
        .then(function (response) {
          console.log("back", response.data);
          setBackwardsData(response.data.upload);
          return response;
        })
  },[])

  const { Countdown } = Statistic;
  const deadline = (new Date (assignmentData.due_at)).getTime(); // Dayjs is also OK

  const [PDFID, setPDFID] = useState(0);
  const onSuccess = async (res: any) => {

    if (typeof(res.file.response) !== "undefined") {
      setPDFID(res.file.response);
      console.log("onSu", res.file.response);
    }
  }
  const PDFUpload = async () => {
      let userInfo = JSON.parse(localStorage.getItem("userInfo") as string);
      let user_id = userInfo.user_id;
    await request("/upload/assignment",{
        method: "POST",
        data: {
            context_id: assignment_id,
            user_id: user_id,
            oss_id: PDFID,
        }
    }).then(
        function (response) {
          console.log(response)
            return response
        }
    )
  }

  return (
    <>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <Card style={{ height: 800 }}>
            <div>
              <Typography>
                <Title level={1}>{assignmentData.title}</Title>
                <Title level={5}>
                  {assignmentData.start_at} - {assignmentData.due_at}
                </Title>
                <div>
                    <Countdown
                      value={deadline}
                      format="D 天 H 时 m 分 s 秒"
                    />
                  </div>
                <Divider />
                <Paragraph>{assignmentData.description}</Paragraph>
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
                <Space>
                  <Upload
                      action="http://10.26.106.209:5001/upload/upload_assignment"
                      listType="zip"
                      maxCount={1}
                      onChange={onSuccess}
                  >
                    <Button icon={<UploadOutlined />}>Upload PDF only</Button>
                  </Upload>
                  <Button type={"primary"} onClick={PDFUpload}>
                    Submit
                  </Button>
                </Space>

              </Typography>
            </div>
            <div>
              <Divider />
              <Typography>
                <Title level={1}>Backward</Title>
                <Title level={5}>grade: {backwardsData.grade}</Title>
                <Title level={5}>Comment</Title>
                <Paragraph>{backwardsData.comment}</Paragraph>
              </Typography>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};
