import React ,{useState}from 'react';
import { Form, Input, Button, Checkbox, Tabs, Row, Col } from 'antd';
import styles from './index.module.less';
import { Footer } from 'antd/lib/layout/layout';
import { useNavigate } from 'react-router-dom'
import {request} from "@/utils/request";

const baseUrl = 'http://10.26.106.209:5001';



export default function Register() {
  const [isDoneRegister, setisDoneRegister] = useState(false);
  const navigate = useNavigate()
  const onFinish = async (values: any) => {
    console.log('Received values of form: ', values);
    await request(`/account/register`, {
      method: 'post',
      data: {
        username: values.username,
        password: values.password,
        nickname: values.nickname,
        email: values.email,
      }
    }).then(function (response) {
      if (response.status_code === 200) {
        setisDoneRegister(true);
        navigate('/login')

      }else{
        setisDoneRegister(false);
      }
        }
    )

  };
  return (

      <div className={styles.bg}>
        <div className={styles.heard}>
        </div>
        <div className={styles.login_card}>
          <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
          >
            <Form.Item
                name="username"
                rules={[{ required: true, message: '请输入用户名!' }]}
                style={{ borderBottom: '1px solid #DCDCDC' }}
            >
              <Input placeholder="请输入用户名" bordered={false} />
            </Form.Item>
            <Form.Item
                name="nickname"
                rules={[{ required: true, message: '请输入nickname!' }]}
                style={{ borderBottom: '1px solid #DCDCDC' }}
            >
              <Input placeholder="请输入昵称" bordered={false} />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{ required: true, message: '请设置密码!' }]}
                style={{ borderBottom: '1px solid #DCDCDC' }}
            >
              <Input
                  bordered={false}
                  type="password"
                  placeholder="请设置密码"
              />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: '请重复密码!' }]}
                style={{ borderBottom: '1px solid #DCDCDC' }}
            >
              <Input
                  bordered={false}
                  type="password"
                  placeholder="请重复密码"
              />
            </Form.Item>
            <Form.Item
                name="email"
                rules={[{ required: true, message: '请输入邮箱!' }]}
                style={{ borderBottom: '1px solid #DCDCDC' }}
            >
              <Input placeholder="请输入邮箱" bordered={false} />
            </Form.Item>

            <Form.Item>
              已有帐号，<a href="/login">点击登录</a>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block style={{ height: '56PX', borderRadius: '12PX' }}>
                注册
              </Button>
            </Form.Item>


          </Form>
        </div>
      </div>
  );
}
