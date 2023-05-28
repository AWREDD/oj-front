import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu, App} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';

const items: MenuProps['items'] = [
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

const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';
const Header: React.FC = () => {
    const [current, setCurrent] = useState('mail');
  
    const onClick: MenuProps['onClick'] = (e) => {
      console.log('click ', e);
      setCurrent(e.key);
    };
  
    return <App >
              <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
              <Avatar src={url} />
          </App>;
  };
  
  export default Header;