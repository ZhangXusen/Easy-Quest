/**
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-08-29 18:25:48
 * @LastEditors: 小国际
 * @LastEditTime: 2023-09-05 22:13:37
 */
import useGetUserInfo from "@/hooks/useGetUserInfo";
import { CodeOutlined } from "@ant-design/icons";
import { Space } from "antd";
import Title from "antd/es/typography/Title";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Logo: FC = () => {
  const { username } = useGetUserInfo();
  const [pathname, setPathname] = useState("/");
  useEffect(() => {
    if (username) {
      setPathname("/manage");
    }
  }, [username]);
  return (
    <div className=" w-52 px-0 my-3 text-center leading-none">
      <Link to={pathname}>
        <Space>
          <Title style={{ margin: 0 }}>
            <CodeOutlined className="text-white" />
          </Title>
          <Title style={{ color: "white", margin: 0, fontSize: "32px" }}>
            超级问卷
          </Title>
        </Space>
      </Link>
    </div>
  );
};

export default Logo;
