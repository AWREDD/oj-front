import yayJpg from '../assets/yay.jpg';

import { Layout, Space } from 'antd';
import { useModel } from 'umi';

export default function HomePage() {
  const { user, setUserData } = useModel('userModel')
  console.log(user)
  return (
    <div>
      <h2>Yay! Welcome to umi!</h2>
      <p>
        <img src={yayJpg} width="388" />
      </p>
      <p>
        To get started, edit <code>pages/index.tsx</code> and save to reload.
      </p>
    </div>
  );
}
