/**
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-08-29 16:06:49
 * @LastEditors: 小国际
 * @LastEditTime: 2023-08-30 15:45:54
 */
import { Button, Result } from "antd";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const NotFound: FC = () => {
  const nav = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => nav("/")}>
          Back Home
        </Button>
      }
    />
  );
};

export default NotFound;
