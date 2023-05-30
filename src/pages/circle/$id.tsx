import React, {useEffect, useState} from "react";
import { UserOutlined } from '@ant-design/icons';
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import {Avatar, Form, List, Space} from "antd";
import { Card, Col, Row, Button, Input } from "antd";
import { Typography } from "antd";
const { Title, Paragraph, Text } = Typography;
import InfiniteScroll from "react-infinite-scroll-component";
import {request} from "@/utils/request";

export default () => {

  const topic_id =  location.pathname.split("/")[2]
  console.log(topic_id)

  const [commentData, setCommentData] = useState("");

  const [commentList, setCommentList] = useState([{}]);
  const onFinish = async (value: any) => {
    await request("/comment/create_comment",{
        method: "POST",
        data: {
            floor_id: topic_id,
            content: value.content,
            contributor: JSON.parse(localStorage.getItem("userInfo") as string).username,
        }
    }).then(function (response) {
        console.log(response.data);
    })
  }

  const [topicData, setTopicData] = useState({
    title: "",
    create_date: "",
    description: "",
    contributor: "",
  });
  const [discussionData, setDiscussionData] = useState([{}]);

  // TODO
  useEffect(() => {
    request("/comment/detail",{
        method: "POST",
        data: {
          topic_id: topic_id,
        }
    })
        .then(function (response) {
          console.log("res1", response.data.floor);
          setTopicData(response.data.floor);
          return response;
        })

    request("/comment/details",{
      method: "POST",
      data: {
        topic_id: topic_id,
      }
    })
        .then(function (response) {
          console.log("res2", response.data);
          setDiscussionData(response.data);
          return response;
        })
  }, []);


  return (
    <div>
      <Row gutter={16} style={{ alignItems: "center" }}>
        <Col span={12} offset={6}>
          <Card>
            <div>
              <Typography>
                <Title level={1}>{topicData.title}</Title>
                <Title level={5}>
                  时间：{topicData.create_at}
                </Title>
                <Title level={5}>
                  作者：{topicData.contributor}
                </Title>
                <Title level={5}>
                    描述：{topicData.description}
                </Title>
              </Typography>
            </div>
          </Card>
        </Col>
        <Col span={12} offset={6}>
          <List
            grid={{ column: 1 }}
            itemLayout="vertical"
            size="large"
            pagination={false}
            dataSource={discussionData}
            renderItem={(item) => (
              <Card>
                <List.Item
                  key={item.title}
                >
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    // TODO: href router
                    title={<a href="\circle">{item.contributor}</a>}
                    description={item.create_at}
                  />
                  <h4>{item.content}</h4>
                </List.Item>
              </Card>
            )}
          />
        </Col>
        <Col span={12} offset={6}>
          <Form
              name="nest-messages"
              onFinish={onFinish}
              style={{ maxWidth: 600 }}
          >
            <Form.Item name="content">
              <Input.TextArea />
            </Form.Item>
            <Form.Item >
              <Button type="primary" htmlType="submit" onClick={onFinish}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
