import React, {useEffect, useState} from "react";
import { history } from "umi";
import { Typography } from "antd";
import { Card } from "antd";
import { Col, Row } from "antd";
import { Button, message, Upload } from "antd";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Statistic } from "antd";
import type { CountdownProps } from "antd";
import {request} from "@/utils/request";

const { Title, Paragraph, Text } = Typography;


export default () => {

    const [data, setData] = useState([]);

    const [contestData, setContestData] = useState({
        id: "1",
        title: "CS233 比赛 1",
        start_at: "2020-09-01",
        due_at: "2020-09-08",
        description:
            "This is the first 比赛 of CS233. Please submit your assignment before the due date.",
        code_id: [1, 2, 3],
    })

    const contest_id =  location.pathname.split("/")[2]
    console.log(contest_id)

    useEffect(() => {
        console.log("assID", contest_id)
        request("/event/competition_detail",{
            method: "POST",
            data: {
                event_id: contest_id,
            }
        })
            .then(function (response) {
                console.log(response.data);
                setContestData(response.data.event);
                return response;
            })
        request("/event/details",{
            method: "POST",
            data: {
                event_id: contest_id,
            }
        })
            .then(function (response) {
                console.log("resData", response.data);
                setData(response.data);
                return response;
            })
    },[])

    const { Countdown } = Statistic;
    const deadline = (new Date (contestData.due_at)).getTime(); // Dayjs is also OK

    interface DataType {
        key: string;
        title: string;
        difficulty: string;
        time_limit: number;
    }

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

    const backward = {
        grade: 100,
        comment: "good job",
    };

    console.log(history.location);
    return (
        <>
            <Row gutter={[24, 24]}>
                <Col span={12} offset={6}>
                    <Card style={{ height: 400 }}>
                        <div>
                            <Typography>
                                <Title level={1}>{contestData.title}</Title>
                                <Title level={5}>
                                    {contestData.start_at} - {contestData.due_at}
                                </Title>
                                <div>
                                    <Countdown
                                        value={deadline}
                                        format="D 天 H 时 m 分 s 秒"
                                    />
                                </div>
                                <Paragraph>{contestData.description}</Paragraph>
                            </Typography>
                        </div>
                    </Card>
                </Col>
            </Row>
            <Row gutter={[24, 24]}>
                <Col span={12} offset={6}>
                    <Card style={{ height: 500 }}>
                        <div>
                            <Typography>
                                <Title level={5}>Problems</Title>
                                <Table pagination={false} columns={columns} dataSource={data} />
                            </Typography>
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    );
};
