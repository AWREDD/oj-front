import React, {useEffect, useState} from "react";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { Avatar, List, Space } from "antd";
import { Card, Col, Row, Button, Input } from "antd";
import { Typography } from "antd";
const { Title, Paragraph, Text } = Typography;
import InfiniteScroll from "react-infinite-scroll-component";
import {request} from "@/utils/request";

export default () => {

  const [mainDate, setMainDate] = useState({});
  const [newReplyID, setNewReplyID] = useState(0);

  // TODO
  useEffect(() => {
    request.get("/assignment/")
        .then(function (response) {
          console.log(response.data);
          setAssignmentData(response.data);
          return response;
        })
  }, []);

  // data

  const main_data = {
    title: "CS333 Main Topic",
    date: "2020-09-01",
    content: "what is the name of the CS3333 Main Topic?",
    author: "John Jhhanson",
  };

  const data = Array.from({ length: 23 }).map((_, i) => ({
    href: "https://ant.design",
    title: `ant design part ${i}`,
    avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=1`,
    description:
      "Ant Design, a design language for background applications, is refined by Ant UED Team.",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
  }));

  const circle_data = [
    {
      id: 1,
      avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=1`,
      title: "discussion01",
      date: "2020-09-01",
      content: "what is the name of the discussion 01?",
      author: "John",
      reply: 2,
    },
    {
      id: 2,
      avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=2`,
      title: "discussion02",
      date: "2020-09-02",
      content: "what is the name of the discussion 02?",
      author: "John",
      reply: 3,
    },
    {
      id: 3,
      avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=3`,
      title: "discussion03",
      date: "2020-09-03",
      content: "what is the name of the discussion 03?",
      author: "John",
      reply: 4,
    },
    {
      id: 4,
      avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=4`,
      title: "discussion04",
      date: "2020-09-04",
      content: "what is the name of the discussion 04?",
      author: "John",
      reply: 5,
    },
  ];

  const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  console.log(data);

  // changer

  return (
    <div>
      <Row gutter={16} style={{ alignItems: "center" }}>
        <Col span={12} offset={6}>
          <Card>
            <div>
              <Typography>
                <Title level={1}>{main_data.title}</Title>
                <Title level={5}>
                  {main_data.date} {main_data.author}
                </Title>
                <Paragraph>{main_data.content}</Paragraph>
              </Typography>
            </div>
          </Card>
        </Col>
        
        <Col span={12} offset={6}>
          <Space.Compact style={{ width: "100%" }}>
            <Input defaultValue="Combine input and button" />
            <Button type="primary">Submit</Button>
          </Space.Compact>
        </Col>

        <Col span={12} offset={6}>
          <List
            grid={{ column: 1 }}
            itemLayout="vertical"
            size="large"
            pagination={{
              // TODO: 翻页
              simple: true,
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 5,
              align: "center",
            }}
            dataSource={circle_data}
            renderItem={(item) => (
              <Card>
                <List.Item
                  key={item.title}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    // TODO: href router
                    title={<a href="\circle">{item.author}</a>}
                    description={item.date}
                  />
                  {item.content}
                </List.Item>
              </Card>
            )}
          />
        </Col>
      </Row>
    </div>
  );
};
