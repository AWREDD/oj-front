import React ,{useEffect, useState}from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  id: number;
  problem_id: string;
  user_id: string;
  create_time: string;
  language: string;
  status: string;
  returned: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'problem_id',
    dataIndex: 'problem_id',
    key: 'problem_id',
  },
  {
    title: 'user_id',
    dataIndex: 'user_id',
    key: 'user_id',
  },
  {
    title: 'create_time',
    dataIndex: 'create_time',
    key: 'create_time',
  },
  {
    title: 'language',
    dataIndex: 'language',
    key: 'language',
  },
  {
    title: 'status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'returned',
    dataIndex: 'returned',
    key: 'returned',
  },
  
];

const baseUrl = 'http://10.26.106.209:5001';


export default function History() {

  const [isDoneLoading, setisDoneLoading] = useState(false);
  const [response, setResponse] = useState([]);
  useEffect(() => {
    const feachHistories = async() => { 
      const res = await fetch(`${baseUrl}/submit/histories`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }

    });
      // console.log(await res.json());
      setisDoneLoading(true);
      setResponse(await res.json());
      
  }
    feachHistories();
    console.log(response);
  }, []);

  



  if (!isDoneLoading) {
    return <div>loading...</div>;
  }else{
  return (
    <div>
      <Table columns={columns} dataSource={response.data} 
      onRow={(record) => ({
        onClick: () => {
          console.log(record.id);
        },
      })}
      />
    </div>
  );
  }
}
