import { registerService } from "@/service/user";
import { UserAddOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { Button, Form, Input, Space, message } from "antd";
import Title from "antd/es/typography/Title";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Register: FC = () => {
  interface IFormItem {
    username: string;
    password: string;
    confirm: string;
    nickname: string;
  }

  const navigator = useNavigate();
  const { run } = useRequest(
    async (values) => {
      const { username, password, nickname = username } = values;
      const data = await registerService(username, password, nickname);
      return data;
    },
    {
      manual: true,
      debounceWait: 500,
      onSuccess: (res) => {
        message.success("注册成功");
        navigator("/login");
      },
    }
  );
  function onFinish(values: any) {
    console.log(values);
    run(values);
  }

  function onFinishFailed(errorInfo: any) {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="h-login flex flex-col items-center justify-center bg-white">
      <div className="top">
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>用户注册</Title>
        </Space>
      </div>
      <div className="content">
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="昵称"
            name="nickname"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="confirmPass"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                立即注册
              </Button>
              <Link to={"/login"}>已有账户,登录</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
