import React from 'react';
import { Space, Table, Tag, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { history } from 'umi';

// changer


interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}





export default () => {
  const columns: ColumnsType<DataType> = [
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <a>{status}</a>,
    },
    {
      title: '题目',
      dataIndex: 'title',
      key: 'title',
      render: (title) => <a>{title}</a>,
    },
    {
      title: '年份',
      dataIndex: 'year',
      key: 'year',
      render: (year) => <Tag color={'green'}>{year}</Tag>
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
      }>{difficulty}</Tag>
    },
    {
      title: '出处',
      dataIndex: 'competition',
      key: 'competition',
      render: (competition) => <Tag color={'blue'}>{competition}</Tag>
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      render: (id) => <a href={"problem/" + id}>进入</a>,
    }
  ];

  const data: any = [
    {
      id: '1',
      status: '1',
      title: '两数相加1',
      year: '2021',
      difficulty: 'easy',
      competition: 'noip'
    },
    {
      id: '2',
      status: '0',
      title: '两数相加2',
      year: '2021',
      difficulty: 'easy',
      competition: 'noip'
    },
    {
      id: '3',
      status: '1',
      title: '两数相加3',
      year: '2021',
      difficulty: 'medium',
      competition: 'noi'
    },
    {
      id: '4',
      status: '0',
      title: '两数相加4',
      year: '2022',
      difficulty: 'hard',
      competition: 'acm'
    },
  ];

  const goProblemDetail = (id: number) => {
    history.push(`/problem/${id}`);
  };
  return (
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      )

}
  