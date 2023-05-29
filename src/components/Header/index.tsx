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
        <a href="/problem" target="_blank" rel="noopener noreferrer">
          Problem
        </a>
      ),
      key: 'problem',
    },
    {
      label: (
        <a href="/circle" target="_blank" rel="noopener noreferrer">
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

  let teacherItems: MenuProps['items'] = [
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
    {
      label: (
        <a href="/check">
          Check
        </a>
      ),
    }
    
  ];



    const [current, setCurrent] = useState('mail');
    const { user, setUserData } = useModel('userModel')
    const onClick: MenuProps['onClick'] = (e) => {
      console.log('click ', e);
      setCurrent(e.key);
    };


    if (user.level == 2) {
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