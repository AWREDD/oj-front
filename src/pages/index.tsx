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

    </div>
  );
}
