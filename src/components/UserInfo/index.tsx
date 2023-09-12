/**
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-08-29 18:29:22
 * @LastEditors: 小国际
 * @LastEditTime: 2023-09-05 21:55:25
 */
import useGetUserInfo from "@/hooks/useGetUserInfo";
import { LogoutReducer } from "@/store/user";
import { removeToken } from "@/utils/userToken";
import { UserOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const UserInfo: FC = () => {
  const navigator = useNavigate();
  // const { data } = useRequest(getUserInfoService);
  // const { username, nickname } = data?.data.data || {};
  const { username, nickname } = useGetUserInfo();
  const dispatch = useDispatch();
  function logout() {
    // dispatch(logoutReducer()); // 退出登陆：清空了 redux user 数据
    removeToken(); // 清除 token 的存储
    dispatch(LogoutReducer);
    message.success("退出成功");
    navigator("/login");
  }
  const UserInfo = (
    <>
      <span className="text-gray-300">
        <UserOutlined />
        {nickname}
      </span>
      <Button type="link" onClick={logout}>
        退出
      </Button>
    </>
  );

  const Login = <Link to={"/login"}>登录</Link>;

  return <div>{username ? UserInfo : Login}</div>;
};
export default UserInfo;
