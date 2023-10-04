/**
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-08-29 15:27:56
 * @LastEditors: 小国际
 * @LastEditTime: 2023-10-02 22:36:03
 */
import { Button } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

export const Home: FC = () => {
  const navigator = useNavigate();
  return (
    <div className="h-login flex flex-col justify-center items-center bg-gradient-to-r from-blue-400 to-cyan-400">
      <div className="text-center">
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>已累计创建问卷 3636 份</Paragraph>
        <div>
          <Button
            type="primary"
            onClick={() => navigator("/login")}
            className="h-14 text-[24px]"
          >
            开始使用
          </Button>
        </div>
      </div>
    </div>
  );
};
