import { Form, Input, Button, Tabs, Row, Col, Card ,Alert, Space } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import React ,{useState}from 'react';
import styles from './index.module.less';
import { useNavigate } from 'react-router-dom'
import { useModel } from 'umi';
import {request} from "@/utils/request";

function callback(key) {
    console.log(key);
}
export default function Login() {
    const { user, setUserData } = useModel('userModel')
    const [isLoginSuccess, setisLoginSuccess] = useState(true);
    const navigate = useNavigate()
    const onClose = () => {
        setisLoginSuccess(true);
    }
    const onFinish = async(values: any) => {
        console.log('Received values of form: ', values);
        await request(`/account/login`, {
            method: 'post',
            body: JSON.stringify({
                username: values.username,
                password: values.password,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            function (response) {
                if (response.status_code === 200) {
                    setisLoginSuccess(true);
                    let userInfo = {
                        username: values.username,
                        user_id: response.data.user.id,
                        level: response.data.user.level
                    }
                    localStorage.setItem("userInfo", JSON.stringify(userInfo))
                    navigate('/problem')
                }else{
                    setisLoginSuccess(false);
                }
            }
        )

    };
    if(!isLoginSuccess){
        return <div>
            <Alert
                message="Error Text"
                description="Error Description Error Description Error Description Error Description Error Description Error Description"
                type="error"
                closable
                onClose={onClose}
            />
        </div>
    }
    else{
        return (

            <div>
                <Card>
                    <div className={styles.bg}>
                        <div className={styles.heard}>
                            <h1>Login</h1>
                        </div>
                        <div>
                            <div>
                                <Form
                                    name="normal_login"
                                    className="login-form"
                                    initialValues={{ remember: true }}
                                    onFinish={onFinish}
                                >
                                    <Form.Item
                                        name="username"
                                        rules={[{ required: true, message: '请输入手机号 / 用户名!' }]}
                                        style={{ borderBottom: '1px solid #DCDCDC' }}
                                    >
                                        <Input placeholder="请输入手机号 / 用户名" bordered={false} />
                                    </Form.Item>
                                    <Form.Item
                                        name="password"
                                        rules={[{ required: true, message: '请输入密码!' }]}
                                        style={{ borderBottom: '1px solid #DCDCDC' }}
                                    >
                                        <Input
                                            bordered={false}
                                            type="password"
                                            placeholder="请输入密码"
                                        />
                                    </Form.Item>


                                    <Form.Item>
                                        <a style={{ color: '#8C8D9B' }} href="/login/regist">创建账号</a>
                                    </Form.Item>

                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" block style={{ height: '56PX', borderRadius: '12PX' }}>
                                            登录
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>

                        </div>

                    </div>
                </Card>
            </div>
        )
    }


}
