import React, { useState } from 'react';
import { Button, Space } from 'antd';
import { history } from 'umi';

export default ()=>{
  const id = 2;
  const [count,setCount]=useState(0)

  const goAssignmentDetail = () => {
    history.push({
      pathname: '/assignment',
      search: '${id}',
  })
  };

  return(
    <div>
      <h2 style={{alignItems: 'center'}}>所有作业</h2>
      
    </div>
    
  )
}