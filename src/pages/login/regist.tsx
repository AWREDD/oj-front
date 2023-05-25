import React from 'react';
import { Form, Input, Button, Checkbox, Tabs, Row, Col } from 'antd';
import styles from './index.module.less';
import { Footer } from 'antd/lib/layout/layout';

const onFinish = (values: any) => {
  console.log('Received values of form: ', values);
};
export default function Register() {
  return (
    <div className={styles.bg}>
      <div className={styles.heard}>
        <h1 className={styles.title}>系统名称</h1>
      </div>
      <div className={styles.login_card}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="phone"
            rules={[{ required: true, message: '请输入手机号!' }]}
            style={{ borderBottom: '1px solid #DCDCDC' }}
          >
            <Input placeholder="请输入手机号" bordered={false} />
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

          <Form.Item>
            已有帐号，<a href="/login">点击登录</a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block style={{ height: '56PX', borderRadius: '12PX' }}>
              登录
            </Button>
          </Form.Item>


        </Form>
      </div>
    </div>
  );
}
