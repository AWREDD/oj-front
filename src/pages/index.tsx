import yayJpg from '../assets/yay.jpg';
import { history } from 'umi';
import { Layout, Space } from 'antd';

export default function HomePage() {
    let userInfo = {
        username: "",
        user_id: "",
        level: 0
    }
    localStorage.setItem("userInfo", JSON.stringify(userInfo))
    history.push('/problem');
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
