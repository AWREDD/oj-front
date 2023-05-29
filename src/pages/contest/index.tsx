import React ,{useEffect, useState}from 'react';
import { history } from 'umi';
import { Button, Space, Table} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom'
const id = 2;


interface DataType {
  id:number,
  title: string,
  contributor: string,
  create_at: string,
  start_at: string,
  due_at : string,
  type: string,
}

const columns: ColumnsType<DataType> = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'contributor',
    dataIndex: 'contributor',
    key: 'contributor',
  },
  {
    title: 'create_at',
    dataIndex: 'create_at',
    key: 'create_at',
  },
  {
    title: 'start_at',
    dataIndex: 'start_at',
    key: 'start_at',
  },
  {
    title: 'due_at',
    dataIndex: 'due_at',
    key: 'due_at',
  },
  {
    title: 'type',
    dataIndex: 'type',
    key: 'type',
  },
  
];

const baseUrl = 'http://10.26.106.209:5001';
export default  function Contest(){
  const navigate = useNavigate()
  const [isDoneLoading, setisDoneLoading] = useState(false);
  const [contestID, setContestID] = useState(-1);
  const [response, setResponse] = useState([]);

  useEffect(() => {
    const feachHistories = async() => { 
      const res = await fetch(`${baseUrl}/competition`, {
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
          navigate(`/contest/${id}`, { state: { id: record.id } });
        },
      })}/>
    </div>
  );
  }
}