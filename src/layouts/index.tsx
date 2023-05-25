import { Link, Outlet } from 'umi';
import styles from './index.less';

import React from 'react';

import Header from '@/components/Header';


export default function Layout() {
  return (
    <>
    <Header />
    <div style = {{alignItems: 'center'}}>
      <Outlet />
    </div>
    </> 
  );
}
