import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu, App} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';
import { useModel } from 'umi';






const Header: React.FC = () => {
    let studentItems: MenuProps['items'] = [
        {
            label: (
                <a href="/contest" >
                    Contest
                </a>
            ),
            key: 'contest',
        },
        {
            label: (
                <a href="/problem" rel="noopener noreferrer">
                    Problem
                </a>
            ),
            key: 'problem',
        },
        {
            label: (
                <a href="/circle" rel="noopener noreferrer">
                    Circle
                </a>
            ),
            key: 'circle',
        },
        {
            label: (
                <a href="/history" >
                    Submission History
                </a>
            ),
            key: 'history',
        },
        {
            label: (
                <a href="/assignment">
                    Assignment
                </a>
            ),
            key: 'assignment',
        },

    ];

    let teacherItems: ({ label: JSX.Element; key: string } | { label: JSX.Element; key: string } | { label: JSX.Element; key: string } | { label: JSX.Element })[] = [
        {
            label: (
                <a href="/contest" >
                    Contests
                </a>
            ),
            key: 'contest',
        },
        {
            label: (
                <a href="/problem" rel="noopener noreferrer">
                    Problem
                </a>
            ),
            key: 'problem',
        },
        {
            label: (
                <a href="/circle" rel="noopener noreferrer">
                    Circle
                </a>
            ),
            key: 'circle',
        },
        {
            label: (
                <a href="/history" >
                    Submission History
                </a>
            ),
            key: 'history',
        },
        {
            label: (
                <a href="/assignment">
                    Assignment
                </a>
            ),
            key: 'assignment',
        },
        {
            label: (
                <a href="/check">
                    Check
                </a>
            ),
            key: 'check',
        }

    ];



    const [current, setCurrent] = useState('mail');
    let userInfo = JSON.parse(localStorage.getItem("userInfo") as string);

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };


    if (userInfo.level == 2) {
        return <App >
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={teacherItems} />
        </App>;
    }else{
        return <App >
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={studentItems} />
        </App>;
    }



};

export default Header;