import React ,{useEffect, useState}from 'react';
import { history } from 'umi';
import { Button, Space, Table, Modal,Card, InputNumber, Input, Tag} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom'





interface DataType {
  id:string,
  user_id: string,
  oss_id: string,
  context_id: string,
  comment: string,
  grade : string,
}

const columns: ColumnsType<DataType> = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'User ID',
    dataIndex: 'user_id',
    key: 'user_id',
  },
  {
    title: 'Assignment ID',
    dataIndex: 'context_id',
    key: 'context_id',
  },
  {
    title: 'Attachment',
    dataIndex: 'oss_id',
    key: 'oss_id',
    render: (text) => <a href ={`https://simple-oj.oss-cn-shenzhen.aliyuncs.com/${text}.pdf`}  target="_blank">Attachment</a>,
  },
  {
    title: 'Comment',
    dataIndex: 'comment',
    key: 'comment',
  },
  {
    title: 'Grade',
    dataIndex: 'grade',
    key: 'grade',
  },
  
  
];

const baseUrl = 'http://10.26.106.209:5001';
export default  function Check(){
  const [value, setValue] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { TextArea } = Input;
  const [comment, setComment] = useState('')
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value)
    console.log(comment)
  };
  
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    let res  = await fetch(`${baseUrl}/upload/criteria `, {
      method: 'post',
      body: JSON.stringify({
        user_id : row.user_id,
        context_id : row.context_id,
        comment :comment,
        grade: value,

      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    let data = await res.json();
    console.log(data);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const navigate = useNavigate()
  const [isDoneLoading, setisDoneLoading] = useState(false);
  const [response, setResponse] = useState([]);
  const [row, setRow] = useState([]);
  useEffect(() => {
    const feachHistories = async() => { 
      const res = await fetch(`${baseUrl}/upload/submissions`, {
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
      <Modal title="Evaluate Upload" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Space direction="vertical" size={16} align='center'>
          <Card style={{ width: 300 }}>
            <Space align="center">  
              <InputNumber min={1} max={10} value={value} onChange={setValue}/>
              <Tag color="green">请输入评分:1-10</Tag>
            </Space>
          </Card>
          <Card style={{ width: 300 }}>
            <TextArea
              showCount
              maxLength={100}
              style={{ height: 250, marginBottom: 24 }}
              onChange={onChange}
              placeholder='请输入评语'
            />
          </Card>
        </Space>

        
      </Modal>
      <Table columns={columns} dataSource={response.data} 
      onRow={(record) => ({
        onClick: () => {
          setRow(record)
          console.log(row)
          showModal();
        },
      })}/>
    </div>
  );
  }
}